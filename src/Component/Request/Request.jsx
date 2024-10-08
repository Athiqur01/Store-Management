import { useQuery } from '@tanstack/react-query';
import request from '../../assets/Request.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import { motion } from "framer-motion"

const Request = () => {
    const {user}=useContext(AuthContext)
    const headingText = "All Request";
    //get operation to fetch all request from storekeeper
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
    console.log('logged user',loggedUser?.status)
    const userStatus=loggedUser?.status

   

    const {data:storeKeeper}=useQuery({
        queryKey:['storeKeeper'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/storeKeeper')
            return res.data
        }
    })
    

    const {data:adminData}=useQuery({
        queryKey:['adminData'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/admindata')
            return res.data
        }
    })

    console.log('admindata',adminData)

    const {data:keeperData}=useQuery({
        queryKey:['keeperData'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/keeperData')
            return res.data
        }
    })

    console.log('keeperData',keeperData)


if(!keeperData ){
  return <p className="flex justify-center"><span className="loading loading-ring loading-lg"></span></p>
}

if(!loggedUser){
  return <p className="flex justify-center"><span className="loading loading-ring loading-lg"></span></p>
}

     //const keeperItem=storeKeeper?.filter(i=>i?.isChecked===false)

    console.log('storekeeper',keeperData)
    return (
        <div className="py-10 md:py-16 lg:py-20">
            
            <motion.h2
     className="text-white font-bold text-2xl md:text-4xl lg:text-6xl pb-8 md:pb-12 lg:pb-14 text-center"
    >
      {headingText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10,color: '#fffff' }}
          animate={{ opacity: 1, y: 0, color: '#03A9F4' }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            repeat: Infinity,           // Loop animation
            repeatType: "mirror",       // Alternate direction after each loop
            repeatDelay: 1              // Delay between loops
          }}
          style={{ display: 'inline-block', minWidth: char === " " ? "0.5em" : "auto" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-4 lg:px-8">
       
       
       
       {
        keeperData?.map(item=>
                             <>
        
          {userStatus==='keeper' && <div className="card bg-base-100 image-full w-[full] shadow-sm">
   <figure>
     <img
       src={request}
       alt="Image is under process" />
   </figure>
   <div className="card-body">
     <h2 className="card-title">Requisition</h2>
     <p>Request From <span className='text-[#4CAF50]'>{item?.requisitionBy}</span></p>
     <div className="card-actions justify-end">
       <Link to={`/request/${item?._id}`}><button className="btn btn-primary">View Detail</button></Link>
     </div>
   </div>
 </div>
  }
  
  </>
        )
       }
       


       {
        adminData?.map(item=>
                             <>
        
        { userStatus==='admin' && <div className="card bg-base-100 image-full w-[full] shadow-sm">
   <figure>
     <img
       src={request}
       alt="Image is under process" />
   </figure>
   <div className="card-body">
     <h2 className="card-title">Requisition</h2>
     <p>Request From </p>
     <div className="card-actions justify-end">
       <Link to={`/request/${item?._id}`}><button className="btn btn-primary">View Detail</button></Link>
     </div>
   </div>
 </div>
  }
  
  </>
        )
       }


       
        </div>
            
        </div>
    );
};

export default Request;