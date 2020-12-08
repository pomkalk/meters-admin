import React from 'react'
import { Modal, Menu } from 'antd'
import { CommentOutlined, DashboardOutlined, DatabaseOutlined, DesktopOutlined, HddOutlined, LoginOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons'
import { useLocation, matchPath, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const MainMenu = () => {
    const { user, logout } = useAuth()
    const { pathname } = useLocation()

    const confirm = () => {
        Modal.confirm({
            content: 'Вы действительно хотите выйти?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
                logout()
            }
        })
    }

    const menuItems = [
        {key: 'dashboard', title: 'Dashboard', access: '', icon: <DashboardOutlined />},
        {key: 'meters', title: 'Счетчики', access: '', icon: <HddOutlined />},
        {key: 'database', title: 'База данных', access: '', icon: <DatabaseOutlined />},
        {key: 'news', title: 'Новости', access: '', icon: <DesktopOutlined />},
        {key: 'notifications', title: 'Уведомления', access: '', icon: <NotificationOutlined />},
        {key: 'feedbacks', title: 'Отзывы', access: '', icon: <CommentOutlined />},
        {key: 'settings', title: 'Настройки', access: '', icon: <SettingOutlined />},
    ].reduce((t, v) => {
        return [...t, v]
    }, [])

    const selected = menuItems.find(x => {
        return matchPath(pathname, {
            path: `/${x.key}`
        })
    })

    return (<Menu selectedKeys={selected && selected.key}>
        { menuItems.map(x => {
            return <Menu.Item key={x.key} icon={x.icon}><Link to={`/${x.key}`}>{ x.title }</Link></Menu.Item>
        })}
        <Menu.Divider />
        <Menu.Item icon={<LoginOutlined />}><a onClick={confirm}>Выход</a></Menu.Item>
    </Menu>)
}

export default MainMenu
