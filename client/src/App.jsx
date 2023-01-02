import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Home } from './pages/home/Home'
import { Profile } from './pages/profile/Profile'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { isAuthenticated } from './cookieManager'
import { Update } from './pages/update/Update'
// import dotenv from 'dotenv'




function App() {
  // dotenv.config()
  // const [auth, setAuth] = useState(false)
  // if(isAuthenticated()) {
  //   setAuth(true)
  // }

  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route path='login' element={<Login/>}/>
        <Route index element={isAuthenticated()?<Home/>:<Login/>}/>
        <Route path='profile' element={!isAuthenticated()?<Login/>:<Profile/>}/>
        <Route path='home' element={!isAuthenticated()?<Login/>:<Home/>}/>
        <Route path='update' element={!isAuthenticated()?<Login/>:<Update/>}/>
        <Route path='register' element={<Register/>}/>
      </Route>
    </Routes>
    
    </BrowserRouter>


    {/* <Login/> */}
      
    {/* <Profile/> */}
    {/* <Home/> */}
    {/* <Register/> */}
    {/* <Login/> */}
    </>
    )
}

export default App
