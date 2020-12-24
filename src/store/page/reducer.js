import { SET_FEEDS_COUNT, SET_TITLE } from "./actions"

const init = {
    title: 'Some title',
    feedsCount: 0
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_TITLE: return {...state, title: action.title}
        case SET_FEEDS_COUNT: return {...state, feedsCount: action.count}
        default: return state
    }
}

export default reducer
