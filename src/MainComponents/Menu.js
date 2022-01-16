import React from 'react'
import {Link} from 'react-router-dom'

/*
    DESCRIPTION:
    simple menu component
 */

//navigation component:
const Menu = () => {
    return (
        <nav>
            <h3>Task by <i>Justas Baniulis</i></h3>

            <ul className='nav-links'>
                <Link style={{color: 'white'}} to="/">
                    <li>List</li>
                </Link>

                <Link style={{color: 'white'}} to="/create">
                    <li>Add new post</li>
                </Link>

            </ul>
        </nav>
    )
}

export default Menu