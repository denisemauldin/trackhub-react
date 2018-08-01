import { Types } from "../constants/app-types"
import ViewportTypes from "constants/viewport"

const initialState = {
  bodyHeight: 0,
  isMobileBrowser: false,
  isResponsive: false,
  lastScrollTopBeforeResponsive: 0,
  viewportSizeName: ViewportTypes.none,
  winHeight: 0,
  winScrollTop: 0,
  winWidth: 0
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.INIT_VIEWPORT_VALUES:
      return {...state, ...action.payload}
    case Types.SET_IS_MOBILE_BROWSER:
      return {...state, isMobileBrowser: action.isMobile}
    case Types.SET_VIEWPORT_SCROLL:
      return {...state, ...action.payload}
    case Types.SET_VIEWPORT_SIZE:
      return {...state, ...action.payload}
    default:
      return state
  }
}