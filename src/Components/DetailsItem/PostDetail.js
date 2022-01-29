import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import {NotificationContext} from '../UI/NotificationContextProvider'
import serverComms from '../../services/serverComms'
import Post from './Post'

const PostDetail = () => {

  //states:
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState([])

  let {showServerSuccess} = useContext(NotificationContext)
  let {showServerFail} = useContext(NotificationContext)

  //define key parameter (which is post's id)
  let param = useParams().id;

  //effects:
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

  //return view:  
  return (
    <div>
      <Post postArg={post} loading={loading} />
    </div>
  )
}

export default PostDetail;