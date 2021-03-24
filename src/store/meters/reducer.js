import { SET_SEARCH_VALUE, SET_SEARCH_OPTIONS, SET_SEARCH_REQUEST, SET_SEARCH_LOADING, SET_SEARCH_DATA, SET_SEARCH_SAVING, UPDATE_SEARCH_DATA } from "./actions"

const init = {
    value: '',
    options: null,
    request: null,
    loading: false,
    data: null,
    saving: null
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_SEARCH_VALUE: return {...state, value: action.value }
        case SET_SEARCH_REQUEST: return {...state, request: action.value }
        case SET_SEARCH_OPTIONS: return {...state, options: action.options }
        case SET_SEARCH_LOADING: return {...state, loading: !!action.value }
        case SET_SEARCH_DATA: return {...state, data: action.data }
        case SET_SEARCH_SAVING: return {...state, saving: action.value }
        case UPDATE_SEARCH_DATA: return {...state, data: {...state.data, meters: state.data.meters.map(x => x.id===action.data.id ? action.data : x) }}
        default: return state
    }
}

export default reducer
