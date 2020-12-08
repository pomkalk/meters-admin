import React from 'react'
import useTitle from '../hooks/useTitle'

const NewsPage = () => {
    const [title] = useTitle('Новости')
    return 'NewsPage'
}

export default NewsPage
