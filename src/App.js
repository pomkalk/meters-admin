import React from 'react'
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import useConnected from './hooks/useConnected';
import useSocket from './hooks/useSocket';
import useUser from "./hooks/useUser"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'


const App = () => {
    const user = useUser()
    const connected = useConnected()
    return (connected && <Switch>
        <Route path="/" exact={true}>
            { user ? <HomePage /> : <Redirect to="/login" /> }
        </Route>
        <Route path="/login">
            <LoginPage />
        </Route>
    </Switch>)
}

export default App
