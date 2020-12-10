import React from 'react'
import { Modal, Menu } from 'antd'
import { useLocation, matchPath, Link } from 'react-router-dom'
import { LoginOutlined } from '@ant-design/icons'
import useAuth from '../../hooks/useAuth'

const MainMenu = ({menuItems}) => {
    const { logout } = useAuth()
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
