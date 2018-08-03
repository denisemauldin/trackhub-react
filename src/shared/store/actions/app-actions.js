import { Types } from "../constants/app-types";
import {ViewportTypeToPixels} from "constants/viewport"
import axios from "libs/axios"


export function addAppMessage(options) {
  const {
    id = Date.now() * Math.random(),
    text = "",
    type = "info"
  } = options

  return {
    type: Types.ADD_APP_MESSAGE,
    message: {
      id,
      text,
      type
    }
  }
}

export function hideModal() {
  return {
    type: Types.HIDE_MODAL,
    modal: null
  }
}

export function getUserDetails(username, req) {
  return (dispatch, getState) => {
    dispatch({type: Types.GET_USER_DETAILS})
    const {
      headers
    } = req

    const userDetailQuery = process.env.USER_DETAIL_QUERY
    var settings = {
      url: `${userDetailQuery}=${username}`,
      headers: {
        ...headers
      }
    }

    return axios(settings)
    .then(({data}) => {
      const {
        first_name,
        last_name,
        username
      } = data.results[0]

      dispatch({
        type: Types.GET_USER_DETAILS_SUCCESS,
        payload: {
          userDetails: {
            first_name,
            last_name,
            username
          }
        }
      })
    })
    .catch(e => {
      dispatch({
        type: Types.GET_USER_DETAILS_FAIL,
        payload: {
          userDetails: {
            "first_name": "Lab",
            "last_name": "User",
            "username": username,
            "error": `Could not load details for ${username}`
          }
        }
      })
    })
  }
  return {
    type: Types.INIT_VIEWPORT_VALUES,
    payload: data
  }
}

export function getUserPermissions(username, req) {
  return (dispatch, getState) => {
    const {
      headers
    } = req

    dispatch({type: Types.GET_USER_PERMISSIONS})
    const userPermissionQuery = process.env.USER_PERMISSIONS_QUERY
    return axios({
      url: `${userPermissionQuery}=${username}`,
      headers: {
        ...headers
      }
    })
    .then(({data}) => {
      // the results array returned has this shape:
      // { "name": "Can do X", "content_type", "codename" }
      // we have to iterate and pluck values
      const userPermissions = {}
      data.results.forEach(permission => {
        userPermissions[permission.codename] = true
      })

      dispatch({
        type: Types.GET_USER_PERMISSIONS_SUCCESS,
        payload: {
          userPermissions
        }
      })
    })
    .catch(e => {
      dispatch({
        type: Types.GET_USER_PERMISSIONS_FAIL,
        payload: {
          userPermissions: {
            error: "Cannot get permissions."
          }
        }
      })
    })
  }
  return {
    type: Types.INIT_VIEWPORT_VALUES,
    payload: data
  }
}

export function initViewportValues(data) {
  return {
    type: Types.INIT_VIEWPORT_VALUES,
    payload: data
  }
}

export function setViewportScroll(data) {
  return {
    type: Types.SET_VIEWPORT_SCROLL,
    payload: data
  }
}

export function setViewportSize(data) {
  // this is a thunk so it's able to query the entire store
  return (dispatch, getState) => {
    const {
      app: {
        isResponsive: currentIsResponsive,
        lastScrollTopBeforeResponsive,
        winScrollTop
      }
    } = getState()

    const {
      winWidth
    } = data

    const isResponsive = winWidth < ViewportTypeToPixels.md

    // if responsive, but now not responsive, update the scroll
    if (currentIsResponsive && !isResponsive) {
      data.isResponsive = false
      
      dispatch({
        type: Types.SET_VIEWPORT_SIZE,
        payload: data
      })

      // restore the scroll position
      window.scrollTo(0, lastScrollTopBeforeResponsive)
    }
    // if not responsive, but now responsive, save the scroll
    else if (!currentIsResponsive && isResponsive) {
      data.isResponsive = true

      dispatch({
        type: Types.SET_VIEWPORT_SIZE,
        payload: data
      })
    }
    else {
      if (!isResponsive) {
        data.lastScrollTopBeforeResponsive = winScrollTop
      }
      
      dispatch({
        type: Types.SET_VIEWPORT_SIZE,
        payload: data
      })
    }
  }
}

export function showModal(options = {}) {
  const {
    heading,
    content,
    type = "info",
    okCallback = function() {},
    cancelCallback = function() {}
  } = options

  return {
    type: Types.SHOW_MODAL,
    modal: {
      heading,
      content,
      type,
      okCallback,
      cancelCallback
    }
  }
}