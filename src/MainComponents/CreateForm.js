import React, { useState } from 'react'
import serverComms from '../services/serverComms'
import Notification from './Notification'

//Main form's component
const CreateForm = () => {

    //notification helper functions:
    const showServerSuccess = ({ id }) => {

        setNotificationMode('change')

        setNotificationMessage(
            `Post's '${id}' data sent (posted) successfuly`
        )

        console.log(`Post's '${id}' POST promise fullfilled`)

        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const showServerFail = () => {

        setNotificationMode('error')

        setNotificationMessage(
            'Individual\'s data sending (posting) failed'
        )

        console.log('POST promise failed')

        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    //default values
    const USER_ID = 1

    //states:
    const [newTitle, setNewTitle] = useState('')
    const [newBody, setNewBody] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationMode, setNotificationMode] = useState('')

    //handlers:
    const handleTitleChange = (event) => {
        console.log(`Title: ${event.target.value}`)
        setNewTitle(event.target.value)
    }

    const handleBodyChange = (event) => {
        console.log(`Body: ${event.target.value}`)
        setNewBody(event.target.value)
    }

    //Posting function:
    const addPost = (event) => {
        event.preventDefault()

        let tempPostObj = {
            title: newTitle,
            body: newBody,
            userId: USER_ID
        }

        serverComms
            .create(tempPostObj)
            .then(initialResponse => {
                showServerSuccess(initialResponse)
            })
            .catch(() => showServerFail())
    }

    //return results:  
    return (
        <div>
            <Notification message={notificationMessage} className={notificationMode} />

            <h2>Post form</h2>

            <form onSubmit={addPost}>
                <div>
                    Title: <input value={newTitle} onChange={handleTitleChange} />
                    <br />
                    Body: <input value={newBody} onChange={handleBodyChange} />
                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default CreateForm;