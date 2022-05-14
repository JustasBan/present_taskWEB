import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import {NotificationContext} from '../UI/NotificationContextProvider'
import serverComms from '../../services/serverComms'
import Post from './Post'

const PostDetail = () => {

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState([])

  let {showServerSuccess} = useContext(NotificationContext)
  let {showServerFail} = useContext(NotificationContext)

  let param = useParams().id;

  useEffect(() => {
    serverComms
      .getOne(param)
      .then(initialPost => {
        setPost(initialPost)
        setLoading(false)
        showServerSuccess("Received individual data successfully", `GET request of post (id: ${initialPost.id}) received`)
      })
      .catch((error) => {
        showServerFail(error)
      })
  }, [])
  
  return (
    <div>
      <Post postArg={post} loading={loading} />
    </div>
  )
}

export default PostDetail;