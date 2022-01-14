import React, { useState, useEffect } from 'react'
import serverComms from '../services/serverComms'
import Notification from './Notification'

//helper components
const IndividualPost = ({ postArg }) => {

  return (
    <div>
      <p>{postArg.userId} {postArg.id} {postArg.title}</p>
      <div class="postBody">{postArg.body}</div>

      <button>details</button>
      <p>--------</p>
    </div>
  )
}

const Posts = ({ postsArg }) => {
  return (
    <div>
      <h2>Posts List:</h2>
      {postsArg.map(
        post => <IndividualPost key={post.id} postArg={post} />
      )}
    </div>
  )
}

const List = () => {

  //notification helper functions:
  const showServerSuccess = () => {

    setNotificationMode('change')

    setNotificationMessage(
      'All data received successfuly'
    )

    console.log('GET promise fullfilled')

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const showServerFail = () => {

    setNotificationMode('error')

    setNotificationMessage(
      'All data receive failed'
    )

    console.log('GET promise failed')

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  //---------------------------------------------------------------------------

  //states:
  const [posts, setPosts] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationMode, setNotificationMode] = useState('')

  //---------------------------------------------------------------------------

  //effects:
  useEffect(() => {
    serverComms
      .getAll()
      .then(initialPost => {
        //setting posts:
        setPosts(initialPost)

        //state awareness:
        showServerSuccess()
      })
      .catch(() => {
        showServerFail()
      })
  }, [])

  //---------------------------------------------------------------------------

  //handlers:



  //---------------------------------------------------------------------------

  return (
    <div>
      <Notification message={notificationMessage} className={notificationMode} />
      <Posts postsArg={posts} />
    </div>
  )
}

export default List;