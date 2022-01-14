import React from 'react'
import {Link} from 'react-router-dom'

/*
    DESCRIPTION:
    simple menu component (CSS in index.css)
 */

//navigation component:
const Menu = () => {
    return (
        <nav>
            <h3>Intership assignment:</h3>

            <ul className='nav-links'>
                <Link style={{color: 'white'}} to="/">
                    <li>view all posts</li>
                </Link>

                <Link style={{color: 'white'}} to="/create">
                    <li>create new post</li>
                </Link>

            </ul>
        </nav>
    )
}

export default Menu