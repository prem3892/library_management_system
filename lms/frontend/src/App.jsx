/* eslint-disable no-unused-vars */


import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/pages/HeroSection'
import Register from './components/pages/Register'
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import AddCourse from './components/pages/AddCourse';
import EdictCourse from './components/pages/EditCourse';


function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<HeroSection />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/add-course/:id' element={<AddCourse />}/>
      <Route path='/edit-course/:id' element={<EdictCourse />}/>
      </Routes>  
      <Footer />  
    </BrowserRouter>
  )
}

export default App;

