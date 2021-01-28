import { SET_NEWS_DATA, SET_NEWS_EDIT, SET_NEWS_LOADING, SET_NEWS_MESSAGE } from "./actions"

const init = {
    loading: true,
    data: null,
    page: null,
    pageSize: 20,
    total: null,
    message: null,
    edit: null
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_NEWS_DATA: return {...state, ...action.data, loading: action.loading}
        case SET_NEWS_LOADING: return {...state, loading: action.loading}
        case SET_NEWS_MESSAGE: return {...state, message: action.data}
        case SET_NEWS_EDIT: return {...state, edit: action.data}
        default: return state
    }
}

export default reducer
