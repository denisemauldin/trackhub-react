import { Types } from '../constants/app-types';
import {ViewportTypeToPixels} from "constants/viewport"

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