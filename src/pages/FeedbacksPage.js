import { Badge, Button, Modal, Spin, Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTitle, useSubscribe } from '../hooks'
import { ParseDate } from '../lib/ParseDate'
import { clearFbData, setFbMessage, updateFb } from '../store/feedbacks/actions'

const FeedbacksPage = () => {
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

    const onPageChange = (paginator) => {
        fetchData(paginator.current, paginator.pageSize)
    }

    const openFeedback = (id) => {
        socket.emit('feedbacks.message.get', id)
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
                    return <a onClick={()=>openFeedback(rec.id)}>{text}</a>
                }}/>
                <Table.Column title="Дата" dataIndex="created_at" render={(text)=>ParseDate(text)}/>
            </Table>}
        {!feedbacks.loading&&<Modal visible={feedbacks.message} title="Отзыв" onCancel={()=>dispatch(setFbMessage(null))} footer={[<Button key="ok" onClick={()=>dispatch(setFbMessage(null))}>Ok</Button>]}>
            <pre>{JSON.stringify(feedbacks.message, null, 2)}</pre>
        </Modal>}
    </>)
}

export default FeedbacksPage
