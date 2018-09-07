import { trackhubsRef } from "config/firebase";
import { Types } from "../constants/firebase-types";

/*
export function addTrackhub(newTrackhub) {
  dispatch({
    type: Types.CREATE_TRACKHUB,
    payload: {
      trackhubsRef.push().set(newTrackhub)
    }
  })
}
*/

export function fetchTrackhubs() {
  return function (dispatch) {
    dispatch({ type: Types.FETCH_TRACKHUBS_START })

    try {
      let query = trackhubsRef
        .orderByKey()

      query
        .once('value', (snapshot) => {
          dispatch({
            type: Types.FETCH_TRACKHUBS_SUCCESS,
            trackhubs: snapshot.val()
          });
        })
    } catch (e) {
      console.error("Error with fetching trackhubs", e)
      dispatch({
        type: Types.FETCH_TRACKHUBS_FAIL,
        loginError: "Trackhub fetch Failed. Please try again."
      })
    }
  }
};

