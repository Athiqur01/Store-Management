import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { button } from "framer-motion/client";
import userImg from '../../assets/user2.jpg'
import useLoggedUser from "../useLoggedUser/useLoggedUser";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import mic from '../../assets/mic.png'
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {

    const {user,logOut,dropdownRef,dropDownState, setDropDownState}=useContext(AuthContext)
   
    
    //get operation to fetch user
    const [loggedUser]=useLoggedUser()
    const userStatus=loggedUser?.status
// if(!(user?.email)){
//   return <p>loading---</p>
// }


//store Keeper data
const {data:keeperData}=useQuery({
  queryKey:['keeperData'],
  queryFn:async()=>{
      const res=await axios.get('http://localhost:5012/keeperData')
      return res.data
  }
})
const keeperDataCount=keeperData?.length
console.log('keeperData',keeperData)
//Admin data count---
const {data:adminData}=useQuery({
  queryKey:['adminData'],
  queryFn:async()=>{
      const res=await axios.get('http://localhost:5012/admindata')
      return res.data
  }
})
const adminDataCount=adminData?.length
console.log('admindata',adminData)


const {data:itemMessage}=useQuery({
  queryKey:['itemMessage'],
  queryFn:async ()=>{
      const res=await axios.get('http://localhost:5012/itemmessage')
      return res.data
  }
})

console.log('itemMess',itemMessage)

const orderedList=itemMessage?.slice().sort((a,b)=>Date.parse(b.lastOut)-Date.parse(a.lastOut))
console.log('order',orderedList)


                 // State for mobile dropdown menu
  // State for mobile dropdown menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Sub-menu state
  //toggle notification dropdown
  const [notificationDropdown, setNotificationDropdown]=useState(false)

  
  
   // Ref to detect outside click

  // Function to handle click outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      //setDropDownState(false); // Close the dropdown when clicking outside
      setIsSubMenuOpen(false)
      //setIsMobileMenuOpen(false)
      setNotificationDropdown(false)
    }
  };

  // Add event listener to listen for outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener
    };
  }, []);
  

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Toggle sub-menu
  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);
  const toggleDropDown=()=>setDropDownState(!dropDownState)
  const toggleNofification=()=>setNotificationDropdown(!notificationDropdown)

  


    const NavLinkcenter=<>
                    <NavLink className='px-4 py-2 text-base font-semibold text-[#FFFFFF] hover:text-[#03A9F4] hover:scale-125 transition duration-300 ease-in-out rounded-md '>Home</NavLink>
                    <NavLink to='/requisition' className='px-4 py-2 text-base font-semibold text-[#FFFFFF] hover:text-[#03A9F4] hover:scale-125 transition duration-300 ease-in-out rounded-md'>Requisition</NavLink>
                    <NavLink to='/request' className='px-4 py-2 text-base font-semibold text-[#FFFFFF] hover:text-[#03A9F4] hover:scale-125 transition duration-300 ease-in-out rounded-md'><span>Request <sup className={` px-[6px] py-[1px] rounded-full text-center ${((userStatus==='keeper' && keeperDataCount>0) || (userStatus==='admin' && adminDataCount>0)) && 'bg-red-400' }`}>{userStatus==='keeper' && keeperDataCount} {userStatus==='admin' && adminDataCount}</sup></span></NavLink>
                    
                    <NavLink to='/alart' className='px-4 py-2 text-base font-semibold text-[#FFFFFF] hover:text-[#03A9F4] hover:scale-125 transition duration-300 ease-in-out rounded-md flex gap-[2px]'><span className="text-xl"><IoNotificationsCircleSharp /> </span><sup className={`text-xs bg-red-400 w-[18px] h-[18px] text-center rounded-full ${(userStatus==='admin' || userStatus==='keeper')? 'display': 'hidden'}`}>{itemMessage?.length}</sup></NavLink> 
                  </>
   
  

    return (
      <div>
      <div className="navbar bg-[#7B1FA2] ">

        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown ">
            {/* Mobile Hamburger Menu Button */}
            <div tabIndex={0} role="button" className="btn btn-ghost text-white lg:hidden" onClick={toggleMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
          </div>
          <Link to='/' className="btn btn-ghost px-4 py-2 text-xl font-semibold text-[#FFFFFF] hover:text-[#03A9F4]  transition duration-300 ease-in-out rounded-md"><img className="w-6 h-8" src={mic} alt="" /> BBM Inventory Management</Link>
        </div>

        {/* Navbar Center for Larger Screens */}
        <div className="navbar-center relative  hidden lg:flex">
          <ul className="menu menu-horizontal  px-1">
            {NavLinkcenter}
          </ul>
          {/* dropdown for check notification start */}
          
          {/* dropdown for check notification end */}
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          
          {user ? (
            // <button onClick={logOut} className='px-4 py-2 text-base font-semibold text-[#FFFFFF]'>
            //   <p>{loggedUser?.name}</p> Logout
            // </button>
            <button onClick={toggleDropDown} className="rounded-full  w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16   font-semibold text-[#FFFFFF] text-center text-4xl lg:text-5xl"><FaUserCircle /></button>
          ) : (
            <NavLink to='/login' className='px-4 py-2 text-base font-semibold text-[#FFFFFF] '>LogIn</NavLink>
          )}

          {/* dropdown */}
          <div ref={dropdownRef} id="drop-down" className={`bg-[#7B1FA2] rounded-b-md z-10 absolute w-48 md:w-60 lg:w-64 mt-[248px] md:mt-[255px] lg:mt-[265px] duration-1000 delay-1000 ${dropDownState? 'display':'hidden'}`}>
        <ul onClick={toggleDropDown} className="p-4 font-bold text-white">
            <button className="btn btn-ghost w-full text-left"><li>{loggedUser?.name}</li></button>
            <Link to='/deshboard'><button className="btn btn-ghost w-full text-left"><li>Deshboard</li></button></Link>
            <button className="btn btn-ghost w-full text-left"><li onClick={logOut}>Log Out</li></button>
            
        </ul>
    </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div onClick={toggleMobileMenu} className="lg:hidden bg-[#9C27B0] max-w-[150px] p-4 rounded-md">
          <ul className="space-y-2">
            <li><NavLink to='/' className='block text-gray-800 hover:bg-gray-200 p-2 rounded-md'>Home</NavLink></li>
            <li><NavLink to='/requisition' className='block text-gray-800 hover:bg-gray-200 p-2 rounded-md'>Requisition</NavLink></li>
            <li><NavLink to='/request' className='block text-gray-800 hover:bg-gray-200 p-2 rounded-md'>Request</NavLink></li>
            <li>
              {/* Sub-menu Toggle */}
              <button onClick={toggleSubMenu} className="block text-gray-800 p-2 rounded-md w-full text-left hover:bg-gray-200">
                Search
              </button>
              {isSubMenuOpen && (
                <ul className="pl-4 space-y-2 mt-2">
                  <li><NavLink to='/search1' className='block text-gray-800 hover:bg-gray-200 p-2 rounded-md'>Submenu 1</NavLink></li>
                  <li><NavLink to='/search2' className='block text-gray-800 hover:bg-gray-200 p-2 rounded-md'>Submenu 2</NavLink></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
    );
};

export default Navbar;