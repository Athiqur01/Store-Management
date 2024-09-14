import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useLoggedUser from "../useLoggedUser/useLoggedUser";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";


const MyRequisition = () => {
   // const [loggedUser]=useLoggedUser()
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
    console.log('logged',loggedUser)
    const [items,setItems]=useState(null)
    const userName=loggedUser?.name
   
    // useEffect(()=>{
    //     axios.get(`http://localhost:5012/reqitems?q=${'Abu Sayed'}`)
    //     .then(res=>{
    //      setItems(res.data)
    //     })
    // },[userName])


    const {data:reqitems} = useQuery({
        queryKey: ['reqitems'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5012/reqitems?q=${userName}`);
            return res.data;
        },
        enabled: !!loggedUser
        
    });

    if(!userName){
        return <p>Loaing---=</p>
    }

    return (
        <div>
            <h2 className="text-center pt-6 md:pt-10 lg:pt-10 pb-4 md:pb-6 lg:pb-6 text-xl md:text-2xl lg:text-3xl font-bold">My Requisition</h2>

            <table className="table text-black  ">
                  {/* head */}
                 <thead className="">
                 <tr className="text-sm md:text-black font-bold text-black text-center">
                 <th className=""></th>
                 <th>Approval Date</th>
                 <th>Requisited By</th>
                 <th className=" ">Action</th>
            
                 </tr>
                 </thead>

                 <tbody id="kepper-hidden">
        
    {/* if user status is keeper and is checked is false */}           
            {
           reqitems?.map((item,index)=><>
           <tr className="lg:text-xl text-black  text-center">
           <th className="">{index+1}</th>
           <td>{item?.registerData?.approvalDate}</td>
           <td>{item?.registerData?.requisitionBy}</td>
           <td><Link to={`/download/${item?._id}`}><button className="font-semibold px-3 py-2 mt-2 rounded-md bg-[#4CAF50]">View Detail</button></Link></td>
 
           </tr>
         </>)
      }


      
    </tbody>
  </table>


        </div>
    );
};

export default MyRequisition;