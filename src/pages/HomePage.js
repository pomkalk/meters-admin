import React from 'react'
import Navbar from '../components/Navbar'
import MainMenu from '../components/menu/MainMenu'
import { Route, Switch, useRouteMatch, Redirect, useLocation } from 'react-router-dom'
import { routing } from '../routing'
import UserSettingsPage from './UsetSettingsPage'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const HomePage = () => {
    const { url } = useRouteMatch()
    const location = useLocation()

    return (<div className="home-page">
        <Navbar />
        <div className="main-container">
            <div className="menu">
                <MainMenu />
            </div>
            <div className="content">
                
                        <Switch>
                            <Route path="/" exact={true}>
                                <Redirect to="/dashboard" />
                            </Route>
                            <Route path="/user/settings" exact={true}>
                                <UserSettingsPage />
                            </Route>
                            { routing.map(x => {
                                return <Route key={x.path} path={`${url}${x.path}`} exact={x.exact}>
                                    { x.component }
                                </Route>
                            })}
                        </Switch>
                
            </div>
        </div>
    </div>)
}

export default HomePage
