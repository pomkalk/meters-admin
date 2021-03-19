import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChart } from '../../store/dashboard/actions'
import { Card } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Label } from 'recharts'

const ChartWidget = () => {
    const dispatch = useDispatch()
    const chartData = useSelector(state => state.dashboard.chart)
    const [interval, initInterval] = useState(null)

    const action = () => {
        console.log('update')
        dispatch(getChart())
    }

    const subscribe = () => {
        action()
        initInterval(setInterval(action, 1000 * 10))
    }

    const unsubscribe = () => {
        if (interval) {
            clearInterval(interval)
            initInterval(null)
        }
    }

    useEffect(()=>{
        subscribe()
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <Card size="small" title="График показаний" extra={<a onClick={action}><ReloadOutlined /></a>}>
            {chartData && <BarChart width={400} height={250} data={chartData.data}>
                <XAxis dataKey="label">
                    <Label value={chartData.date} offset={0} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1890FF" />
            </BarChart>}
        </Card>
    )
}

export default ChartWidget
