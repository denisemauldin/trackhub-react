import { ConnectedRouter } from 'react-router-redux'
import { hydrate } from "react-dom"
import { Provider } from "react-redux"
import history from "./history"
import initStore from "store/login"
import Login from "connected/Login"
import React from "react"

hydrate(
    <Provider store={initStore(history)}>
        <ConnectedRouter history={history}>
            <Login />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
)
