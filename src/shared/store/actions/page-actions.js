import { Types } from '../constants/page-types';
import axios from "axios"

export function loadPageData(url, options) {
 // this is a thunk so it's able to query the entire store
 return (dispatch, getState) => { 
  dispatch({
   type: Types.GET_PAGE_DATA, 
   _loading: true
  })

  return axios.get(url)
   .then(({data}) => {
    const spreadData = Array.isArray(data)
     ? data
     : {...data}

    dispatch({
     type: Types.GET_PAGE_DATA_SUCCESS,
     _loading: false, 
     payload: spreadData
    })
   })
   .catch(e => {
    dispatch({
     type: Types.GET_PAGE_DATA_FAIL, 
     _loading: false, 
     error: e
    })
   })
 }
}