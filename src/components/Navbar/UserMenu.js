import React from 'react'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const UserMenu = () => {
    const { user, logout } = useAuth()

    const makeLogout = (e) => {
        e.preventDefault()
        logout()
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/user/settings">
                    <SettingOutlined /> Настройки
                </Link>
            </Menu.Item>
            <Menu.Item>
                <a onClick={makeLogout}>
                    <LogoutOutlined /> Выход
                </a>
            </Menu.Item>
        </Menu>
    )

    return <Dropdown overlay={menu} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
            { user.getName() } <DownOutlined />
        </a>
    </Dropdown>
}

export default UserMenu
