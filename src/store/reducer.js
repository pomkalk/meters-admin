import { combineReducers } from 'redux'
import connectionReducer from './connection/reducer'
import authReducer from './auth/reducer'
import pageReducer from './page/reducer'
import settingsReducer from './settings/reducer'
import databaseReducer  from './database/reducer'
import dashboardReducer from './dashboard/reducer'

const reducer = combineReducers({
    connection: connectionReducer,
    auth: authReducer,
    page: pageReducer,
    settings: settingsReducer,
    database: databaseReducer,
    dashboard: dashboardReducer
})

export default reducer
