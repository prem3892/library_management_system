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

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from "react";
import { getCookieManage, handleLogout } from './redux/facullty.slice';


function App() {
  const {getCookie} =  useSelector(state=>state.faculty);
  const dispatch =  useDispatch();
  const [getname, setGetName] =  useState('')


  const token =  localStorage.getItem("token");
  const storedProfilePicture = localStorage.getItem("facultyProfile");
	const fID = localStorage.getItem("facultyID");


  const handleLogoutButton =  ()=>{
    setGetName('')
    const clearToken =   localStorage.clear();
		dispatch(handleLogout(clearToken));
		alert("logged out");
    window.location.href =  "/login"
  }

  useEffect(()=>{
        if(token){
          let p =  localStorage.getItem('facultyName')
          setGetName(p)
          dispatch(getCookieManage(token))
        }else{
          setGetName('')
          dispatch(getCookieManage(''))
        }
    
  }, [token, dispatch, getCookie, setGetName])
    

  return (
    <BrowserRouter>
    <Header  name={getname}/>
    <Routes>
      <Route path='/' element={<HeroSection />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard getname={getname}  storedProfilePicture={storedProfilePicture} fID={fID} handleLogoutButton={handleLogoutButton}/>}/>
      <Route path='/add-course/:id' element={<AddCourse />}/>
      <Route path='/edit-course/faculty/:fid/course/:cid' element={<EdictCourse />}/>
      </Routes>  
      <Footer />  
    </BrowserRouter>
  )
}

export default App;

