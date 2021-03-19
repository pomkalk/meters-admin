export const SET_FB_DATA = 'SET_FB_DATA'
export const SET_FB_LOADING = 'SET_FB_LOADING'
export const SET_FB_MESSAGE = 'SET_FB_MESSAGE'
export const SET_FB_EXTRA = 'SET_FB_EXTRA'
export const SET_FB_EXTRA_CLEAR = 'SET_FB_EXTRA_CLEAR'

export const setFbData = (data) => ({ type: SET_FB_DATA, data, loading: false})
export const setFbMessage = (data) => ({ type: SET_FB_MESSAGE, data})
export const clearFbData = () => ({ type: SET_FB_DATA, loading: true})
export const setFbLoading = (loading) => ({ type: SET_FB_LOADING, loading })
export const setFbExtra = (name, value) => ({ type: SET_FB_EXTRA, name, value })
export const setFbExtraClear = () => ({ type: SET_FB_EXTRA_CLEAR })

export const updateFb = () => (dispatch, getState) => {
    const state = getState()
    const socket = state.connection.socket
    socket.emit('feedbacks.data.get', {page: state.feedbacks.page, pageSize: state.feedbacks.pageSize})
}

export const openFeedback = (id) => (dispatch, getState) => {
    console.log(id)
    const state = getState()
    const socket = state.connection.socket
    socket.emit('feedbacks.message.get', id)
    socket.emit('feedbacks.extra.get', id)
}


export const setFbMessageClear = () => dispatch => {
    dispatch(setFbMessage(null))
    setFbExtraClear()
}