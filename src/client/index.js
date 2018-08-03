import { BrowserRouter as Router } from "react-router-dom"
import { ConnectedRouter } from 'react-router-redux'
import { hydrate } from "react-dom"
import { Provider } from "react-redux"
import App from "presentational/App"
import history from "./history"
import initStore from "store"
import React from "react"

const store = initStore(history)
const {
  app: {
    userPermissions
  }
} = store.getState()

hydrate((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App history={history} userPermissions={userPermissions} />
    </ConnectedRouter>
  </Provider>
), document.getElementById("root"))
