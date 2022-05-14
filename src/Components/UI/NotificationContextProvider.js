import React, { createContext, useState } from 'react'

export const NotificationContext = createContext({
    fail: () => { },
    succ: () => { },
    notificationMessage: '',
    setNotificationMessage: () => { },
    notificationMode: '',
    setNotificationMode: () => { }
})

export const NotificationContextProvider = ({ children }) => {

    const showServerFail = (error) => {

        setNotificationMode('error')

        setNotificationMessage(
            'Server interaction failed'
        )

        console.error(error)

        setTimeout(() => {
            setNotificationMessage(null)
        }, 4000)
    }

    const showServerSuccess = (message, log) => {

        setNotificationMode('change')

        setNotificationMessage(message)

        console.log(log)

        setTimeout(() => {
            setNotificationMessage(null)
        }, 4000)
    }
    
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationMode, setNotificationMode] = useState('')

    return (
        <NotificationContext.Provider value={{ showServerFail, showServerSuccess, notificationMessage, setNotificationMessage, notificationMode, setNotificationMode }}>
            {children}
        </NotificationContext.Provider>
    )
}