import { Badge, Button, Modal, Space, Spin, Table, Form, Input, Checkbox } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTitle, useSubscribe, useSocket } from '../hooks'
import { ParseDate } from '../lib/ParseDate'
import { clearNewsData, setNewsMessage } from '../store/news/actions'

const NewsAddPage = () => {
    const [title] = useTitle('Новости: добавить')
    const dispatch = useDispatch()
    const history = useHistory()
    const socket = useSocket()
    const [form] = Form.useForm()

    const onSubmit = (data) => {
        socket.emit('news.add', data)
        history.push('/news')
    }

    return (<>
            <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={{notify: true}}>
                <Form.Item label="Заголовок" name="title" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Сообщение" name="body" rules={[{required: true}]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Сообщение" name="notify" rules={[{required: true}]} valuePropName="checked">
                    <Checkbox>Отправить уведомление</Checkbox>
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit">Сохранить</Button>
            </Form.Item> 
            </Form>
        </>)
}

export default NewsAddPage
