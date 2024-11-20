import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { displaycardThunk } from '../redux/card.slice';

function HomeCard() {
  const card =  useSelector(state=>state.card.homeCard);
  const dispatch =  useDispatch();
  
    useEffect(()=>{
        dispatch(displaycardThunk());
    },[])

  return (
    
       <>
    {
     Array.isArray(card.message) && card.message.length>=0  ? card.message.map((res, index)=>(
        <div key={index} className="card bg-base-100 w-[300px] h-[375px] shadow-xl text-black pb-4 px-2 bg-red-100">
        <figure className='w-full h-[200px] p-1'>
          <img
          className='w-full h-full card'
            src="https://img.freepik.com/premium-vector/female-teacher-with-pointer-stick-vector-white-background_1026278-17015.jpg?semt=ais_hybrid"
            alt="Shoes" />
        </figure>
        <div className="flex flex-col gap-4">
          <h2 className=" capitalize"><span className='font-bold'>course: </span> {res.courseTitle}</h2>
          <p className='capitalize'><span className='font-bold'>course title: {res.courseContent} </span></p>
          </div>
          <div className="flex justify-between items-center  w-full px-2 mt-4">
              <p className=' capitalize'><span className=' font-bold'>author: {res.facultyId.facultyName} </span></p>
            <button className="btn sm:btn-sm btn-primary caption-top capitalize">download Now</button>
          </div>
  
      </div>
      ))
      : 
      <div>
        <h1 className='text-capitalize text-xl'>loading...</h1>
      </div>
    }
  
    </>
  
  )
}

export default HomeCard