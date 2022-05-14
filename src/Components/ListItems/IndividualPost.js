import { useNavigate } from 'react-router-dom'

const IndividualPost = ({ userId, id, title, body }) => {

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
