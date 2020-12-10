import React from 'react'
import { useTitle } from '../hooks'

const FeedbacksPage = () => {
    const [title] = useTitle('Отзывы')
    return 'FeedbacksPage'
}

export default FeedbacksPage
