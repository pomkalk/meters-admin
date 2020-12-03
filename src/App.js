import React from 'react'
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import useConnected from './hooks/useConnected';
import useUser from "./hooks/useUser"
import LoginPage from './pages/LoginPage'

const HomePage = () => <>'home page' <Link to="/login">+</Link></>

const App = () => {
    const user = useUser()
    const connected = useConnected()
    console.log(connected)
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
