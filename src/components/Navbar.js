import React from 'react'
import Logo from './Navbar/Logo'
import NavbarTitle from './Navbar/NavbarTitle'
import UserMenu from './Navbar/UserMenu'

const Navbar = () => {
    return (<div className="navbar">
        <div className="container">
            <div className="logo" style={{marginLeft: '12px'}}>
                <Logo showTitle={true}/>
            </div>
            <div className="title">
                <NavbarTitle />
            </div>
            <div className="user" style={{marginRight: '12px'}}>
                <UserMenu />
            </div>
        </div>
    </div>)
}

export default Navbar
