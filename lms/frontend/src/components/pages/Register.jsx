
import React, {  useEffect, useState } from 'react';
import { appId } from '../../apis/manage_api';
import { useDispatch} from 'react-redux';
import { createFacultyThunk } from '../../redux/facullty.slice';
import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';



function Register() {
	const [inputData, setInputData] =  React.useState({
		facultyName: '',
		facultyEmail: '',
		facultyMobile: '',
		facultyPassword: '',
		facultyProfile: ''
	});
	const [adminID, setAdminID] =  useState('');
	const dispatch =  useDispatch();
	const navigate =  useNavigate();


	
	useEffect(()=>{
		setAdminID(appId)
	},[]);



	function handleOnchange(e){
		let {name, value, type, files} =  e.target;

		if(name ==="facultyProfile" && files.length>0){
			const file =  files[0];
			const isValidType =  file.type ==='image/jpeg' || file.type === 'image/png'
			if(!isValidType){
				e.target.value = ""
				alert("not allowed pdf");
				return;
			
			}
		}

		setInputData((prev)=>({
			...prev,
			 [name]: type==='file'? files[0]:  value
			
			}));
	};

	async function handleSubmit(e) {
		e.preventDefault();
		if(inputData.facultyName && inputData.facultyEmail && inputData.facultyMobile && inputData.facultyPassword && adminID && inputData.facultyProfile){
			const {facultyName, facultyEmail, facultyMobile, facultyPassword, facultyProfile} =  inputData;
			const formData =  new FormData();
			formData.append("facultyName", facultyName);
			formData.append("facultyEmail", facultyEmail);
			formData.append("facultyMobile", facultyMobile);
			formData.append("facultyPassword", facultyPassword);
			formData.append("facultyProfile", facultyProfile);
			formData.append("adminID", adminID);
			try{
				await dispatch(createFacultyThunk(formData)).unwrap();
				alert("Data successfully submitted");
				navigate("/login", {replace: true})
				
			}catch(e){
			
				return console.log(e.message);
			}
		}else{
			alert('all fields are required')
		}
	} 



  return (
    <>
	
        <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
            <h1 className=' capitalize  text-center font-bold tracking-wider lg:text-4xl md:text-xl text-sm'>register Faculty</h1>
	<form onSubmit={handleSubmit} action="" encType='multipart/form-data' className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Personal Inormation</p>
				<p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="firstname" className="text-sm">First name</label>
					<input onChange={handleOnchange} name='facultyName' value={inputData.facultyName} id="firstname" type="text" placeholder="First name" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="lastname" className="text-sm">Last name</label>
					<input id="lastname" type="text" placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="email" className="text-sm">Email</label>
					<input  onChange={handleOnchange} name='facultyEmail' value={inputData.facultyEmail}  id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="mobile" className="text-sm">Mobile</label>
					<input id="mobile"  onChange={handleOnchange} name='facultyMobile' value={inputData.facultyMobile}  type="number" placeholder="Mobile" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full">
					<label htmlFor="address" className="text-sm">Address</label>
					<input id="address" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label htmlFor="city" className="text-sm">City</label>
					<input id="city" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label htmlFor="state" className="text-sm">State / Province</label>
					<input id="state" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label htmlFor="zip" className="text-sm">ZIP / Postal</label>
					<input id="zip" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className=" col-span-3 ">
					<label htmlFor="Password" className="text-sm">Password</label>
					<input  onChange={handleOnchange} name='facultyPassword' value={inputData.facultyPassword}  id="Password" type="password" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-3">
					<label htmlFor="cpass" className="text-sm">Confirm Password</label>
					<input id="cpass" type="password" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full ">
				
					<input accept='.png'  onChange={handleOnchange} name='facultyProfile'  id="file" type="file" placeholder="" className=" rounded-md focus:ring focus:ring-opacity-75   focus:dark:ring-violet-600 text-white border border-white p-4" />
				</div>
				<div className="col-span-full ">
				
					<input onChange={(e)=>setAdminID(e.target.value)} value={adminID? adminID: ''} id="hidden" type="hidden" placeholder="" className=" rounded-md focus:ring focus:ring-opacity-75   focus:dark:ring-violet-600 text-white border border-white p-4"/>
				</div>
				<div className='col-span-full btn btn-primary  bg-red-500'>

                    <button className='capitalize w-full'>register</button>
				</div>
			</div>
		</fieldset>
	</form>
</section>
      
    </>
  )
}

export default Register


// facultyName, email, mobile, password, adminID   
// facultyProfile