import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layout/Layout'
import Login from './pages/Login'
import StudentRegistration from './pages/StudentRegistration'
import ResetPassword from './pages/Resetpassword'
import NotFoundPage from './pages/NotFound'
import AdminDashboard from './pages/AdminDashboard'
import AddTeacher from './pages/AddTeacher'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register-student' element={<Layout><StudentRegistration/></Layout>} />
        <Route path='/login' element={<Layout><Login/></Layout>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='*' element={<NotFoundPage/>}/>
        <Route path='/admin/dashboard' element={<Layout><AdminDashboard/></Layout>} />
        {/* <Route path='/add-teacher'element={<Layout><AddTeacher/></Layout>}/> */}
        <Route path="/admin/dashboard/add-teacher" element={<Layout><AddTeacher /></Layout>} />
      </Routes>
    </div>
  )
}

export default App
