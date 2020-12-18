import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSubscribe } from '../hooks'
import { Table, Dropdown, Menu, Badge, Tag, Tooltip, Button, Space } from 'antd'
import { MenuOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import UsersModifyDialog from '../components/config/UsersModifyDialog'

const SettingsUsersPages = () => {
    const [userDialogData, setUserDialogData] = useState({
        visible: false,
        edit: false,
        user: null
    })
    const socket = useSubscribe('event.users-updated', (socket) => {
        fetchData()
    })
    const users = useSelector(state => state.settings.users)

    const fetchData = () => {
        socket.emit('users.data.get')
    }

    useEffect(() => {
        fetchData()
    }, [])

    const menu = (<Menu>
        <Menu.Item><a><EditOutlined />Редактировать</a></Menu.Item>
        <Menu.Item><a><DeleteOutlined />Удалить</a></Menu.Item>
    </Menu>)

    const renderUserName = (text, record) => {
        if (record.root) {
        return <Tag color="#04804c">{text}</Tag>
        }
        return text
    }

    const renderUserOnline = (text, record) => {
        if (record.online) {
            return <Badge status="processing" text="Online" />
        } 
        if (!record.last_online) {
            return <Badge status="default" text="Offline" />
        }
        return <Tooltip title={record.last_online.toString()}><Badge status="default" text="Offline" /></Tooltip>
    }

    const renderUserAction = (text, record) => {
        return (<Dropdown overlay={menu} trigger={['click']}>
            <a><MenuOutlined /></a>
        </Dropdown>)
    }

    const columns = [
        {
            dataIndex: 'name',
            title: 'Имя',
            render: renderUserName
        },
        {
            dataIndex: 'username',
            title: 'Имя пользоватля'
        },
        {
            key: 'online',
            title: 'Online',
            render: renderUserOnline
        },
        {
            key: 'act',
            render: renderUserAction
        }
    ]

    const renderTitle = () => {
        return (<Space><Button onClick={()=>setUserDialogData({visible: true})}>Добавить пользователя</Button>
        <UsersModifyDialog data={userDialogData} onCancel={()=>setUserDialogData({visible:false})} /></Space>)
    }

    return <Table dataSource={users} rowKey="id" columns={columns} pagination={false} title={renderTitle} />
}

export default SettingsUsersPages
