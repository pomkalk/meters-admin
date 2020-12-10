import { combineReducers } from 'redux'
import connectionReducer from './connection/reducer'
import authReducer from './auth/reducer'
import pageReducer from './page/reducer'
import settingsReducer from './settings/reducer'

const reducer = combineReducers({
    connection: connectionReducer,
    auth: authReducer,
    page: pageReducer,
    settings: settingsReducer
})

export default reducer
