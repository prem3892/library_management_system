


import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar'
import { useEffect, useState } from 'react';
import { fetchCardThunk, updateCourseThunk } from '../../redux/card.slice';
import { useNavigate, useParams } from 'react-router-dom';

function EdictCourse() {
  const {card} =  useSelector(state=>state.card);
  const dispatch =  useDispatch();
  const {cid, fid} =  useParams()
  const navigate =  useNavigate()
  const [val, setVal] =  useState({
    author: "",
    courseContent: "",
    coursePdf: "",
    courseTitle: ""
  });

  
  function handleInputChange(e){
    const {name, value, files, type} =  e.target;
      if(name ==="coursePdf"){
        const file =  files[0];
        const isValid =  file.type ==="application/pdf";
        if(!isValid){
          e.target.value =  "";
          return alert("allow only pdf")
        }
      }
      

    setVal((prev)=>({
      ...prev, [name]:type ==="file" ? files[0]: value 
    }))
  }

  const [facultyId, setFacultyId] =  useState("");


  useEffect(()=>{
    if(Array.isArray(card.message)){
        const findCourse =  card.message.find((i)=>i._id === cid);
        if(findCourse){
          setVal({
            courseTitle: findCourse.courseTitle,
            courseContent: findCourse.courseContent,
            coursePdf: findCourse.coursePdf,
            author: findCourse.author
          })
        }
    }
    if(fid){
      setFacultyId(fid)
    }
  },[cid, card.message, fid])

  const id =  localStorage.getItem("facultyID");
  useEffect(()=>{
    if(id){
      dispatch(fetchCardThunk(id));
    }
  },[id, dispatch]);

  async function handleUpdate(e) {
  e.preventDefault();
  const {courseTitle, courseContent, author, coursePdf} =  val;
  if(courseTitle && courseContent && author && coursePdf){
    try{

      const formData =  new FormData();
        formData.append("courseTitle", courseTitle);
        formData.append("courseContent", courseContent);
        formData.append("author", author);
        formData.append("coursePdf", coursePdf);
        formData.append("facultyId", facultyId);
        if(fid && cid){
          formData.append("fid", fid);
          formData.append("cid", cid);
        }

       await dispatch(updateCourseThunk(formData)).unwrap();
       alert("course updated successfully")
       navigate("/dashboard")
   
    }catch(e){
      return console.log(e)
    }
    console.log(courseTitle, courseContent, coursePdf, author)
  }else{
    alert("all fields are required")
  }

  }

  return (
    <div className='grid grid-cols-3 px-4'>
        <Sidebar />

        <div className='course-form w-[600px]'>
                <h1 className='p-4 text-center rounded-m bg-slate-900'>Update Course</h1>
        <form action="" onSubmit={handleUpdate}  encType='multipart/form-date' method='post' className='flex flex-wrap flex-cols ml-8 gap-4 text-center justify-between items-center justify-items-center px-4 py-4 text-black'>
    <input onChange={handleInputChange} value={val.courseTitle || ""} type="text" name="courseTitle" id="" placeholder='course title' className='input ' /><br />
    <input onChange={handleInputChange} value={val.courseContent || ""} type="text"  name="courseContent" id="" placeholder=' course content' className='input ' /><br />
    <input onChange={handleInputChange} value={val.author || ""} type="text"  name="author" id="author" placeholder='Author name' className='input w-[94%]' /><br />
    <input onChange={(e)=>setFacultyId(e.target.value)} value={facultyId} type="hidden"   name="facultyId" id=""  placeholder='faculty id' className='input  capitalize' /><br />
    <input onChange={handleInputChange}  type="file"  name="coursePdf" id="" placeholder='' className='text-white  border border-white p-4 rounded-md capitalize  w-[94%]' /><br />
    <button className='btn btn-info w-full  capitalize -ml-4'>Update Now</button>
  
        </form>
        </div>
    </div>
  )
}

export default EdictCourse