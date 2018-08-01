import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import appReducer from './app-reducer'
import pageReducer from './page-reducer'

const reducers = combineReducers({
  app: appReducer,
  page: pageReducer,
  router: routerReducer
})

export default reducers
