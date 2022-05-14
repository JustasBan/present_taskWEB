import IndividualPost from './IndividualPost'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

const CurrentPosts = ({ items }) => (
  items.map(
    post => <IndividualPost key={post.id} userId={post.userId} id={post.id} title={post.title} body={post.body} />
  )
)

const Posts = ({ postsArg }) => {
  let itemsPerPage = 5

  const [currentItems, setCurrentItems] = useState(postsArg);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading postsArg from ${itemOffset} to ${endOffset}`);
    setCurrentItems(postsArg.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(postsArg.length / itemsPerPage));
    console.log(currentItems);
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % postsArg.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  }
  
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

          <CurrentPosts items={currentItems} />
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </tbody>
      </table>

      <div id="container" />
    </div>
  )
}

export default Posts;