import React, { useState, useContext } from 'react'
import {NotificationContext} from '../UI/NotificationContextProvider'
import serverComms from '../../services/serverComms'

const CreateForm = () => {

    //default values
    const USER_ID = 1

    const [newInput, setNewInput] = useState(
        {
            title: '',
            body: ''
        }
    )

    let {showServerSuccess} = useContext(NotificationContext)
    let {showServerFail} = useContext(NotificationContext)

    const handleInputChange = (event) => {
        let newerInput
        switch (event.target.className) {
            
            case 'formsTextboxTitle':
                newerInput = newInput
                setNewInput({...newerInput, title: event.target.value})
                break

            case 'formsTextboxBody':
                newerInput = newInput
                setNewInput({...newerInput, body: event.target.value})
                break

            default:
                break
        }
    }

    const addPost = (event) => {
        event.preventDefault()

        let tempPostObj = {
            ...newInput,
            userId: USER_ID
        }

        serverComms
            .create(tempPostObj)
            .then(initialResponse => {
                showServerSuccess('New record created in server', `Post (id: ${initialResponse.id}) created`)
            })
            .catch((error) => showServerFail(error))
    }

    return (
        <div>
            <div className='postWrap'>
                <h2 className='centerComponent'>New record:</h2>

                <form onSubmit={addPost}>
                    <div className='formsWrap'>
                        <h3>Title:</h3>
                        <div className='formsWrapInner'>
                            <textarea className='formsTextboxTitle' onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className='formsWrap'>
                        <h3>Body:</h3>
                        <div className='formsWrapInner'>
                            <textarea className='formsTextboxBody' onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className='postWrap'>
                        <button className='formsButton' type="submit">Add</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CreateForm;