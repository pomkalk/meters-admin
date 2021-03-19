import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStat } from '../../store/dashboard/actions'
import { Card, Statistic, Space } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Label } from 'recharts'

const Stat = () => {
    const dispatch = useDispatch()
    const stat = useSelector(state => state.dashboard.stat)
    const [interval, initInterval] = useState(null)

    const action = () => {
        dispatch(getStat())
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

    let stats = null

    if (stat) {
        stats = (
            <Space>
                <Statistic title="Всего передано" value={stat.all} />
                <Statistic title="С мобильного" value={stat.mobile} />
                <Statistic title="Устройств" value={stat.devices} />
            </Space>
        )
    }

    return (
        <Card size="small" title="Статистика" extra={<a onClick={action}><ReloadOutlined /></a>}>
            { stats }
        </Card>
    )
}

export default Stat
