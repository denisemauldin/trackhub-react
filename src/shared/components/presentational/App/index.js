// ------
// this has to be at the top to ensure style load order
import styles from "./app.scss"
// ------
import {
  Redirect,
  Route,
  Switch
} from "react-router"
import Footer from "presentational/Footer"
import Header from "presentational/Header"
import PropTypes from "prop-types"
import React from "react"
import routes from "routes"
import TrackhubGenerator from "../../connected/TrackhubGenerator/TrackhubGenerator"

class App extends React.Component {

  constructor(props, context) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />

        <main>
          <Switch>
            {
              routes.map((routeConfig, i) => {
                const RouterElement = routeConfig.redirect
                  ? Redirect
                  : Route

                return <RouterElement key={`route-${i}`} {...routeConfig} />
              })
            }
          </Switch>
          <TrackhubGenerator />
        </main>

        <Footer />
      </div>
    )
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default App
