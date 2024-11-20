/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import HomeCard from '../HomeCard';
// import HomeCard from '../HomeCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { searchCard } from '../../redux/card.slice';


function HeroSection() {

  
// const dispatch =  useDispatch();
// const result =  useSelector(state=>state.card.searchCard);
// console.log(result);
// const [search, setSearch] =  useState('')

// useEffect(()=>{
//   dispatch(searchCard(search))
// },[search, dispatch])




  return (

    <main className='m-4'>

   <section className='seciton1'>
 
      <div className="carousel w-full">
  <div id="item1" className="carousel-item w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
      className="w-full" />
  </div>
  <div id="item2" className="carousel-item w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
      className="w-full" />
  </div>
  <div id="item3" className="carousel-item w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
      className="w-full" />
  </div>
  <div id="item4" className="carousel-item w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
      className="w-full" />
  </div>
</div>
<div className="flex w-full justify-center gap-2 py-2">
  <a href="#item1" className="btn btn-xs">1</a>
  <a href="#item2" className="btn btn-xs">2</a>
  <a href="#item3" className="btn btn-xs">3</a>
  <a href="#item4" className="btn btn-xs">4</a>
</div>
  
   </section>

   <section className='section2 flex flex-wrap gap-4 justify-evenly'>

<HomeCard  />
   
   </section>
  
    </main>
  )
}

export default HeroSection
