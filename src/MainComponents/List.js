import React, { useState, useEffect } from 'react'
import serverComms from '../services/serverComms'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'

//helper components:

const IndividualPost = ({ userId, id, title, body }) => {

  //state and handler for navigation:
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/posts/${id}`);
  }

  return (
    <tr onClick={handleRowClick}>
      <td><div>{userId}</div></td>
      <td> {id}</td>
      <td> {title}</td>
      <td className="postBody">{body}</td>
    </tr>
  )
}

const Posts = ({ postsArg, loadingState }) => {

  if (loadingState === false) {
    let centerComponent = {
      justifyContent: "center",
      display: "flex"
    }

    return (
      <div >
        <h2 style={centerComponent}>Posts list:</h2>

        <table style={centerComponent}>
          <tbody>
            <tr>
              <td>userId</td>
              <td>id</td>
              <td>title</td>
              <td>body</td>
            </tr>

            {postsArg.map(
              post => <IndividualPost key={post.id} userId={post.userId} id={post.id} title={post.title} body={post.body} />
            )}
          </tbody>
        </table>


      </div>
    )
  }
  else {
    return (
      <h2>Posts list loading...</h2>
    )
  }
}

//Main component:
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

  const showServerFail = (error) => {

    setNotificationMode('error')

    setNotificationMessage(
      'All data receive failed'
    )

    console.error(error)

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  //states:
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationMode, setNotificationMode] = useState('')

  //effects:
  useEffect(() => {
    serverComms
      .getAll()
      .then(initialPosts => {
        //setting posts:

        setPosts(initialPosts)
        setLoading(false)
        //state awareness:
        showServerSuccess()
      })
      .catch((error) => {
        showServerFail(error)
      })
  }, [])

  //results:
  return (
    <div>
      <Notification message={notificationMessage} className={notificationMode} />
      <Posts postsArg={posts} loadingState={loading} />
    </div>
  )
}

export default List;