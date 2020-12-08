import { SET_TITLE } from "./actions"

const init = {
    title: 'Some title',

}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_TITLE: return {...state, title: action.title}
        default: return state
    }
}

export default reducer
