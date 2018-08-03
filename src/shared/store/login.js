import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from "redux"
import appReducer from "./reducers/app-reducer"
import getMiddleware from "./middleware"

export default function initStore(history) {
  const composeEnhancers = (typeof window != "undefined") 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 
    : compose

  let preloadedState = {}

  if (typeof window != "undefined" && window.__PRELOADED_STATE__) {
    preloadedState = window.__PRELOADED_STATE__
    delete window.__PRELOADED_STATE__
  }

  return createStore(
    combineReducers({
      app: appReducer
    }),
    preloadedState, 
    composeEnhancers(
      applyMiddleware(...getMiddleware(history)
    )
  ))
}