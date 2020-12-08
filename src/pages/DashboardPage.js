import React from 'react'
import useTitle from '../hooks/useTitle'
import useUser from '../hooks/useUser'

const DashboardPage = () => {
    const [title] = useTitle('Dashboard')
    const user = useUser()

    const onClick = () => {
        console.log('click')
        console.log(user)
        user.can('qwe')
    }

    return <pre onClick={onClick}>{JSON.stringify(user, null, 2)}</pre>
}

export default DashboardPage
