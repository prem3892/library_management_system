/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCardThunk } from '../redux/card.slice';
import { MdEdit } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

function Card() {
  const {card, loading} =  useSelector(state=>state.card);
  const user =  localStorage.getItem("facultyName");
  const id =  localStorage.getItem("facultyID")
  const [author, setAuthor] =  useState('')

const dispatch =  useDispatch();
  useEffect(()=>{
    dispatch(fetchCardThunk(id));
    if(user){
     return setAuthor(user)
    }
  },[id, user, dispatch]);


  if(loading){
    return <h1>loading</h1>
  }

  if (!Array.isArray(card)) {
    return <div>No data available</div>;
  }

  function showPdf(pdf){
      if(user){
        window.open(`http://localhost:8585/course/${pdf}` )
      }
  }


  return (
    <>
    {
     Array.isArray(card) && card  ? card.map((res, index)=>(
        <div key={index} className="card w-[300px] h-[350px] shadow-xl text-black   px-2 py-2 bg-red-100 ">
          <div className='flex justify-between'>
            <NavLink to={`/edit-course/${res._id}`} className='btn btn-sm btn-info'><MdEdit /></NavLink>
            <button className='btn btn-sm btn-error'><FaDeleteLeft /></button>
          </div>
        <figure className='w-full h-[200px] p-1'>
          <img
          className='w-full h-full card'
            src="https://img.freepik.com/premium-vector/female-teacher-with-pointer-stick-vector-white-background_1026278-17015.jpg?semt=ais_hybrid"
            alt="Shoes" />
        </figure>
        <div className="flex flex-col gap-2 ">
          <h2 className=" capitalize"><span className='font-bold'>course: </span> {res.courseTitle}</h2>
          <p className='capitalize'><span className='font-bold'>course title: {res.courseContent} </span></p>
          </div>
          <div className="flex justify-between items-center   w-full px-2 mt-1">
              <p className=' capitalize'><span className='  font-bold'>author: {author} </span></p>
            <button className="btn sm:btn-sm btn-primary  caption-top capitalize" onClick={()=>showPdf(res.coursePdf)}>download Now</button>
          </div>
  
      </div>
      ))
      : 
      <div>
        <h1 className='text-capitalize text-xl'>loading</h1>
      </div>
    }
  
    </>
  )
}

export default Card

