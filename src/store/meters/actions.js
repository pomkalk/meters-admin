export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
export const SET_SEARCH_OPTIONS = 'SET_SEARCH_OPTIONS'
export const SET_SEARCH_REQUEST = 'SET_SEARCH_REQUEST'
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING'
export const SET_SEARCH_DATA = 'SET_SEARCH_DATA'
export const SET_SEARCH_SAVING = 'SET_SEARCH_SAVING'
export const UPDATE_SEARCH_DATA = 'UPDATE_SEARCH_DATA'

export const setSearchValue = (value) => ({ type: SET_SEARCH_VALUE, value })
export const setSearchRequest = (value) => ({ type: SET_SEARCH_REQUEST, value })
export const setSearchOptions = (options) => ({ type: SET_SEARCH_OPTIONS, options })
export const setSearchLoading = (value) => ({ type: SET_SEARCH_LOADING, value })
export const setSearchData = (data) => ({ type: SET_SEARCH_DATA, data })
export const setSearchSaving = (value) => ({ type: SET_SEARCH_SAVING, value })
export const updateSearchData = (data) => ({ type: UPDATE_SEARCH_DATA, data })

export const saveData = (meter_id, value) => (dispatch, getState) => {
    const state = getState()
    const socket = state.connection.socket
    dispatch(setSearchSaving(meter_id))
    socket.emit('meters.update', {meter_id, value}, (res) => {
        dispatch(setSearchSaving(null))
        dispatch(updateSearchData(res))
    })
}

export const loadMeters = (ls) => (dispatch, getState) => {
    const state = getState()
    const socket = state.connection.socket
    socket.emit('meters.get', ls, (res) => {
        dispatch(setSearchData(res))
    })
}

export const find = (value) => (dispatch, getState) => {
    const state = getState()
    const socket = state.connection.socket
    value = (value || '').trimLeft()
    dispatch(setSearchValue(value))
    if (value.length > 0) {
        let ls = parseInt(value)
        if (ls.toString() === value) {
            if (ls.toString().length === 6) {
                dispatch(findByLS(ls))
            }
        } else {
            if (value.length > 2) {
                dispatch(findByString(value))
            }
        }
    }
}

export const findByLS = (ls) => (dispatch, getState) => {
    const state = getState()
    const socket = state.connection.socket
    dispatch(setSearchLoading(true))
    socket.emit('meters.find.ls', ls, (res) => {
        dispatch(setSearchLoading(false))
        dispatch(setSearchOptions(res))
    })
}

export const findByString = (query) => (dispatch, getState) => {
    const state = getState()
    const socket = state.connection.socket
    const req = parse(query)
    socket.emit('meters.find.address', req, (res) => {
        dispatch(setSearchLoading(false))
        dispatch(setSearchOptions(res))
    })
}

function parseN (x, a=false) {
  x = x.toLowerCase()
  if (parseInt(x).toString() === x) return { number: parseInt(x), housing: ''}
  if (x.indexOf('/')>0) {
    let xx = x.split('/')
    return { number: parseInt(xx[0]), [a?'part':'housing']: xx[1]}
  }
  return { number: parseInt(x.slice(0, -1)), [a?'part':'housing']: x.slice(-1)}
}

function parse (x) {
  x = x.replace(/\sд\./g, ' ')
  x = x.replace(/\sкв\./g, ' ')  
  x = x.replace(/[.,-]/g, ' ')
  x = x.trim().replace(/\s{2,}/g, ' ')
  if (x.length == 0) {
    return null
  }
  x = x.split(' ')

  if (x.length == 1) {
    return { street: x[0] }
  }

  const re_check = new RegExp(/^\d+($|\S|\/.+)$/)

  if (x.length == 2) {
    if (re_check.test(x[1])) {
      return {
        street: x[0],
        building: parseN(x[1])
      }
    }
    return { street: x.join(' ') }
  }

  if (x.length >2 ) {
    let xx = x.slice(-2)
    if (re_check.test(xx[0]) && re_check.test(xx[1])) {
      return {
        street: x.slice(0, -2).join(' '),
        building: parseN(xx[0]),
        apartment: parseN(xx[1], true)
      }
    }
    if (re_check.test(xx[1])) {
      return {
        street: x.slice(0, -1).join(' '),
        building: parseN(xx[1])
      }
    }
    return { street: x.join(' ')}
  }

  return x
}

function ids(x) {
  if (x) return {id: shortid.generate(), ...x}
  return null
}