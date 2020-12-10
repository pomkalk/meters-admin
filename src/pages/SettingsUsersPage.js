import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSubscribe } from '../hooks'
import { Table } from 'antd'

const SettingsUsersPages = () => {
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

    const columns = [
        {
            dataIndex: 'name',
            title: 'Имя'
        },
        {
            dataIndex: 'username',
            title: 'Имя пользоватля'
        },
    ]

    return <Table dataSource={users} rowKey="id" columns={columns} pagination={false} />
}

export default SettingsUsersPages
