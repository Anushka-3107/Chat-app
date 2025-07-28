import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ChatPage from './Pages/ChatPage'
import './App.css';
import { Toaster } from "@/components/ui/toaster";


const App = () => {
  return (
    <div className='App'>
    <Toaster/> 
    <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/chats' element={<ChatPage/>} />
    </Routes>
    
    </div>
  )
}

export default App