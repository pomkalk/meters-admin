export const SET_CHART = 'SET_CHART'
export const SET_STAT = 'SET_STAT'

export const setChart = (data) => ({type: SET_CHART, data})
export const setStat = (data) => ({type: SET_STAT, data})

export const getChart = () => (dispatch, getState) => {
    const state = getState()
    const socket = state.connection.socket
    socket.emit('dashboard.chart.get', (res) => {
        dispatch(setChart(res))
    })
}

export const getStat = () => (dispatch, getState) => {
    const state = getState()
    const socket = state.connection.socket
    socket.emit('dashboard.stat.get', (res) => {
        dispatch(setStat(res))
    })
}