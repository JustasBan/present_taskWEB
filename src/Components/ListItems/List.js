import React, { useState, useEffect } from 'react'
import serverComms from '../../services/serverComms'
import Posts from './Posts'

/*
  Component does GET request,
  and shows received data if successful,
  else it infinately loads
*/

const List = ({ showServerFail, showServerSuccess }) => {

  //states:
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  //effects:
  useEffect(() => {
    serverComms
      .getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
        setLoading(false)

        //state awareness:
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