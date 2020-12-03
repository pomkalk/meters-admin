import { SET_USER } from "./actions"

const init = {
    user: null
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_USER: return {...state, user: action.user}
        default: return state
    }
}

export default reducer
