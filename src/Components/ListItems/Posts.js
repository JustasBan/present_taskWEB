import IndividualPost from './IndividualPost'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

const CurrentPosts = ({ items }) => (
  items.map(
    post => <IndividualPost key={post.id} userId={post.userId} id={post.id} title={post.title} body={post.body} />
  )
)

const Posts = ({ postsArg }) => {
  let sortState = ({ key }) => {
    switch (sortKeys[key]) {
      case true:
        return "(descend.)"
      case false:
        return "(ascend.)"

      default:
      return null
    }
  }

  let itemsPerPage = 5
  const [sortKeys, setSortKeys] = useState({ userId: null, id: null, title: null, body: null });

  //PAGINATION PART
  const [currentItems, setCurrentItems] = useState(postsArg);
  const [posts, setPosts] = useState(postsArg);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, sortKeys]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % posts.length;
    setItemOffset(newOffset);
  }

  //SORT PART
  const handleUserId = () => {
    if (sortKeys.userId) {
      setSortKeys((x) => ({ ...x, userId: false }))
      setPosts((x) => (x.sort((a, b) => b.userId < a.userId)))
    }
    else {
      setSortKeys((x) => ({ ...x, userId: true }))
      setPosts((x) => (x.sort((a, b) => a.userId < b.userId)))
    }
  }

  const handleId = () => {
    if (sortKeys.id) {
      setSortKeys((x) => ({ ...x, id: false }))
      setPosts((x) => (x.sort((a, b) => b.id < a.id)))
    }
    else {
      setSortKeys((x) => ({ ...x, id: true }))
      setPosts((x) => (x.sort((a, b) => a.id < b.id)))
    }
  }

  const handleTitle = () => {
    if (sortKeys.title) {
      setSortKeys((x) => ({ ...x, title: false }))
      setPosts((x) => (x.sort((a, b) => b.title > a.title)))
    }
    else {
      setSortKeys((x) => ({ ...x, title: true }))
      setPosts((x) => (x.sort((a, b) => a.title > b.title)))
    }
  }

  const handleBody = () => {
    if (sortKeys.body) {
      setSortKeys((x) => ({ ...x, body: false }))
      setPosts((x) => (x.sort((a, b) => b.body > a.body)))
    }
    else {
      setSortKeys((x) => ({ ...x, body: true }))
      setPosts((x) => (x.sort((a, b) => a.body > b.body)))
    }
  }

  return (
    <div >
      <h2 className='centerComponent'>Posts list:</h2>
      <h3 className='centerComponent'>click on column's name to sort</h3>

      <table className='centerComponent'>
        <tbody>
          <tr>
            <td onClick={() => handleUserId()}>userId {sortState({key: "userId"})}</td>
            <td onClick={() => handleId()}>id {sortState({key: "id"})}</td>
            <td onClick={() => handleTitle()}>title {sortState({key: "title"})}</td>
            <td onClick={() => handleBody()}>body {sortState({key: "body"})}</td>
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