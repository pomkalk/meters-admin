import { Badge, Button, Modal, Spin, Table, Form, Input, Collapse, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTitle, useSubscribe } from '../hooks'
import { ParseDate } from '../lib/ParseDate'
import { clearFbData, setFbMessage, updateFb, openFeedback, setFbMessageClear } from '../store/feedbacks/actions'

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

const FeedbacksPage = () => {
    const [form] = Form.useForm()
    const [title] = useTitle('Отзывы')
    const feedbacks = useSelector(state=>state.feedbacks)
    const dispatch = useDispatch()
    const socket = useSubscribe('event.feedbacks-updated', (socket) => {
        dispatch(updateFb())
    })


    const fetchData = (page=1, pageSize=10) => {
        socket.emit('feedbacks.data.get', {page, pageSize})
    }
    
    useEffect(()=>{
        fetchData()
        return () => {
            dispatch(clearFbData())
        }
    }, [])

    useEffect(()=>{
        if (feedbacks && feedbacks.message) {
            form.setFieldsValue(feedbacks.message)
        }
    }, [feedbacks])

    const onPageChange = (paginator) => {
        fetchData(paginator.current, paginator.pageSize)
    }

    let feedbacks_view = null
    let meters_view = null
    if (feedbacks && feedbacks.message) {
        if (feedbacks.extra.feedbacks && feedbacks.extra.feedbacks.length > 1) {
            feedbacks_view = (
                <Collapse.Panel header="Все отзывы">
                    <Table dataSource={feedbacks.extra.feedbacks} rowKey="id" pagination={false}>
                        <Table.Column title="Дата" dataIndex="created_at" render={(text)=>ParseDate(text)}/>
                        <Table.Column title="Текст" dataIndex="body" render={(text, rec) => {
                            if (rec.id === feedbacks.message.id) {
                                return <Typography.Text strong>{text}</Typography.Text>
                            }
                            return text
                        }}/>
                    </Table>
                </Collapse.Panel>
            )
        }
        if (feedbacks.extra.meters) {
            meters_view = (
                <Collapse.Panel header="Счетчики">
                    <Table dataSource={feedbacks.extra.meters} rowKey="id" pagination={false}>
                        <Table.Column title="Счетчик" dataIndex="service" render={(text, rec) => {
                            switch (rec.service) {
                                case 1: return 'Холодная вода'
                                case 2: return 'Горячая вода'
                                case 3: return 'Электроэнергия'
                                case 4: return 'Отопление'
                                default: return text
                            }
                        }} />
                        <Table.Column title="status" dataIndex="status" />
                        <Table.Column title="Дата последних показаний" dataIndex="last_date" render={(text, rec) => {
                            return `${getMonthName(rec.last_month)} ${rec.last_year}`
                        }} />
                        <Table.Column title="Последнее показанее" dataIndex="last_value" />
                        <Table.Column title="Показания" dataIndex="new_value" render={(text, rec) => {
                            return `${getMonthName(rec.last_month)} ${rec.last_year}`
                        }} />
                        <Table.Column title="Дата" dataIndex="new_date" render={(text)=>ParseDate(text)}/>
                    </Table>
                </Collapse.Panel>
            )
        }
    }
    

    return (<>
        {feedbacks.loading&&<Spin />}
        {!feedbacks.loading&&<Table 
            dataSource={feedbacks.data}
            rowKey="id"
            onChange={onPageChange}
            pagination={{
                total: feedbacks.total,
                pageSize: feedbacks.pageSize,
                current: feedbacks.page,
                showSizeChanger: true
            }}>
                <Table.Column title="" dataIndex="read" render={(text) => {
                    if (text===null) {
                        return <Badge status="warning" />
                    }
                    return ''
                }}/>
                <Table.Column title="ID" dataIndex="id" />
                <Table.Column title="ЛС" dataIndex="ls" />
                <Table.Column title="Адрес" dataIndex="address" />
                <Table.Column title="Текст" dataIndex="body" render={(text,rec) => {
                    return <a onClick={()=>dispatch(openFeedback(rec.id))}>{text}</a>
                }}/>
                <Table.Column title="Дата" dataIndex="created_at" render={(text)=>ParseDate(text)}/>
            </Table>}
        {!feedbacks.loading&&<Modal width={960} visible={feedbacks.message} title="Отзыв" onCancel={()=>dispatch(setFbMessageClear())} footer={[<Button key="ok" onClick={()=>dispatch(setFbMessageClear())}>Ok</Button>]}>
            <Form form={form} layout="vertical" size="small">
                <Form.Item label="Лицевой счет" name="ls">
                    <Input readOnly />
                </Form.Item>
                <Form.Item label="Адрес" name="address">
                    <Input readOnly />
                </Form.Item>
                <Form.Item label="Дата" name="created_at">
                    <Input readOnly />
                </Form.Item>                
                <Form.Item label="Сообщение" name="body">
                    <Input.TextArea rows={8} readOnly />
                </Form.Item>
            </Form>

            <Collapse ghost>
                { feedbacks_view }
                { meters_view }
            </Collapse>


        </Modal>}
    </>)
}

export default FeedbacksPage
