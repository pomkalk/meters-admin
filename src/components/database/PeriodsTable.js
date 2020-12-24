import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSubscribe, useUser } from '../../hooks'
import { clearDbPeriods, setDbLoading } from '../../store/database/actions'
import { Table, Checkbox, Space, Dropdown, Tag, Menu, Modal, message, Tooltip } from 'antd'
import { ParseDate } from '../../lib/ParseDate'
import UploadPeriodDialog from '../../components/database/UploadPeriodDialog'
import { MenuOutlined, DeleteOutlined, DownloadOutlined, RollbackOutlined } from '@ant-design/icons'
import Can from '../Can'

const PeriodsTable = () => {
    const user = useUser()
    const {periods, loading} = useSelector(state => ({periods: state.database.periods, loading: state.database.loading }))
    const dispatch = useDispatch()
    const socket = useSubscribe('event.periods-updated', (socket) => {
        fetchPeriods()
    })

    const fetchPeriods = (deleted = false) => {
        dispatch(setDbLoading(true))
        socket.emit('database.periods.get', {deleted})
    }

    useEffect(() => {
        console.log('xxx')
        fetchPeriods()
        return () => {
            console.log('zzz')
            dispatch(clearDbPeriods())
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

    const renderName = (text, record) => {
        return <>{`${getMonthName(record.month)} ${record.year}`}{record.deleted_at&&<Tooltip title={ParseDate(record.deleted_at)}><Tag color="red">Удален</Tag></Tooltip>}</>
    }

    const columns = [
        {
            title: 'Период',
            key: 'name',
            render: renderName
        },
        {
            title: 'Начало периода',
            dataIndex: 'p_start',
            render: (text) => ParseDate(text)
        },
        {
            title: 'Конец периода',
            dataIndex: 'p_end',
            render: (text) => ParseDate(text)
        },
        {
            title: 'Дата загрузки',
            dataIndex: 'created_at',
            render: (text) => ParseDate(text)
        }, 
        {
            title: '',
            key: 'action',
            render: (text, record) => {
                const onRemove = () => {
                    Modal.confirm({
                        title: `Удалить период: ${getMonthName(record.month)} ${record.year}`,
                        onOk: () => {
                            socket.emit('database.period.delete', record.id)
                        },
                        okText: 'Да', cancelText: 'Нет'
                    })
                }

                const onDownload = () => {
                    let hideIndicator = message.loading(`Скачиваю данные периода: ${getMonthName(record.month)} ${record.year}`, 0)
                    socket.emit('database.download', {name: `Показания ${getMonthName(record.month)} ${record.year}`, period_id: record.id}, (name, data) => {
                        try {
                            if (data!=null) {
                                const blobUrl = URL.createObjectURL(new Blob([data], {type: 'text/plain'}))
                                let link = document.createElement('a')
                                link.href = blobUrl
                                link.download = name
                                document.body.appendChild(link)
                                link.dispatchEvent(new MouseEvent('click', {
                                    bubbles: true,
                                    cancelable: true,
                                    view: window
                                }))
                                document.body.removeChild(link)
                            }
                        } catch (e) {
                            console.log(e)
                            message.error('Ошибка')
                        } finally {
                            hideIndicator()
                        }
                    })
                }

                const onMove = () => {

                }

                let showRemoveButton = record.deletable && user.can('import.d')

                const menu = (<Menu>
                    <Menu.Item><a onClick={onDownload}><DownloadOutlined /> Скачать</a></Menu.Item>
                    {record.deleted_at&&<Menu.Item><a onClick={onMove}><RollbackOutlined /> Переместить показания</a></Menu.Item>}
                    {showRemoveButton&&<Menu.Item><a onClick={onRemove}><DeleteOutlined /> Удалить</a></Menu.Item>}
                </Menu>)
                return (<Dropdown overlay={menu} trigger={['click']}>
                    <a><MenuOutlined /></a>
                </Dropdown>)
            }
        }
    ]

    const tableHeader = () => {
        return <Space>{user.can('import.i')&&<UploadPeriodDialog />}<Checkbox onChange={(e) => fetchPeriods(e.target.checked)}>Показать удаленные</Checkbox></Space>
    }
    
    return <Table size="small" title={tableHeader} dataSource={periods} loading={loading} rowKey="id" columns={columns} />
}

export default PeriodsTable
