import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


const UserManagement = () => {
    const [status, setStatus]=useState({})
    const [isExist,setIsExist]=useState(false)
    const {data:users}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/users')
            return res.data
        }
    })

    const handleStatus=(e,id)=>{
        
        setStatus({
            ...status,
            [id]:e.target.value
        })

        setIsExist({
            ...isExist,
            [id]:true
        })
    }
    console.log('items:', isExist)

    return (
        <div>
            <table className="table   ">
                  {/* head */}
                 <thead className="">
                 <tr className="text-sm md:text-black font-bold text-white text-center">
                 <th className=""></th>
                 <th className=" "> User Name  </th>
                 <th className=" "> Designation </th>
                 <th className=" "> Status </th> 
                 <th className=" ">Update status</th>   
                 </tr>
                 </thead>

                 <tbody id="kepper-hidden">
        
    {/* if user status is keeper and is checked is false */}           
            {
           users?.map((user,index)=><>
           <tr className="lg:text-xl text-black  text-center">
           <th className="">{index+1}</th>
           
           <td>{user?.name}</td>
           <td>{user?.designation}</td>
           <td> <select onChange={(e)=>handleStatus(e,user?._id)}  className="input input-bordered text-black w-full hover:scale-105 transition duration-300 ease-in-out">
                <option value="">{user?.status}</option>
                <option value="keeper">keeper</option>
                <option value="member">member</option>
                <option value="admin">admin</option>
                
              </select></td>
           <td><button  className="font-semibold px-3 py-2 mt-2 rounded-md bg-[#4CAF50] hover:scale-105 transition duration-300 ease-in-out">Update</button></td>
           
           
           </tr>
         </>)
      }

    </tbody>
  </table>
        </div>
    );
};

export default UserManagement;