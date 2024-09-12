import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Deshboard = () => {

    const {user}=useContext(AuthContext)
    const {data:loggedUser}=useQuery({
        queryKey:['loggedUser',user?.email],
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
    console.log('user',loggedUser?.status)
    const userStatus=loggedUser?.status

    return (
        <div className="flex  ">
            <div className="w-[30%] bg-[#E1BEE7] pt-10 h-screen flex flex-col items-start px-2 md:6 lg:px-8 font-bold text-xs md:text-base lg:text-base gap-2">
             <Link to='/deshboard/profile'><button className="flex justify-center items-center gap-1 md:gap-2 lg:gap-2"><CgProfile />Profile</button></Link>
             
             {userStatus==='admin' && <Link to='/deshboard/user'><button className="flex justify-center items-center gap-1 md:gap-2 lg:gap-2"><IoSettingsOutline /> User Management</button></Link>}
             <button className="flex justify-center items-center gap-1 md:gap-2 lg:gap-2"><RxUpdate />Update Profile</button>
             <Link to='/'><button className="flex justify-center items-center gap-1 md:gap-2 lg:gap-2"><FaHome />Home</button></Link>

            </div>
            <div className="h-screen w-[70%] bg-gray-100">
            <div className=" ">
                <h2 className=" text-center text-2xl md:text-4xl lg:text-5xl font-bold mt-10 px-2">Bangladesh Betar, Mymensingh</h2>
               <div className="h-[1px] mt-4 md:mt-6 lg:mt-6 mx-4 md:mx-6 lg:mx-20 bg-gray-300"></div>
            </div>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Deshboard;