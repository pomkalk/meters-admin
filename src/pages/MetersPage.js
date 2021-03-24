import React from 'react'
import SearchInput from '../components/meters/SearchInput'
import { useTitle } from '../hooks'

const MetersPage = () => {
    const [title] = useTitle('Счетчики')
    return (
        <SearchInput />
    )
}

export default MetersPage
