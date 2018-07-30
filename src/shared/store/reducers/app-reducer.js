import { Types as AppTypes} from "../constants/app-types"
import { Types as LoginTypes} from "../constants/login-types"
import ViewportTypes from "constants/viewport"

const initialState = {
    bodyHeight: 0,
    isMobileBrowser: false,
    isResponsive: false,
    lastScrollTopBeforeResponsive: 0,
    loginErrorMessage: null,
    messages: [],
    modal: null,
    userDetails: {},
    userPermissions: {},
    viewportSizeName: ViewportTypes.none,
    winHeight: 0,
    winScrollTop: 0,
    winWidth: 0
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AppTypes.HIDE_MODAL:
        case AppTypes.SHOW_MODAL:
            return {...state, modal: action.modal}
        case AppTypes.ADD_APP_MESSAGE:
            return {...state, messages: [...state.messages, action.message]}
        case AppTypes.GET_USER_DETAILS_FAIL:
        case AppTypes.GET_USER_DETAILS_SUCCESS:
        case AppTypes.GET_USER_PERMISSIONS_FAIL:
        case AppTypes.GET_USER_PERMISSIONS_SUCCESS:
        case AppTypes.INIT_VIEWPORT_VALUES:
        case AppTypes.SET_VIEWPORT_SCROLL:
        case AppTypes.SET_VIEWPORT_SIZE:
            return {...state, ...action.payload}
        case AppTypes.ADD_APP_MESSAGE:
            return {...state, messages: [...state.messages, action.message]}
        case AppTypes.SET_IS_MOBILE_BROWSER:
            return {...state, isMobileBrowser: action.isMobile}
        case LoginTypes.LOGIN_FAIL:
            return {...state, loginErrorMessage: action.loginError}
        case LoginTypes.LOGIN_START:
        case LoginTypes.LOGIN_SUCCESS:
            return {...state, loginErrorMessage: null}
        default:
            return state
    }
}