import { SET_DB_PERIODS, SET_DB_STATUS, SET_DB_LOADING, SET_DB_IMPORT_CONFIG } from "./actions"

const init = {
    periods: [],
    loading: true,
    status: null,
    importConfig: null
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_DB_PERIODS: return {...state, periods: action.periods, loading: action.loading}
        case SET_DB_STATUS: return {...state, status: action.status}
        case SET_DB_LOADING: return {...state, loading: action.loading}
        case SET_DB_IMPORT_CONFIG: return {...state, importConfig: action.config}
        default: return state
    }
}

export default reducer
