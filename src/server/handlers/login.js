import { Provider } from "react-redux"
import { StaticRouter as Router } from "react-router"
import history from "../history"
import initStore from "store/login"
import Login from "connected/Login"
import React from "react"
import render from "../views/render-login"

const login = (req, res, next) => {
    const store = initStore(history)
    
    res.status(200).send(render(
        <Provider store={store}>
            <Router context={{}} location={req.originalUrl}>
                <Login />
            </Router>
        </Provider>,
        store.getState()
    ))
    res.end()
}

export default login