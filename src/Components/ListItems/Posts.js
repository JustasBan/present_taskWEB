import IndividualPost from './IndividualPost'

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

export default Posts; 
