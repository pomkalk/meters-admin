import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import Thunk from 'redux-thunk'
// import logger from 'redux-logger'

//const store = createStore(reducer, applyMiddleware(logger))
const store = createStore(reducer, applyMiddleware(Thunk))
// store.subscribe(()=>{
//     console.log(store.getState())
// })
export default store
