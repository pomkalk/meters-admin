export const SET_DB_PERIODS = 'SET_DB_PERIODS'
export const SET_DB_STATUS = 'SET_DB_STATUS'
export const SET_DB_LOADING = 'SET_DB_LOADING'
export const SET_DB_IMPORT_CONFIG = 'SET_DB_IMPORT_CONFIG'

export const setDbPeriods = (periods) => ({ type: SET_DB_PERIODS, periods, loading: false })
export const clearDbPeriods = () => ({ type: SET_DB_PERIODS, periods: [], loading: true})
export const setDbLoading = (loading) => ({type: SET_DB_LOADING, loading})
export const setDbStatus = (status) => ({type: SET_DB_STATUS, status})
export const setDbImportConfi =(config) => ({type: SET_DB_IMPORT_CONFIG, config})