export const SET_SOCKET = 'SET_SOCKET'
export const SET_CONNECTED = 'SET_CONNECTED'

export const setSocket = (socket) => ({type: SET_SOCKET, socket, connected: socket?true:false})
export const setConnected = (connected) => ({type: SET_CONNECTED, connected})