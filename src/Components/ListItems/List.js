import React, { useState, useEffect, useContext } from 'react'
import serverComms from '../../services/serverComms'
import {NotificationContext} from '../UI/NotificationContextProvider'
import Posts from './Posts'

/*
  Component does GET request,
  and shows received data if successful,
  else it infinately loads
*/

const List = () => {

  //states:
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  let {showServerSuccess} = useContext(NotificationContext)
  let {showServerFail} = useContext(NotificationContext)

  //effects:
  useEffect(() => {
    serverComms
      .getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
        setLoading(false)

        showServerSuccess("Received all data from server", "GET request fullfilled")
      })
      .catch((error) => {
        showServerFail(error)
      })
  }, [])

  //results:
  return (
    <div>
      <Posts postsArg={posts} loadingState={loading} />
    </div>
  )
}

export default List; 