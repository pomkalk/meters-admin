import { combineReducers } from 'redux'
import connectionReducer from './connection/reducer'
import authReducer from './auth/reducer'

const reducer = combineReducers({
    connection: connectionReducer,
    auth: authReducer
})

export default reducer
