/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
function EdictCourse() {
  const {id} =  useParams();
  // const course =  useSelector(state=>state.course.course);
  // console.log(course)
  // const dispatch=   useDispatch();
const [val, setval] =  useState({
  courseTitle: '',
  courseContent: '',
  author: '',
  facultyId: '',
  coursePdf: ''
});


    function handleOnchangeInput(e){
        const {name, value, files, type} =  e.target;

        if(type ==="file"){
          const file =  files[0];
          const isValid =  file.type ==="application/pdf";
          if(!isValid){
            e.target.value =  ""
            return alert("upload file only")
            
          }
        }

        setval((prev)=>({
          ...prev, [name]: type ==="file" ? files[0]
          : 
          value,
        }))
    }
  

    function handleUpdate(e){
      e.preventDefault();
      if(val.courseTitle && val.courseContent && val.facultyId && val.author && val.coursePdf){
        console.log(val.author, val.courseContent, val.coursePdf, val.courseTitle, val.facultyId)
      }else{
        alert("all fields are required")
      }
    }

  // useEffect(()=>{
  //   if(id){
      
  //   }
  // },[id])
  return (
    <div className='grid grid-cols-3 px-4'>
        <Sidebar />

        <div className='course-form w-[600px]'>
                <h1 className='p-4 text-center rounded-m bg-slate-900'>Update Course</h1>
        <form action="" onSubmit={handleUpdate} encType='multipart/form-date' method='post' className='flex flex-wrap flex-cols ml-8 gap-4 text-center justify-between items-center justify-items-center px-4 py-4 text-black'>
    <input type="text" onChange={handleOnchangeInput} value={val.courseTitle} name="courseTitle" id="" placeholder='course title' className='input ' /><br />
    <input type="text" onChange={handleOnchangeInput} value={val.courseContent} name="courseContent" id="" placeholder=' course content' className='input ' /><br />
    <input type="text" onChange={handleOnchangeInput} value={val.author} name="author" id="author" placeholder='Author name' className='input ' /><br />
    <input type="text" onChange={handleOnchangeInput} value={val.facultyId} name="facultyId" id="" placeholder='faculty id' className='input  capitalize' /><br />
    <input type="file" onChange={handleOnchangeInput}  name="coursePdf" id="" placeholder='' className='text-white  border border-white p-4 rounded-md capitalize  w-[94%]' /><br />
    <button className='btn btn-info w-full  capitalize -ml-4'>Update Now</button>
  
        </form>
        </div>
    </div>
  )
}

export default EdictCourse