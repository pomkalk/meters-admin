import React from 'react'
import { useUser } from '../hooks'

const Can = ({children, rule}) => {
    const user = useUser()

    if (user) {
        if (user.can(rule)) return <li>{children}</li>
    }

    return ''
}

export default Can
