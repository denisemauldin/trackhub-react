import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import appReducer from './app-reducer'
import firebaseReducer from './firebase-reducer'
import pageReducer from './page-reducer'

const reducers = combineReducers({
 app: appReducer,
 firebase: firebaseReducer,
 page: pageReducer,
 router: routerReducer
})

export default reducers
