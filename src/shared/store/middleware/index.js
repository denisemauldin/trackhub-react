import { routerMiddleware } from "react-router-redux"
import thunk from './thunk'

export default function getMiddleware(history) {
 return [
  routerMiddleware(history),
  thunk
 ]
}
