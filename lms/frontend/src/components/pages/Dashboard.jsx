/* eslint-disable no-unused-vars */
import React from 'react';
import Card from '../Card';
import Sidebar from '../Sidebar';
// import {useSelector} from 'react-redux';

function Dashboard() {
  // const facultyProfile =  useSelector(state=>state.faculty.faculty);
  // console.log(facultyProfile.data.facultyProfile);
  // const profile = facultyProfile.data.facultyProfile;

  return (
    <div className='m-4 grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-4 xs:grid-rows-1 sm:grid-rows-1  auto-rows-auto  p-4'>
      <div className=" xs:grid-cols-1 col-start-1 col-end-2 h-[400px]">
        <Sidebar />
      </div>

      <div className='md:col-start-2 xs:col-start-1 col-end-5 gap-3 flex flex-wrap justify-start'>
        <Card />
   
      </div>
    </div>
  );
}

export default Dashboard;
