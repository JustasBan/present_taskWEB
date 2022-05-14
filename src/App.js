import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import List from './Components/ListItems/List'
import Menu from './Components/UI/Menu'
import PostDetail from './Components/DetailsItem/PostDetail'
import CreateForm from './Components/NewItem/CreateForm'
import Notification from './Components/UI/Notification'
import {NotificationContextProvider} from './Components/UI/NotificationContextProvider'

const App = () => {

  return (
    <Router>
      <NotificationContextProvider>
        <Menu />
        <Notification />

        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </NotificationContextProvider>
    </Router>
  )
}

export default App;
