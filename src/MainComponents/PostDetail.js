import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import serverComms from '../services/serverComms'
import Notification from './Notification'

//helper components
const Post = ({ postArg }) => {

  return (
    <div>
      <p>{postArg.userId} {postArg.id} {postArg.title}</p>

      <div className="postBody">{postArg.body}</div>
    </div>
  )
}

//------------------------------------------------------------

//Main component
const PostDetail = () => {

  //notification helper functions:
  const showServerSuccess = () => {

    setNotificationMode('change')

    setNotificationMessage(
      'Individual post data received successfuly'
    )

    console.log('GET promise fullfilled')

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const showServerFail = () => {

    setNotificationMode('error')

    setNotificationMessage(
      'Individual post data receive failed'
    )

    console.log('GET promise failed')

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  //states:
  const [post, setPost] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationMode, setNotificationMode] = useState('')

  //define key parameter (which is post's id)
  let param = useParams().id;

  //effects:
  useEffect(() => {
    serverComms
      .getOne(param)
      .then(initialPost => {
        setPost(initialPost)
        showServerSuccess()
      })
      .catch(() => showServerFail())
  }, [])

  //handlers:

  //return results:  
  return (
    <div>
      <Notification message={notificationMessage} className={notificationMode} />
      <Post postArg={post} />
    </div>
  )
}

export default PostDetail;