import React, { useState, useEffect, useCallback } from 'react'
import serverComms from '../services/serverComms'
import { useNavigate } from 'react-router-dom'

//helper components:

/*
  Display individual table row
  with received data of post
*/

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

/*
  Display all table rows
  with received data of all
  posts we received and 
  names of columns
*/

const Posts = ({ postsArg, loadingState }) => {
  if (loadingState === false) {
    return (
      <div >
        <h2 className='centerComponent'>Posts list:</h2>

        <table className='centerComponent'>
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
      <h2 className='centerComponent'>Posts list loading...</h2>
    )
  }
}

/*
  Component does GET request,
  and shows received data if successful,
  else it infinately loads
  (user is notified about failed
  server interaction by "Notification" component
  in "App" (same for success))
*/

//Main component:
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