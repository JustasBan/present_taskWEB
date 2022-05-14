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

export default Post;
