import React from 'react'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import About from './About'
import Create from './Create'
import Update from './Update'
import UpdateProfile from './UpdateProfile'
import Footer from './Footer'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>

          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>

            <Route path='/about' element={<About />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path='/update/:id' element={<Update />}></Route>
            <Route
              path='/updateprofile/:email'
              element={<UpdateProfile />}
            ></Route>
            <Route path='/footer' element={<Footer />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
