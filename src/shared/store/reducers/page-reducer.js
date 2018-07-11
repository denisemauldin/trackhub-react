import { Types } from '../constants/page-types'

const initialState = {
    _loading: false
}

export default function reducer(state = initialState, action) {
    const {
        type,
        ...payload
    } = action
    
    switch (type) {
        case Types.GET_PAGE_DATA:
        case Types.GET_PAGE_DATA_FAIL:
        case Types.GET_PAGE_DATA_SUCCESS:
            return {...state, ...payload}
            break
        default:
            return state
    }
}