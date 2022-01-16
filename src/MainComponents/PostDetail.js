import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import serverComms from '../services/serverComms'

/*
    DESCRIPTION:
    Details page component, which
    will create GET request to server,
    from given Id (router provides it)

    If successful, component displays
    received details, else

    it infinately shows "loading" -
    user is notified, 
    that server interaction failed
    by "Notification" component in "App"
    (same for success)
 */

//helper components
const Post = ({ postArg, loading }) => {

  if (loading) {
    return (
      <h2 className='centerComponent'>Posts list loading...</h2>
    )
  }
  else {
    return (
      
      <div className='postWrap'>
        <h2 className='centerComponent'>Post details:</h2>
        
        <div className='postInnerWrap'>
          <h3 className='postProperty'>User id:</h3>

          <div className='postValueWrap'>
            <h3 className='postValue'>{postArg.userId}</h3>
          </div>
        </div>

        <div className='postInnerWrap'>
          <h3 className='postProperty'>Post id:</h3>

          <div className='postValueWrap'>
            <h3 className='postValue'>{postArg.id}</h3>
          </div>
        </div>

        <div className='postInnerWrap'>
          <h3 className='postProperty'>Post title:</h3>

          <div className='postValueWrap'>
            <h3 className='postValue'>{postArg.title}</h3>
          </div>
        </div>

        <div className='postInnerWrap'>
          <h3 className='postProperty'>Post body:</h3>

          <div className='postValueWrap'>
            <h3 className="postBody postValue">{postArg.body}</h3>
          </div>
        </div>
      </div>
    )
  }
}

//Main component
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