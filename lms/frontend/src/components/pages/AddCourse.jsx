import React from 'react'
import Sidebar from '../Sidebar'

function AddCourse() {
  return (
    <div className='grid grid-cols-3 px-4'>
        <Sidebar />

        <div className='course-form w-[600px]'>
                <h1 className='p-4 text-center rounded-m'>Add Course</h1>
        <form action="" className='flex flex-wrap flex-cols ml-8 gap-4 text-center justify-between items-center justify-items-center px-4 py-4 text-black'>
    <input type="text" name="" id="" placeholder='course name' className='input ' /><br />
    <input type="text" name="" id="" placeholder='About course' className='input ' /><br />
    <input type="text" name="" id="" placeholder='Author name' className='input ' /><br />
    <input type="text" name="" id="" placeholder='about course optional' className='input  capitalize' /><br />
    <input type="file" name="" id="" placeholder='' className='text-white  border border-white p-4 rounded-md capitalize  w-[94%]' /><br />
    <button className='btn btn-info w-full  capitalize -ml-4'>add course</button>
  
        </form>
        </div>
    </div>
  )
}

export default AddCourse