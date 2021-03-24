import { combineReducers } from 'redux'
import connectionReducer from './connection/reducer'
import authReducer from './auth/reducer'
import pageReducer from './page/reducer'
import settingsReducer from './settings/reducer'
import databaseReducer  from './database/reducer'
import dashboardReducer from './dashboard/reducer'
import feedbacksReducer from './feedbacks/reducer'
import newsReducer from './news/reducer'
import metersReducer from './meters/reducer'

const reducer = combineReducers({
    connection: connectionReducer,
    auth: authReducer,
    page: pageReducer,
    settings: settingsReducer,
    database: databaseReducer,
    dashboard: dashboardReducer,
    feedbacks: feedbacksReducer,
    news: newsReducer,
    meters: metersReducer
})

export default reducer
