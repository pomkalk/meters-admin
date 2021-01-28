export const SET_NEWS_DATA = 'SET_NEWS_DATA'
export const SET_NEWS_LOADING = 'SET_NEWS_LOADING'
export const SET_NEWS_MESSAGE = 'SET_NEWS_MESSAGE'
export const SET_NEWS_EDIT = 'SET_NEWS_EDIT'

export const setNewsData = (data) => ({ type: SET_NEWS_DATA, data, loading: false})
export const setNewsMessage = (data) => ({ type: SET_NEWS_MESSAGE, data})
export const clearNewsData = () => ({ type: SET_NEWS_DATA, loading: true})
export const setNewsLoading = (loading) => ({ type: SET_NEWS_LOADING, loading })
export const setNewsEdit = (data) => ({ type: SET_NEWS_EDIT, data })

export const updateNews = () => (dispatch, getState) => {
    const state = getState()
    const socket = state.connection.socket
    socket.emit('news.data.get', {page: state.news.page, pageSize: state.news.pageSize})
}

export const getEdit = (id) => (dispatch) => {
    const state = getState()
    const socket = state.connection.socket
    socket.emit('news.edit.get', id)
}