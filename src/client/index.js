import { BrowserRouter as Router } from "react-router-dom"
import { ConnectedRouter } from 'react-router-redux'
import { hydrate } from "react-dom"
import { Provider } from "react-redux"
import App from "presentational/App"
import React from "react"
import history from "./history"
import initStore from "store"

hydrate((
  <Provider store={initStore(history)}>
    <ConnectedRouter history={history}>
      <App history={history} />
    </ConnectedRouter>
  </Provider>
), document.getElementById("root"))
