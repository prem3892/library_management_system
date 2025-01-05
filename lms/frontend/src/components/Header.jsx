
import { NavLink } from "react-router-dom"


function Header({name}) {
  return (
    <div>
      <div className="navbar header fixed left-0 right-0 top-0 z-10">
  <div className="navbar-start">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu bg-black menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><NavLink to='#'>Item 1</NavLink></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <NavLink to='/dashboard' className="btn btn-outline btn-secondary sm:btn-md xs:btn-sm text-xl capitalize">dashboard</NavLink>
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal px-1 ">
      <li><NavLink to='/' className=" capitalize">home</NavLink></li>
      <li>
        <details className=''>
          <summary>Parent</summary>
          <ul className="p-2 bg-black ">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end flex gap-4 ">
    {
      name ? "Welcome: "+  name :<NavLink to='/register' className="btn sm:btn-md xs:btn-sm btn-info">Sign Up</NavLink>
    }

    {
      name ? "" :     <NavLink disa to='/login' className="btn sm:btn-md xs:btn-sm btn-info" >
      Sign In 
      </NavLink>
    }
    

    {/* <NavLink to="/toggle-register" className="btn btn-primary disable">ToggleRegister</NavLink> */}
  </div>
</div>
    </div>
  )
}

export default Header
