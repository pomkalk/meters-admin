import { SET_CONFIG_DATA, SET_CONFIG_USERS, SET_CONFIG_PERMISSIONS } from "./actions"

const init = {
    config: null,
    users: null,
    permissions: null
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_CONFIG_DATA: return {...state, config: action.data}
        case SET_CONFIG_USERS: return {...state, users: action.users}
        case SET_CONFIG_PERMISSIONS: return {...state, permissions: action.permissions}
        default: return state
    }
}

export default reducer
