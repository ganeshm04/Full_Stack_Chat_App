import React, { useEffect } from 'react'
import Navbar from './pages/Navbar'
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react"
import {Toaster} from "react-hot-toast";
import { useThemeStore } from './store/useThemeStore';

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {theme}=useThemeStore();


  useEffect(() => {
    checkAuth();
  }, [])

  console.log({ authUser });


  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )
  return (
    <div data-theme={theme}>

      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />}></Route>
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />}></Route>
        <Route path='/login' element={!authUser ?<LoginPage />: <Navigate to="/" />}></Route>
        <Route path='/setting' element={<SettingPage />}></Route>
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />}></Route>

      </Routes>

      <Toaster/>
    </div>
  )
}

export default App