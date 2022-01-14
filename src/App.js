import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import List from './MainComponents/List'
import Menu from './MainComponents/Menu'
import PostDetail from './MainComponents/PostDetail'
import CreateForm from './MainComponents/CreateForm'

const App = () => {
  return (
    <Router>
      <Menu />

      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  )
}

export default App;
