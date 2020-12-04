import React from 'react'
import Logo from './Logo'
import NavbarTitle from './NavbarTitle'

const Navbar = () => {
    return (<div className="navbar">
        <div className="container">
            <div className="logo">
                <Logo />
            </div>
            <div className="title">
                <NavbarTitle />
            </div>
            <div className="user">
                user
            </div>
        </div>
    </div>)
}

export default Navbar
