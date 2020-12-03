import { SET_CONNECTED, SET_SOCKET } from "./actions"

const init = {
    socket: null,
    connected: false
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case SET_SOCKET: return {...state, socket: action.socket, connected: action.socket?true:false}
        case SET_CONNECTED: return {...state, connected: action.connected}
        default: return state
    }
}

export default reducer
