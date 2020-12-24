import React, { useEffect, useState } from 'react'
import { useSocket, useSubscribe } from '../hooks'
import { Table, Switch, Modal, Input } from 'antd'
import { useSelector } from 'react-redux'

const Param = ({name, value, updateValue}) => {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState(value)

    const show = () => setVisible(true)
    const hide = () => setVisible(false)
    const update = () => {
        hide()
        updateValue(name, data)
    }

    return (<>
        <Modal title={`Изменить параметр`} visible={visible} onCancel={hide} onOk={update}>
            <Input.TextArea rows={10} value={data} onChange={(e) => setData(e.target.value)} />
        </Modal>
        <a onClick={show}>{value}</a>
    </>)
}

const SettingsConfigPage = () => {
    const socket = useSocket()
    const configData = useSelector(state => state.settings.config)

    const fetchData = () => {
        socket.emit('config.data.get')
    }

    useSubscribe('event.config-updated', (socket) => {
        console.log('q11')
        fetchData()
    })

    useEffect(() => {
        fetchData()
    }, [])

    const nameRender = (text, record) => {
        switch (record.key) {
            case 'site_on': return 'Доступ к сайту'
            case 'siteoff_msg': return 'Сообщение о блокировки сайта'
            case 'meters_period': return 'Период доступа к сайту'
            case 'meters_msg': return 'Сообщение вне периода доступа'
            case 'meters_block': return 'Сообщение о блокировки счетчика'
            case 'current': return 'Текущий активный период'
        }
    }

    const updateValue = (key, value) => {
        socket.emit('config.data.set', {key, value})
    }

    const valueRender = (text, record) => {
        switch (record.key) {
            case 'site_on': return <Switch checked={record.valb} onChange={(b) => updateValue('site_on', b)} />
            case 'siteoff_msg': return <Param name={record.key} value={record.valt} updateValue={updateValue} />
            case 'meters_period': return <Param name={record.key} value={record.valt} updateValue={updateValue} />
            case 'meters_msg': return <Param name={record.key} value={record.valt} updateValue={updateValue} />
            case 'meters_block': return <Param name={record.key} value={record.valt} updateValue={updateValue} />
            case 'current': return record.vali
        }
    }

    return (<Table dataSource={configData} loading={configData?false:true} pagination={false}>
            <Table.Column title="Название" render={nameRender}/>
            <Table.Column title="Значение" render={valueRender}/>
        </Table>)
}

export default SettingsConfigPage
