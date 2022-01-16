import React, { useState } from 'react'
import serverComms from '../services/serverComms'

//Main form's component
const CreateForm = ({showServerFail, showServerSuccess}) => {

    //default values
    const USER_ID = 1

    //states:
    const [newTitle, setNewTitle] = useState('')
    const [newBody, setNewBody] = useState('')

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
                showServerSuccess('New record created in server' ,`Post (id: ${initialResponse.id}) created`)
            })
            .catch((error) => showServerFail(error))
    }

    //return results:  
    return (
        <div>
            <div className='postWrap'>
                <h2 className='formsWrap'>New record form</h2>

                <form onSubmit={addPost}>
                    <div className='formsWrap'>
                        <h3 >Title:</h3>
                        <textarea className='formsTextboxTitle' value={newTitle} onChange={handleTitleChange} />
                    </div>
                    
                    <div className='formsWrap'>
                        <h3 >Body:</h3>
                        <textarea className='formsTextboxBody' value={newBody} onChange={handleBodyChange} />
                    </div>

                    <div className='formsWrap'>
                        <button className='formsButton' type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateForm;