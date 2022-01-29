import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import List from './Components/ListItems/List'
import Menu from './Components/UI/Menu'
import PostDetail from './Components/DetailsItem/PostDetail'
import CreateForm from './Components/NewItem/CreateForm'
import Notification from './Components/UI/Notification'

//Driver component:
const App = () => {

  //Notification UX's functions:
  const showServerFail = (error) => {

    setNotificationMode('error')

    setNotificationMessage(
      'Server interaction failed'
    )

    console.error(error)

    setTimeout(() => {
      setNotificationMessage(null)
    }, 4000)
  }

  const showServerSuccess = (message, log) => {

    setNotificationMode('change')

    setNotificationMessage(message)

    console.log(log)

    setTimeout(() => {
      setNotificationMessage(null)
    }, 4000)
  }

  //Notification states:
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationMode, setNotificationMode] = useState('')

  //generate routes and components
  return (
    <Router>
      <Menu />

      <Notification message={notificationMessage} className={notificationMode} />

      <Routes>
        <Route path="/" element={<List showServerFail={showServerFail} showServerSuccess={showServerSuccess}/>} />
        <Route path="/create" element={<CreateForm showServerFail={showServerFail} showServerSuccess={showServerSuccess}/>} />
        <Route path="/posts/:id" element={<PostDetail showServerFail={showServerFail} showServerSuccess={showServerSuccess}/>} />
      </Routes>
    </Router>
  )
}

export default App;
