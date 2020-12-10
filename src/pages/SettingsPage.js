import React, { Suspense } from 'react'
import Preloader from '../components/Preloader'
import { useTitle, useUser } from '../hooks'
import { Tabs } from 'antd'

const SettingsConfigPage = React.lazy(() => import('./SettingsConfigPage'))
const SettingsUsersPage = React.lazy(() => import('./SettingsUsersPage'))

const SettingsPage = () => {
    const [title] = useTitle('Настройки')
    const user = useUser()
    

    return (<Tabs defaultActiveKey="1">
        { user.can('users') && <Tabs.TabPane tab="Пользователи" key="1">
            <Preloader>
                <SettingsUsersPage />
            </Preloader>
        </Tabs.TabPane>}
        { user.can('config') && <Tabs.TabPane tab="Переменные" key="2">
            <Preloader fallback={'loading'}>
                <SettingsConfigPage />
            </Preloader>
        </Tabs.TabPane>}
    </Tabs>)
}

export default SettingsPage
