import { databaseRef } from "config/firebase";
import { Types } from "../constants/firebase-types";

export function addTrackhub(trackhubData, trackhubUrl, historyPush) {
  return function (dispatch, getState) {
    const {
      app: {
        userDetails
      }
    } = getState()

    let userTrackhubsRef = databaseRef.child(`trackhubs/${userDetails.uid}/${trackhubData.hubName}`)
    userTrackhubsRef.set({
      url: trackhubUrl,
      data: trackhubData,
    }).then(() => {
      dispatch({
        type: Types.SAVE_TRACKHUB,
        trackhubId: userTrackhubsRef.key
      })
      // transition pages
      historyPush(`/`)

    })
  }
}

export function fetchTrackhubs() {
  return function (dispatch, getState) {
    dispatch({ type: Types.FETCH_TRACKHUBS_START })

    try {
      const {
        app: {
          userDetails
        }
      } = getState()

      let query = databaseRef.child(`trackhubs/${userDetails.uid}`)
        .orderByKey()

      query
        .once('value', (snapshot) => {
          let firebaseTrackhubObject = snapshot.val()
          let trackhubs = Object.keys(firebaseTrackhubObject).map((trackhubId) => {
            return firebaseTrackhubObject[trackhubId]
          })
          dispatch({
            type: Types.FETCH_TRACKHUBS_SUCCESS,
            trackhubs
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

