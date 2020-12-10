import React from 'react'
import Navbar from '../components/Navbar'
import MainMenu from '../components/menu/MainMenu'
import { Route, Switch, useRouteMatch, Redirect, useLocation } from 'react-router-dom'
import { routing } from '../routing'
import { CommentOutlined, DashboardOutlined, DatabaseOutlined, DesktopOutlined, HddOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons'
import { useUser } from '../hooks'
import Preloader from '../components/Preloader'
const UserSettingsPage = React.lazy(() => import('./UsetSettingsPage'))

const HomePage = () => {
    const { url } = useRouteMatch()
    const user = useUser()

    const menu = [
        {key: 'dashboard', title: 'Dashboard', access: 'dashboard', icon: <DashboardOutlined />},
        {key: 'meters', title: 'Счетчики', access: 'meters', icon: <HddOutlined />},
        {key: 'database', title: 'База данных', access: 'import', icon: <DatabaseOutlined />},
        {key: 'news', title: 'Новости', access: 'news', icon: <DesktopOutlined />},
        {key: 'notifications', title: 'Уведомления', access: 'notify', icon: <NotificationOutlined />},
        {key: 'feedbacks', title: 'Отзывы', access: 'feeds', icon: <CommentOutlined />},
        {key: 'settings', title: 'Настройки', access: ['users', 'config'], icon: <SettingOutlined />},
    ]
    
    const menuItems = menu.reduce((t, v) => {
        if (user.can(v.access)) {
            return [...t, v]
        }
        return t
    }, [])

    const defaultRedirect = `/${menuItems[0].key}`

    return (<div className="home-page">
        <Navbar />
        <div className="main-container">
            <div className="menu">
                <MainMenu menuItems={menuItems} />
            </div>
            <div className="content">
                <Preloader>
                    <Switch>
                        <Route path="/" exact={true}>
                            <Redirect to={defaultRedirect} />
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
                </Preloader>
            </div>
        </div>
    </div>)
}

export default HomePage
