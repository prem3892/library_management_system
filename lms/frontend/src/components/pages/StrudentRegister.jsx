

function StrudentRegister() {
  return (
    <>
        <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
        <h1 className=' capitalize  text-center font-bold tracking-wider lg:text-4xl md:text-xl text-sm'>register Student</h1>
	<form noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Personal Inormation</p>
				<p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
			</div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="firstname" className="text-sm">First name</label>
					<input  name='facultyName'  id="firstname" type="text" placeholder="First name" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="lastname" className="text-sm">Last name</label>
					<input id="lastname" type="text" placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="email" className="text-sm">Email</label>
					<input  name='email'   id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="mobile" className="text-sm">Mobile</label>
					<input id="mobile"   name='mobile'  type="number" placeholder="Mobile" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
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
					<input   name='password'   id="Password" type="password" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-3">
					<label htmlFor="cpass" className="text-sm">Confirm Password</label>
					<input id="cpass" type="password" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-black  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full ">
				
					<input accept='.png, .jpg, .jpeg'  name='facultyProfile'  id="file" type="file" placeholder="" className=" rounded-md focus:ring focus:ring-opacity-75   focus:dark:ring-violet-600 text-white border border-white p-4" />
				</div>
				<div className="col-span-full ">
				
					<input  id="hidden" type="hidden" placeholder="" className=" rounded-md focus:ring focus:ring-opacity-75   focus:dark:ring-violet-600 text-white border border-white p-4"/>
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

export default StrudentRegister