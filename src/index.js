import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import io from 'socket.io-client'
import { Provider as StoreProvider } from 'react-redux'
import store from './store'
import { setSocket, setConnected } from './store/connection/actions'
import App from './App'
import 'antd/dist/antd.css'
import './styles.css'
import AdminApi from './api'

const socket = io('', {path: '/admin'})
socket.once('connect', () => {
    store.dispatch(setSocket(socket))
    const api = new AdminApi(socket, store)
    let ujw = sessionStorage.getItem('ujw')
    if (ujw) {
        socket.emit('auth.restore', ujw)
        socket.once('auth.restored', render)
    } else {
        render()
    }
})

socket.on('connect', () => store.dispatch(setConnected(true)))

socket.on('disconnect', () => store.dispatch(setConnected(false)))


const render = () => {
    ReactDOM.render(<StoreProvider store={store}><BrowserRouter basename="/admin359"><App /></BrowserRouter></StoreProvider>, document.getElementById('app'))
}


