import { combineReducers } from 'redux'
import connectionReducer from './connection/reducer'
import authReducer from './auth/reducer'
import pageReducer from './page/reducer'

const reducer = combineReducers({
    connection: connectionReducer,
    auth: authReducer,
    page: pageReducer
})

export default reducer
