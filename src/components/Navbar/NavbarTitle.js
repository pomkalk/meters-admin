import React from 'react'
import useTitle from '../../hooks/useTitle'
import { DashboardOutlined } from '@ant-design/icons'

const NavbarTitle = () => {
    const [title] = useTitle()
    return <h3 style={{marginBottom: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{title}</h3>
}

export default NavbarTitle
