import React from 'react'
import useTitle from '../hooks/useTitle'

const DatabasePage = () => {
    const [title] = useTitle('База данных')
    return 'DatabasePage'
}

export default DatabasePage
