import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCardThunk } from '../../redux/card.slice';

function AddCourse() {
  const [val, setVal] = useState({
    courseTitle: '',
    courseContent: '',
    author: '',
    facultyId: '',
    coursePdf: ''
  });
const {id} =  useParams();
const [facultyID, setFacultyID] =  useState('');
const dispatch =  useDispatch();
const resultcard = useSelector(state=>state.card.card);
console.log(resultcard)
useEffect(()=>{
if(id){
  setFacultyID(id)
}
},[id])

  function hadleInputChange(e){
    const {name, value, files, type} =  e.target;
    if(name === "coursePdf"){
      const file =  files[0];
      const isValid =  file.type === "application/pdf";
      if(!isValid){
        e.target.value =  "";
        return alert("upload only pdf");
      }
    }
    setVal((prev)=>({
      ...prev, [name]: type ==="file"? files[0]: value
    }))
  }

  
  async function handleForm(e){
    e.preventDefault();
    if(val.author && val.courseContent && val.coursePdf && val.courseTitle && facultyID){
      try{
        const formData =  new FormData();
        formData.append("courseTitle", val.courseTitle);
        formData.append("courseContent", val.courseContent);
        formData.append("coursePdf", val.coursePdf);
        formData.append("author", val.author);
        formData.append("facultyId", facultyID);
        await dispatch(addCardThunk(formData)).unwrap();
        alert("course added successfully")
      
        setVal({
          courseTitle: '',
          courseContent: '',
          author: '',
          facultyId: '',
          coursePdf: ''
        });
      }catch(e){
        console.log(e)
      }
      // console.log(val.author, val.courseContent, val.coursePdf, val.courseTitle, facultyID)
    }else{
      alert("all fields are required");
    }

  }


  
  return (
    <div className='grid grid-cols-3 px-4'>
        <Sidebar />

        <div className='course-form w-[600px]'>
                <h1 className='p-4 text-center rounded-m'>Add Course</h1>
        <form onSubmit={handleForm} encType='multipart/form-data' action="" className='flex flex-wrap flex-cols ml-8 gap-4 text-center justify-between items-center justify-items-center px-4 py-4 text-black'>
    <input type="text" onChange={hadleInputChange} name="courseTitle" value={val.courseTitle} id="" placeholder='course name' className='input  w-[93%]' /><br />
    <input type="text" onChange={hadleInputChange}  name="courseContent" value={val.courseContent} id="" placeholder='About course' className='input  w-[93%]' /><br />
    <input type="text" onChange={hadleInputChange}  name="author" value={val.author}  id="" placeholder='Author name' className='input  w-[93%]' /><br />
    <input type="hidden"  onChange={(e)=>setFacultyID(e.target.value)}   name="facultyId" value={facultyID? facultyID: ""} id="" placeholder='faculty id' className='input  capitalize' /><br />
    <input type="file" accept='.pdf' onChange={hadleInputChange}  name="coursePdf"  id="" placeholder='' className='text-white  border border-white p-4 rounded-md capitalize  w-[94%]' /><br />
    <button className='btn btn-info w-full  capitalize -ml-4'>add course</button>
        </form>
        </div>
    </div>
  )
}

export default AddCourse