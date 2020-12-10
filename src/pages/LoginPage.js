import React from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router-dom';
import { useSocket, useAuth } from '../hooks';


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

const LoginPage = () => {
    const {user, login, status} = useAuth()
    const socket = useSocket()
    
    if (user) return <Redirect to="/" />

    const submit = (values) => {
        login(values)
    }

    return <div className="login-page">
        <div className="title">
            <h3>ООО "УЕЗ ЖКУ г. Ленинска-Кузнецкого"</h3>
            <h3>Панель администратора</h3>
        </div>
        
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ username: localStorage.getItem('last_username') }}
        onFinish={submit}
        style={{minWidth: '350px'}}
        >
        <Form.Item
            name="username"
            rules={[{ required: true, message: 'Введите имя пользователя.' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя пользователя" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль.' }]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
            />
        </Form.Item>
        <Form.Item>
            <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button" loading={status.pending}>
            Войти
            </Button>
        </Form.Item>
        { status.error && <Alert style={{width: '100%'}} type="error" message="Ошибка" description={status.error} /> }
        </Form>
    </div>
}

export default LoginPage
