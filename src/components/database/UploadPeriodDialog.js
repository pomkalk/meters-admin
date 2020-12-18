import React, { useState, useEffect } from 'react'
import { Button, Modal, Select, Input, Space, Upload, Typography, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket, useSubscribe } from '../../hooks'
import { setDbImportConfi } from '../../store/database/actions'
import { UploadOutlined } from '@ant-design/icons'
import { ParseDate } from '../../lib/ParseDate'
import { ImportOutlined } from '@ant-design/icons'

const UploadPeriodDialog = () => {
    const [visible, setVisible] = useState(false)
    const [faddr, setAddr] = useState(null)
    const [fsc, setSc] = useState(null)
    const config = useSelector(state => state.database.importConfig)
    const status = useSelector(state => state.database.status)
    const socket = useSubscribe('event.database-importing')
    const dispatch = useDispatch()

    useSubscribe('event.periods-updated', (socket) => {
        fetchConfig()
    })

    const fetchConfig = () => {
        socket.emit('database.config.get')
    }

    useEffect(() => {
        fetchConfig()
        return () => {
            dispatch(setDbImportConfi(null))
        }
    }, [])

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

    const onUploading = (info) => {
        if (info.file.status === 'done') {
            try {
                console.log(info.file.response)
                let a = info.file.response.split('|')
                if (a[0]==='addr') setAddr(a[1])
                if (a[0]==='sc') setSc(a[1])
            } catch (e) {
                console.log(e)
            }
        }
    }

    const beforeUpload = (file, fileList) => {
        return true
    }

    const onOk = () => {
        if (faddr===null || fsc===null) {
            return notification.info({ message: 'Загрузите все файлы.'})
        }
        let data = {
            period: config.period,
            files: {addr: faddr, sc: fsc}
        }
        socket.emit('database.import.start', data)
        setVisible(false)
    }

    const buttonText = status ? 'Идет загрузка' : 'Загрузить данные'

    return (<>
        <Button onClick={()=>setVisible(true)} loading={status?true:false}><ImportOutlined />{buttonText}</Button>
        {config&&
        <Modal title="Загрузка данных" visible={visible} onCancel={()=>setVisible(false)} closable={false} onOk={onOk} okText="Загрузить" cancelText="Отмена">
            <Space direction="vertical">
                <Typography.Text strong>Данные за период {`${getMonthName(config.period.month)} ${config.period.year} г.`}</Typography.Text>
                <Typography.Text strong>С {ParseDate(config.interval[0])} по {ParseDate(config.interval[1])}</Typography.Text>
                
                <Upload multiple={true} action="/admin359/import/file" name="addr" onChange={onUploading} beforeUpload={beforeUpload} headers={{token: sessionStorage.getItem('ujw')}} accept=".dbf">
                    <Button icon={<UploadOutlined />}>Выберите файл</Button>
                </Upload>
            </Space>
        </Modal>}
        </>)
}

export default UploadPeriodDialog
