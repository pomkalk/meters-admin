import React from 'react'
import { useTitle, useUser } from '../hooks'
import { useAccess } from '../hooks'
import ChartWidget from '../components/dashboard/ChartWidget'
import Stat from '../components/dashboard/Stat'
import { Row, Col } from 'antd'

const DashboardPage = () => {
    const [title] = useTitle('Dashboard')
    const user = useUser()
    useAccess('dashboard')

    return (
        <Row gutter={16}>
            <Col span={12}>
                <ChartWidget />
            </Col>
            <Col span={12}>
                <Stat />
            </Col>
        </Row>
        
    )
}

export default DashboardPage
