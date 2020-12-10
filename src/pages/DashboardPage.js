import React from 'react'
import { useTitle, useUser } from '../hooks'
import { useAccess } from '../hooks'

const DashboardPage = () => {
    const [title] = useTitle('Dashboard')
    const user = useUser()
    useAccess('dashboard')

    return <pre>{JSON.stringify(user, null, 2)}</pre>
}

export default DashboardPage
