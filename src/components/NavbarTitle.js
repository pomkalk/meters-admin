import React from 'react'
import { useSelector } from 'react-redux'
import useTitle from '../hooks/useTitle'
import { setTitle } from '../store/page/actions'

const NavbarTitle = () => {
    const [title, setTitle] = useTitle()
    return <h2 style={{marginBottom: 0}} onClick={()=>setTitle('asd')}>{title}</h2>
}

export default NavbarTitle
