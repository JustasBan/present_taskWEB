import React, { useContext } from 'react'
import { NotificationContext } from './NotificationContextProvider'

/*
    DESCRIPTION:
    to use notification component, define
    notification's mode and message states
    in the environment you want to use it
 */

//Notification component:
const Notification = () => {

    let {notificationMessage} = useContext(NotificationContext)
    let {notificationMode} = useContext(NotificationContext)

    if (notificationMessage === null) {
        return null
    }

    return (
        <div className={notificationMode}>
            {notificationMessage}
        </div>
    )
}

export default Notification