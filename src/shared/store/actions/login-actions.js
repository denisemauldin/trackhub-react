import { Types } from "../constants/login-types"
import axios from "libs/axios"

export function attemptLogin(user, pass, historyPush = function() {}) {
    // this is a thunk so it"s able to query the entire store
    return (dispatch, getState) => {    
        dispatch({type: Types.LOGIN_START})

        return axios({
            url: "/data/auth",
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: {
                pass,
                user
            }
        })
        .then(({data}) => {
            dispatch({type: Types.LOGIN_SUCCESS})
            window.location.href = "/"
        })
        .catch(e => {
            dispatch({
                type: Types.LOGIN_FAIL,
                loginError: "Login Failed. Please try again."
            })
        })
    }
}