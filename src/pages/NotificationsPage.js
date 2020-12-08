import React from 'react'
import useTitle from '../hooks/useTitle'

const NotificationsPage = () => {
    const [title] = useTitle('Уведомления')
    return 'NotificationsPage'
}

export default NotificationsPage
