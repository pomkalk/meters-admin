import React from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { useConnected, useUser } from './hooks';
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const HomePage = React.lazy(() => import('./pages/HomePage'))
import Preloader from './components/Preloader';


const App = () => {
    const user = useUser()
    const connected = useConnected()
    return (connected && <Preloader>
        <Switch>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route path="/" exact={false}>
                { user ? <HomePage /> : <Redirect to="/login" /> }
            </Route>
        </Switch>
    </Preloader>)
}

export default App
