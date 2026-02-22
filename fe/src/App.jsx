import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layout/layout'

import StudentRegistration from './pages/StudentRegistration'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register-student' element={<Layout><StudentRegistration/></Layout>} />
      </Routes>
    </div>
  )
}

export default App
