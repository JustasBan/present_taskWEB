import React, { useState, useEffect } from 'react'
import serverComms from '../services/serverComms'
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

const Posts = ({ postsArg, loadingState}) => {

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
const List = ({showServerFail, showServerSuccess}) => {
  
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