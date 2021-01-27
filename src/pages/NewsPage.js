import { Badge, Button, Modal, Space, Spin, Table, Menu, Dropdown } from 'antd'
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTitle, useSubscribe } from '../hooks'
import { ParseDate } from '../lib/ParseDate'
import { clearNewsData, setNewsMessage, updateNews } from '../store/news/actions'

const NewsPage = () => {
    const [title] = useTitle('Новости')
    const news = useSelector(state=>state.news)
    const history = useHistory()
    const dispatch = useDispatch()

    const socket = useSubscribe('event.news-updated', (socket) => {
        dispatch(updateNews())
    })


    const fetchData = (page=1, pageSize=10) => {
        socket.emit('news.data.get', {page, pageSize})
    }
    
    useEffect(()=>{
        fetchData()
        return () => {
            dispatch(clearNewsData())
        }
    }, [])

    const onPageChange = (paginator) => {
        fetchData(paginator.current, paginator.pageSize)
    }

    const openNews = (id) => {
        socket.emit('news.message.get', id)
    }

    const tableHeader = (
        <Space direction="horizontal">
            <Button onClick={()=>history.push('/news/add')}>Добавить новость</Button>
        </Space>
    )

    return (<>
        {news.loading&&<Spin />}

        {!news.loading&&<Table 
            title={()=>tableHeader}
            dataSource={news.data}
            rowKey="id"
            onChange={onPageChange}
            pagination={{
                total: news.total,
                pageSize: news.pageSize,
                current: news.page,
                showSizeChanger: true
            }}>
                <Table.Column title="ID" dataIndex="id" />
                <Table.Column title="Заголовок" dataIndex="title" />
                <Table.Column title="Текст" dataIndex="body" render={(text,rec) => {
                    return <a onClick={()=>openNews(rec.id)}>{text}</a>
                }}/>
                <Table.Column title="Автор" dataIndex="author" />
                <Table.Column title="Дата" dataIndex="updated_at" render={(text)=>ParseDate(text)}/>
                <Table.Column title="" key="action" render={(text, rec) => {

                    const onRemove = () => {
                        socket.emit('news.delete', rec.id)
                    }

                    const menu = (<Menu>
                        <Menu.Item><a onClick={onRemove}><DeleteOutlined /> Удалить</a></Menu.Item>
                    </Menu>)
                    return (<Dropdown overlay={menu} trigger={['click']}>
                                <a><MenuOutlined /></a>
                            </Dropdown>)
                }} />
            </Table>}
        {!news.loading&&<Modal visible={news.message} title="NEWS" onCancel={()=>dispatch(setNewsMessage(null))} footer={[<Button key="ok" onClick={()=>dispatch(setNewsMessage(null))}>Ok</Button>]}>
            <pre>{JSON.stringify(news.message, null, 2)}</pre>
        </Modal>}
    </>)
}

export default NewsPage
