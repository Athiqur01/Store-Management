import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {

    const {user,logOut}=useContext(AuthContext)
    
    //get operation to fetch user
    const {data:loggedUser}=useQuery({
        queryKey:['loggedUser'],
        queryFn:async()=>{
          const res=await axios.get(`http://localhost:5012/user?email=${user?.email}`)
          return res.data
        },
        enabled: !!(user?.email),
        retry: 2,
        refetchOnWindowFocus: true, // Consider enabling this if you want to ensure up-to-date data
        refetchOnMount: true, // Ensure data is fetched every time the component mounts
        staleTime: 0, // Disable caching to always fetch fresh data
    })

// if(!(user?.email)){
//   return <p>loading---</p>
// }


    const NavLinkcenter=<>
                    <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>Home</NavLink>
                    <NavLink to='/requisition' className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>Requisition</NavLink>
                    <NavLink to='/request' className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>Request</NavLink>
                    <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>Search</NavLink>
                    
                  </>

    return (
        <div className=''>
            <div className="navbar bg-[#7B1FA2]">

            {/* navbar-start */}

  <div className="navbar-start">
    <div className="dropdown">
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
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
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
    <a className="btn btn-ghost px-4 py-2 text-xl font-semibold text-[#FFFFFF]">BBM Inventory Management</a>
  </div>
  {/* Navbar center-------- */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 ">
      
      {NavLinkcenter}
    </ul>
  </div>

  {/* Navber End------------ */}

  <div className="navbar-end">
    {user? <button onClick={logOut} className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'><p>{loggedUser?.name}</p> Logout </button>:
    <NavLink to='/login' className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>LogIn</NavLink>}
  
  
  </div>
</div>
            
        </div>
    );
};

export default Navbar;