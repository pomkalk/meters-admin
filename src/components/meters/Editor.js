import React, { useState } from 'react'
import { Card, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Confirm from './Confirm'
import { ParseDate } from '../../lib/ParseDate'

const Editor = ({data}) => {
    const dispatch = useDispatch()
    const saving = useSelector(state=>state.meters.saving)
    const [visible, setVisible] = useState(false)

    const getMonthName = (code) => {
        switch (code) {
            case 1: return 'Январь'
            case 2: return 'Февраль'
            case 3: return 'Март'
            case 4: return 'Апрель'
            case 5: return 'Май'
            case 6: return 'Июнь'
            case 7: return 'Июль'
            case 8: return 'Август'
            case 9: return 'Сентябрь'
            case 10: return 'Октябрь'
            case 11: return 'Ноябрь'
            case 12: return 'Декабрь'
            default: return code
        }
    }

    const columns = [
        {
            title: 'Счетчик',
            dataIndex: 'service',
            render: (text, rec) => {
                switch (rec.service) {
                    case 1: return 'Холодная вода'
                    case 2: return 'Горячая вода'
                    case 3: return 'Электроэнергия'
                    case 4: return 'Отопление'
                    default: return text
                }
            }
        },
        {
            title: 'Дата последних показаний',
            key: 'last_date',
            render: (text, rec) => {
                return `${getMonthName(rec.last_month)} ${rec.last_year}`
            }
        },
        {
            title: 'Последнее показанее',
            dataIndex: 'last_value'
        },
        {
            title: 'Показания',
            dataIndex: 'new_value',
            render: (text, rec) => {
                return <Confirm loading={saving===rec.id} value={rec.new_value} lastValue={rec.last_value} id={rec.id} />
            }
        },
        {
            title: 'Дата',
            dataIndex: 'new_date',
            render: (text) => ParseDate(text)
        },
        {
            title: 'Пользователь',
            key: 'user',
            render: (text, rec) => {
                if (rec.src === 0) return 'Сайт'
                if (rec.src === -1) return 'Телефон'
                return rec.user
            }
        },
    ]


    return (<>
        {data&&<div className="box2">
            <Card title={data.address} size="small">
                <Table size="small" pagination={false} dataSource={data.meters} columns={columns} rowKey="id" title={() => `Период: ${getMonthName(data.period.month)} ${data.period.year} г.`}/>
            </Card>
        </div>}
    </>)
    
}

export default Editor
