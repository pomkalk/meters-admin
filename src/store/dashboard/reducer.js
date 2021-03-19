import { SET_CHART } from "./actions"
import { SET_STAT } from "./actions"

const init = {
    chart: null,
    stat: null
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_CHART: return {...state, chart: action.data }
        case SET_STAT: return {...state, stat: action.data }
        default: return state
    }
}

export default reducer
