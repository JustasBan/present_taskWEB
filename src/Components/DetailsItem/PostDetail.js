import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import serverComms from '../../services/serverComms'
import Post from './Post'

const PostDetail = ({ showServerFail, showServerSuccess }) => {

  //states:
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState([])

  //define key parameter (which is post's id)
  let param = useParams().id;

  //effects:
  useEffect(() => {
    serverComms
      .getOne(param)
      .then(initialPost => {
        setPost(initialPost)
        setLoading(false)
        showServerSuccess("Data received successfully", `GET request of post (id: ${initialPost.id}) received`)
      })
      .catch((error) => {
        showServerFail(error)
      })
  }, [])

  //return results:  
  return (
    <div>
      <Post postArg={post} loading={loading} />
    </div>
  )
}

export default PostDetail;