import React, { useEffect, useState } from 'react'
import { useTitle, useSocket } from '../hooks'
import { Card, Form, Input, Button, message } from 'antd'


const UserSettingsPage = () => {
    const [title] = useTitle('Настройки пользователя')
    const [form] = Form.useForm()
    const socket = useSocket()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        socket.on('auth.change-password-error', onPasswordError)
        socket.on('auth.change-password-ok', onPasswordOk)
        return () => {
            socket.off('auth.change-password-error', onPasswordError)
            socket.off('auth.change-password-ok', onPasswordOk)
        }
    })

    const onPasswordError = (errors) => {
        form.setFields(errors)
        setLoading(false)
    }

    const onPasswordOk = () => {
        setLoading(false)
        form.resetFields()
        message.success('Пароль обновлен.')
    }

    const onPasswordChange = (data) => {
        if (data.pass_new !== data.pass_new2) {
            form.setFields([
                {name: 'pass_new', errors: ['Пароль не совпадает.']}, 
                {name: 'pass_new2', errors: ['Пароль не совпадает.']}
            ])
        } else {
            let validator = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
            if (!validator.test(data.pass_new)) {
                form.setFields([
                    {name: 'pass_new', errors: ['Пароль должен быть не короче 8 символов и содержать одну букву и одну цифру.']} 
                ])  
            } else {
                setLoading(true)
                socket.emit('auth.change-password', data)
            }
        }
    }

    return (<Card size="small" title="Изменить пароль">
        <Form form={form} layout="vertical" onFinish={onPasswordChange}>
            <Form.Item label="Текущий пароль" name="pass_old" rules={[{ required: true, message: 'Введите пароль.'}]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="Новый пароль" name="pass_new" rules={[{ required: true, message: 'Введите пароль.'}]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="Новый пароль еще раз" name="pass_new2" rules={[{ required: true, message: 'Введите пароль.'}]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">Изменить пароль</Button>
            </Form.Item>
        </Form>
        <ul>
            <li>Длинна пароля должна быть не меньше 8 символов.</li>
            <li>Пароль должен содержать одну букву и одну цифру.</li>
        </ul>
    </Card>)
}

export default UserSettingsPage
