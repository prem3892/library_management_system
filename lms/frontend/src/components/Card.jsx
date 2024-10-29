/* eslint-disable no-unused-vars */
import React from 'react'

function Card() {
  return (
    <>
      <div className="card bg-base-100 w-[300px] shadow-xl text-black pb-4 px-2">
  <figure className='w-full h-[200px] p-1'>
    <img
    className='w-full h-full card'
      src="https://img.freepik.com/premium-vector/female-teacher-with-pointer-stick-vector-white-background_1026278-17015.jpg?semt=ais_hybrid"
      alt="Shoes" />
  </figure>
  <div className="flex flex-col gap-4">
    <h2 className=" capitalize"><span className='font-bold'>course: </span> html</h2>
    <p className='capitalize'><span className='font-bold'>course title: </span>If a dog chews shoes whose shoes does he choose?</p>
    </div>
    <div className="flex justify-between items-center  w-full px-2 mt-4">
        <p className=' capitalize'><span className=' font-bold'>author: </span> prem</p>
      <button className="btn sm:btn-sm btn-primary caption-top capitalize">download Now</button>
    </div>

</div>
    </>
  )
}

export default Card
