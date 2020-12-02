import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

const App = () => {
    return (<>
        <Switch>
            <Route path="/" exact={true}>
                root <Link to="/login">GO TO LOGIN</Link>
            </Route>
            <Route path="/login">
                login
            </Route>
        </Switch>
    </>)
}

ReactDOM.render(<BrowserRouter basename="/admin"><App /></BrowserRouter>, document.getElementById('app'))
