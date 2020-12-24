import React, {useEffect} from 'react'
import { Modal, Menu, Badge } from 'antd'
import { useLocation, matchPath, Link } from 'react-router-dom'
import { LoginOutlined } from '@ant-design/icons'
import useAuth from '../../hooks/useAuth'
import { useSocket } from '../../hooks'
import { useSelector } from 'react-redux'

const MainMenu = ({menuItems}) => {
    const { logout } = useAuth()
    const { pathname } = useLocation()
    const socket = useSocket()
    const {feedsCount} = useSelector(state=>({feedsCount: state.page.feedsCount}))

    useEffect(()=>{
        socket.emit('feedbacks.count.get')
    }, [])

    const confirm = () => {
        Modal.confirm({
            content: 'Вы действительно хотите выйти?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
                logout()
            }
        })
    }



    const selected = menuItems.find(x => {
        return matchPath(pathname, {
            path: `/${x.key}`
        })
    })

    return (<Menu selectedKeys={selected && selected.key}>
        { menuItems.map(x => {
            if (x.key === 'feedbacks'&&feedsCount>0) {
                return <Menu.Item key={x.key} icon={x.icon}><Badge offset={[10, 0]} count={feedsCount}><Link to={`/${x.key}`}>{ x.title }</Link></Badge></Menu.Item>
            }
            return <Menu.Item key={x.key} icon={x.icon}><Link to={`/${x.key}`}>{ x.title }</Link></Menu.Item>
        })}
        <Menu.Divider />
        <Menu.Item icon={<LoginOutlined />}><a onClick={confirm}>Выход</a></Menu.Item>
    </Menu>)
}

export default MainMenu
