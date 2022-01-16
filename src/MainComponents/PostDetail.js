import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import serverComms from '../services/serverComms'
import Notification from './Notification'

//helper components
const Post = ({ postArg, loading }) => {

  if (loading) {
    return (
      <h3>Post loading...</h3>
    )
  }
  else {
    return (
      <div className='postWrap'>
        <div className='postContainer'>
          <h3 className='postProperty'>User id:</h3>
          <h3 className='postPropertyValue'>{postArg.userId}</h3>
        </div>

        <div className='postContainer'>
          <h3 className='postProperty'>Post id:</h3>
          <h3 className='postPropertyValue'>{postArg.id}</h3>
        </div>

        <div className='postContainer'>
          <h3 className='postProperty'>Post title:</h3>
          <h3 className='postPropertyValue'>{postArg.title}</h3>
        </div>

        <div className='postContainer'>
          <h3 className='postProperty'>Post body:</h3>
          <h3 className="postBody postPropertyValue">{postArg.body}</h3>
        </div>
      </div>
    )
  }

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

  const showServerFail = (error) => {

    setNotificationMode('error')

    setNotificationMessage(
      'Individual post data receive failed'
    )

    console.error(error);

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  //states:
  const [loading, setLoading] = useState(true)
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
        setLoading(false)
      })
      .catch((error) => {
        showServerFail(error)
      })
  }, [])

  //return results:  
  return (
    <div>
      <Notification message={notificationMessage} className={notificationMode} />
      <Post postArg={post} loading={loading} />
    </div>
  )
}

export default PostDetail;