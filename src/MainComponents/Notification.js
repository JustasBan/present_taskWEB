import React from 'react'

/*
    DESCRIPTION:
    to use notification component, define
    notification's mode and message states
    in the environment you want to use it

    for UX's sake, it's recommended to
    make helper functions, that handle notifications
    (for example: disapearing notifications after some time)
 */

//Notification component:
const Notification = ({ message, className }) => {

    if (message === null) {
        return null
    }

    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification