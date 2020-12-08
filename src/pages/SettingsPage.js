import React from 'react'
import useTitle from '../hooks/useTitle'
import { Tabs } from 'antd'

const SettingsPage = () => {
    const [title] = useTitle('Настройки')
    return (<Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Пользователи" key="1">
            users
        </Tabs.TabPane>
        <Tabs.TabPane tab="Переменные" key="2">
            variables
        </Tabs.TabPane>
    </Tabs>)
}

export default SettingsPage
