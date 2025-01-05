/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Card from '../Card';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';

function Dashboard({ storedProfilePicture, fID, handleLogoutButton, getname}) {
  const navigate =  useNavigate();
	useEffect(()=>{
		if(!localStorage.getItem('token')){
			navigate("/")
		}
	}, [ navigate])


  return (
    <div className='m-4 grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-4 xs:grid-rows-1 sm:grid-rows-1  auto-rows-auto  p-4'>
      <div className=" xs:grid-cols-1 col-start-1 col-end-2 h-[400px]">
        <Sidebar getname={getname} storedProfilePicture={storedProfilePicture} fID={fID}  handleLogoutButton={handleLogoutButton}/>
      </div>

      <div className='md:col-start-2 xs:col-start-1 col-end-5 gap-3 flex flex-wrap justify-start'>
        <Card />
   
      </div>
    </div>
  );
}

export default Dashboard;
