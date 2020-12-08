import { SET_USER } from "./actions"
import User from '../../lib/User'

const init = {
    user: null
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_USER: return {...state, user: new User(action.user)}
        default: return state
    }
}

export default reducer
