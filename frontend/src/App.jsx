import React, { useEffect } from 'react'
import Home from './pages/HomePages/Home'
import { Routes,Route, useLocation, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthStore } from './store/Zustand'
import Credit from './components/Credit'
import Watch from './pages/Watch'
import Search from './pages/Search'
import SearchHistory from './pages/SearchHistory'
import NotFound from './components/NotFound'
const App = () => {

  const {user,checkAuth} = useAuthStore();

  const location = useLocation();
  useEffect(() => {
    if(location.pathname === "/"){
      document.title = "Netflix"
    }else if(location.pathname === "/signup"){
      document.title = "Netflix | Sign Up"
    }else if(location.pathname === "/login"){
      document.title = "Netflix | Login"
    }
},[location.pathname])

useEffect(() => {
  checkAuth();
},[checkAuth]);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element = {!user ?<Login /> : <Navigate to={"/"} />} />
        <Route path='/signup' element = {!user ?<SignUp /> : <Navigate to={"/"} />} />
        <Route path='/watch/:id' element = {user ?<Watch /> : <Navigate to={"/login"} />} />
        <Route path='/search' element = {user ?<Search /> : <Navigate to={"/login"} />} />
        <Route path='/history' element = {user ?<SearchHistory /> : <Navigate to={"/login"} />} />
        <Route path='/*' element = {<NotFound />} />
      </Routes>
      <Credit />
    </div>
  )
}

export default App
