import React, { useEffect } from 'react'
import './App.css'
import {Routes, Route } from 'react-router-dom'
import Forum from './pages/forum/Forum.jsx'
import Quiz from './pages/quiz/quiz.jsx'
import { Login } from './pages/login/login.jsx'
import { SignUp } from './pages/signup/signup.jsx'


import { storeObject } from './components/variableSet/variableSet.jsx'
import { Home } from './pages/home/home.jsx'


import { Navigate } from 'react-router-dom'

function App() {
  useEffect(() => {
    storeObject("Arnav", false)
  }, [])
  return (
    <>
      <Routes>
        <Route path="/forum" element={<Forum />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </>
  )
}

export default App
