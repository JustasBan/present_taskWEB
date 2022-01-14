import React, { useState, useEffect } from 'react'
import serverComms from '../services/serverComms'
import Notification from './Notification'

//Main component
const CreateForm = () => {

    //notification helper functions:
    const showServerSuccess = () => {

        setNotificationMode('change')

        setNotificationMessage(
            'Individual post data sent (posted) successfuly'
        )

        console.log('POST promise fullfilled')

        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const showServerFail = () => {

        setNotificationMode('error')

        setNotificationMessage(
            'Individual post data sending (posting) failed'
        )

        console.log('POST promise failed')

        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    //states:
    const [posts, setPosts] = useState([])
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationMode, setNotificationMode] = useState('')

    //Posting helper functions:

    //TODO: need post requests, input capture, style inputs

    //return results:  
    return (
        <div>
            <Notification message={notificationMessage} className={notificationMode} />

            <h2>Post form</h2>

            <form>

                <div>
                    Title: <input />
                    <br />
                    Body: <input />
                </div>

                <div>
                    <button type="submit">add</button>
                </div>

            </form>
        </div>
    )
}

export default CreateForm;