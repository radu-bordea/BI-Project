import React from 'react'
import {NavLink} from 'react-router-dom'

import './NavLinks.css'

const NavLinks = props => {
    return <ul className='nav-links'>
        <li>
            <NavLink to="/users">ALL USERS</NavLink>
        </li>
        <li>
            <NavLink to="/content">CONTENT</NavLink>
        </li>
        <li>
            <NavLink to="/login">AUTHENTICATION</NavLink>
        </li>
    </ul>
}

export default NavLinks;