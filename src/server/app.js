import { matchPath } from 'react-router-dom'
import { Provider } from "react-redux"
import { StaticRouter as Router } from "react-router"
import { Types as AppTypes } from "store/constants/app-types"
import App from "presentational/App"
import Context from "react-context-component"
import history from "./history"
import initStore from "store"
import React from "react"
import render from "./render"
import routes from "routes"
import testForMobileBrowser from "./test-mobile"

const ErrorPage = () => <h1>Oops there was an error</h1>

const reactApp = (req, res, next) => {
    const context = {}
    const promises = []
    
    const setStatus = (newStatus) => {
        status = newStatus
    }

    const store = initStore(history)
    
    let HTML
    let status = 200

    // match the route data here
    routes.some(route => {
        const match = matchPath(req.originalUrl, route)
        const axiosConfig = {}
        
        if (process.env.NODE_ENV === "development") {
            axiosConfig.baseURL = "http://localhost:3000/"
        }
        
        if (match && route.component.loadData) {
            promises.push(route.component.loadData(
                store.dispatch, 
                {
                    axiosConfig,
                    ...match.params
                }
            ))
        }
        
        return match
    })

    store.dispatch({
        type: AppTypes.SET_IS_MOBILE_BROWSER,
        isMobile: testForMobileBrowser(req.headers['user-agent'].toLowerCase())
    })

    // if there's any application things that need to happen before the initial render
    // this is the place to do that
    Promise.all(promises)
        .then(() => {
            try {
                HTML = render(
                        <Context setStatus={setStatus}>
                            <Provider store={store}>
                                <Router context={{}} location={req.originalUrl}>
                                    <App history={history} />
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
            }
            else {
                res.status(status).send(HTML)
            }
        })
}

export default reactApp