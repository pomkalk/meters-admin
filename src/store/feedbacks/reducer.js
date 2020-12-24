import { SET_FB_DATA, SET_FB_LOADING, SET_FB_MESSAGE } from "./actions"

const init = {
    loading: true,
    data: null,
    page: null,
    pageSize: null,
    total: null,
    message: null
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_FB_DATA: return {...state, ...action.data, loading: action.loading}
        case SET_FB_LOADING: return {...state, loading: action.loading}
        case SET_FB_MESSAGE: return {...state, message: action.data}
        default: return state
    }
}

export default reducer
