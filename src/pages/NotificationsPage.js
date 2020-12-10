import React from 'react'
import { useTitle } from '../hooks'

const NotificationsPage = () => {
    const [title] = useTitle('Уведомления')
    return 'NotificationsPage'
}

export default NotificationsPage
