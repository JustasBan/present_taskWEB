import React, { useState, useEffect, useContext } from 'react'
import serverComms from '../../services/serverComms'
import { NotificationContext } from '../UI/NotificationContextProvider'
import Posts from './Posts'

const List = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  let { showServerSuccess } = useContext(NotificationContext)
  let { showServerFail } = useContext(NotificationContext)

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

  if (loading) {
    return (
      <h2 className='centerComponent'>Posts list loading...</h2>
    )
  }
  else {
    return (
      
      <div>
        <Posts postsArg={posts} />
      </div>
    )
  }

}

export default List; 