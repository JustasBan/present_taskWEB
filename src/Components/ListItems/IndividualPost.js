import { useNavigate } from 'react-router-dom'

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

export default IndividualPost; 
