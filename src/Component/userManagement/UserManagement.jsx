import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";


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

    const handleUpdate=(id)=>{
        console.log('status',status[id])
        const updateStatus=status[id]
        axios
          .patch(`http://localhost:5012/updatestatus/${id}`,{updateStatus})
          .then((res) => {
            if(res.data){
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User Status updated successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            console.log(res);
          });
    }

    console.log('items:', isExist)

    return (
        <div>
            <h2 className="text-center pt-6 md:pt-10 lg:pt-10 pb-4 md:pb-6 lg:pb-6 text-xl md:text-2xl lg:text-3xl font-bold">User Management</h2>
            <table className="table  ">
                  {/* head */}
                 <thead className="text-black lg:text-xl font-bold">
                 <tr className=" text-center">
                 <th className="hidden md:table-cell lg:table-cell"></th>
                 <th className=" "> User Name  </th>
                 <th className="hidden md:table-cell lg:table-cell"> Designation </th>
                 <th className=" "> Status </th> 
                 <th className=" ">Update status</th>   
                 </tr>
                 </thead>

                 <tbody id="kepper-hidden">
        
    {/* if user status is keeper and is checked is false */}           
            {
           users?.map((user,index)=><>
           <tr className="lg:text-xl text-black  text-center">
           <th className="hidden md:table-cell lg:table-cell">{index+1}</th>
           
           <td>{user?.name}</td>
           <td className="hidden md:table-cell lg:table-cell">{user?.designation}</td>
           <td > <select onChange={(e)=>handleStatus(e,user?._id)}  className="input input-bordered text-black text-center w-full hover:scale-105 transition duration-300 ease-in-out">
                <option value="">{user?.status}</option>
                <option value="keeper">keeper</option>
                <option value="member">member</option>
                <option value="admin">admin</option>
                
              </select></td>
           <td>{isExist[user?._id]? <button onClick={()=>handleUpdate(user?._id)}  className="font-semibold px-3 py-2 mt-2 rounded-md bg-[#4CAF50] hover:scale-105 transition duration-300 ease-in-out " >Update</button> :
           <button   className="font-semibold px-3 py-2 mt-2 rounded-md bg-[#4CAF50] hover:scale-105 transition duration-300 ease-in-out opacity-40" >Update</button>}</td>
           
           
           </tr>
         </>)
      }

    </tbody>
  </table>
        </div>
    );
};

export default UserManagement;