import { 
    getUserDetails,
    getUserPermissions
} from "store/actions/app-actions"
import { matchPath } from 'react-router-dom'
import { Provider } from "react-redux"
import { StaticRouter as Router } from "react-router"
import { Types as AppTypes } from "store/constants/app-types"
import App from "presentational/App"
import Context from "react-context-component"
import history from "../history"
import initStore from "store"
import React from "react"
import render from "../views/render-app"
import getRoutes from "routes"
import testForMobileBrowser from "../methods/test-mobile"

const ErrorPage = () => <h1>Oops there was an error</h1>

const reactApp = (req, res, next) => {
    const {
        username
    } = req.session

    const context = {}
    const store = initStore(history)
    
    const setStatus = (newStatus) => {
        status = newStatus
    }

    let HTML
    let status = 200

    store.dispatch({
        type: AppTypes.SET_IS_MOBILE_BROWSER,
        isMobile: testForMobileBrowser(req.headers['user-agent'].toLowerCase())
    })

    // add the call to get user permissions
    //
    // if there's any application things that need to happen before the initial render
    // this is the place to do that
    Promise.all([
        store.dispatch(getUserDetails(username, req)),
        store.dispatch(getUserPermissions(username, req))
    ])
        .then(() => {
            const {
                app: {
                    userPermissions
                }
            } = store.getState()

            const dataPromises = []
            getRoutes(userPermissions).some(route => {
                const match = matchPath(req.originalUrl, route)
                
                if (match && route.component.loadData) {
                    dataPromises.push(
                        route.component.loadData(store.dispatch)
                    )
                }
                
                return match
            })

            return {
                dataPromises,
                userPermissions
            }
        })
        .then(({dataPromises, userPermissions}) => {
            return Promise.all(dataPromises)
                .then(() => {
                    try {
                        HTML = render(
                                <Context setStatus={setStatus}>
                                    <Provider store={store}>
                                        <Router context={{}} location={req.originalUrl}>
                                            <App history={history} userPermissions={userPermissions} />
                                        </Router>
                                    </Provider>
                                </Context>, 
                            store.getState()
                        )
                    }
                    catch(e) {
                        HTML = render(ErrorPage, store.getState())
                        status = 500
                    }
                })
                .then(() => {
                    if (context.url) {
                        res.redirect(301, context.url)
                        res.end()
                    }
                    else {
                        res.status(status).send(HTML)
                        res.end()
                    }
                })
        })
    
}

export default reactApp