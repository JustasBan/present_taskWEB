import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import serverComms from '../services/serverComms'

//helper components
const Post = ( {postArg, loading} ) => {

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

//Main component
const PostDetail = ({showServerFail, showServerSuccess}) => {

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