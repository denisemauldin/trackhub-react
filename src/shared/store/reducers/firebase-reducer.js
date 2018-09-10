import { Types as FirebaseTypes } from "../constants/firebase-types"

const initialState = {
  _loading: false,
  trackhubErrorMessage: null,
  trackhubs: []
 }

export default function reducer(state = initialState, action) {
  const {
    type,
    ...payload
  } = action
 
  switch (type) {
    case FirebaseTypes.FETCH_TRACKHUBS_SUCCESS:
      if (payload['trackhubs']) {
        return {...state, trackhubs: payload['trackhubs'], trackhubErrorMessage: null, _loading: false}
      } else {
        return {...state, trackhubs: [], trackhubErrorMessage: null, _loading: false}
      }
    case FirebaseTypes.FETCH_TRACKHUBS_FAIL:
      return {...state, trackhubErrorMessage: action.fetchError, _loading: false}
    case FirebaseTypes.FETCH_TRACKHUBS_START:
      return {...state, _loading: true}
    case FirebaseTypes.SAVE_TRACKHUB:
    default:
      return state
  }
}