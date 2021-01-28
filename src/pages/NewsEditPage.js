import { Badge, Button, Modal, Space, Spin, Table, Form, Input, Checkbox } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTitle, useSubscribe, useSocket } from '../hooks'
import { ParseDate } from '../lib/ParseDate'
import { clearNewsData, setNewsMessage } from '../store/news/actions'

const NewsEditPage = () => {
    const [title] = useTitle('Новости: редактировать')
    const dispatch = useDispatch()
    const history = useHistory()
    const socket = useSocket()
    const [form] = Form.useForm()
    const data = useSelector(state=>state.news.edit)

    const onSubmit = (data) => {
        console.log(data)
        socket.emit('news.edit.update', data)
        history.push('/news')
    }

    return (<>
            {data&&<Form form={form} layout="vertical" onFinish={onSubmit} initialValues={{
                id: data.id,
                title: data.title,
                body: data.body
            }}>
                <Form.Item hidden name="id">
                    <Input hidden />
                </Form.Item>
                <Form.Item label={`Заголовок (id: ${data.id})`} name="title" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Сообщение" name="body" rules={[{required: true}]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit">Сохранить</Button>
            </Form.Item> 
            </Form>}
        </>)
}

export default NewsEditPage
