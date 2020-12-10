import React from 'react'
import { useTitle } from '../hooks'

const NewsPage = () => {
    const [title] = useTitle('Новости')
    return 'NewsPage'
}

export default NewsPage
