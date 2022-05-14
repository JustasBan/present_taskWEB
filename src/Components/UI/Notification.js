import React, { useContext } from 'react'
import { NotificationContext } from './NotificationContextProvider'

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