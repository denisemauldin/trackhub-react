// ------
// this has to be at the top to ensure style load order
import styles from "./app.scss"
// ------
import {
 Redirect,
 Route,
 Switch
} from "react-router"
import AppMessages from "connected/AppMessages"
import AppModals from "connected/AppModals"
// import Footer from "presentational/Footer"
import Header from "connected/Header"
import React from "react"
import getRoutes from "routes"

export default function App(props) {
  return (
    <div>
      <AppModals />

      <AppMessages />

      <Header />

      <main>
        <Switch>
          {
            getRoutes(props.userPermissions).map((routeConfig, i) => {
              const {
                redirect,
                ...passThroughProps
              } = routeConfig

              const RouterElement = redirect
                ? Redirect
                : Route

              passThroughProps['history'] = props.history
              return <RouterElement key={`route-${i}`} {...passThroughProps} />
            })
          }
        </Switch>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
