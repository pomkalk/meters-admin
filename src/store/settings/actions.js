export const SET_CONFIG_DATA = 'SET_CONFIG_DATA'
export const SET_CONFIG_USERS = 'SET_CONFIG_USERS'
export const SET_CONFIG_PERMISSIONS = 'SET_CONFIG_PERMISSIONS'

export const setConfigData = (data) => ({type: SET_CONFIG_DATA, data})
export const setConfigUsers = (users) => ({type: SET_CONFIG_USERS, users})
export const setConfigPermissions = (permissions) => ({type: SET_CONFIG_PERMISSIONS, permissions})