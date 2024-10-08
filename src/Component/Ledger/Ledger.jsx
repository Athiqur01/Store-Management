import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import useLoggedUser from "../useLoggedUser/useLoggedUser";


const Ledger = () => {
    const headingText = "Ledger Item List";
    const navigate=useNavigate()
    const [currentPage, setCurrentPage]=useState(0)
    const [items,setItems]=useState(null)

    console.log('iuy',items)

   //custom hook to fetch logged user data
   const [loggedUser]=useLoggedUser()
   const userStatus=loggedUser?.status

    //count item from item collection to set ledger serial no
    const {data:ledgerSerial, refetch}=useQuery({
      queryKey:['ledgerSerial'],
      queryFn:async ()=>{
          const res=await axios.get('http://localhost:5012/count')
          return res.data
      }
  })


 


  console.log('ledgerSerial:', ledgerSerial?.totalItems)
//Pagenation---------------------
const count=ledgerSerial?.totalItems
const itemsPerPage=15
const totalPages=Math.ceil(count/itemsPerPage)
const pages=[]
    for(let i=0; i<totalPages; i++){
        pages?.push(i)

    }
    console.log(pages)


    useEffect(()=>{
      fetch(`http://localhost:5012/shortedItem?page=${currentPage}&size=${itemsPerPage}`)
      .then(res=>res.json())
      .then(data=>setItems(data))
  }

  ,[currentPage,itemsPerPage])



    const handleLedgerDetail=(name)=>{
        const encodedName = encodeURIComponent(name);
        navigate(`/ledger/${encodedName}`)
       console.log(name)
    }
  
    const handleStartingDate=(e)=>{
      console.log('start',e.target.value)
    }
    const handleEndingDate=(e)=>{
      console.log('start',e.target.value)
    }
    const handleSearch=(e)=>{
      
    }

    return (
        <div>
          
           {(userStatus==='keeper' || userStatus==='admin')? <div className="flex flex-col justify-center">
            <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20  ">
                  
                  <motion.h2
      className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8 "
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

    {/* Search according to date */}
    <div className="flex flex-col md:flex-row lg:flex-row gap-4 py-4">
      <div className="flex gap-4"><h2 className="text-[#4CAF50] text-xl font-bold">Starting Date:</h2> <input onChange={handleStartingDate} type="date" className="text-black rounded-sm"/></div>
      <div className="flex gap-4"><h2 className="text-[#4CAF50] text-xl font-bold">Ending Date:</h2> <input onChange={handleEndingDate} type="date" className="text-black rounded-sm"/></div>
    </div>

                <table className="table   ">
                  {/* head */}
                 <thead className="">
                 <tr className="text-sm md:text-base font-bold text-white text-center">
                 <th className=" "> </th> 
                 <th className=" "> Ledger Serial No </th> 
                 <th className=" "> Item Name  </th>
                 <th className=" "> Stock </th>
                 <th className=" ">Action</th>   
                 </tr>
                 </thead>

                 <tbody id="kepper-hidden">
        
    {/* if user status is keeper and is checked is false */}           
            {
           items?.map((item,index)=><>
           <tr className="lg:text-xl text-white  text-center">
           <td>{currentPage*itemsPerPage+ index+1}</td>        
           <td>{item?.ledgerSerialNo}</td>        
           <td>{item?.itemName}</td>
           <td>{item?.quantity}</td>        
           <td><button onClick={()=>handleLedgerDetail(item?.itemName)}  className="text-xs lg:text-base font-semibold px-3 py-2 mt-2 rounded-md bg-[#4CAF50] hover:scale-105 transition duration-300 ease-in-out">Ledger Detail</button></td>
           
           
           </tr>
         </>)
      }

    </tbody>
  </table>
  
 </div>
 
 <div className="flex justify-center">
 <div className='space-x-3 py-10'>
            <button onClick={()=>currentPage>0 && setCurrentPage(currentPage-1)} className='px-3 py-1 border-red-50 border-2 bg-red-50 '>Prev</button>
                {pages.map(page=><>
                                   <button onClick={()=>{setCurrentPage(page)}} className={currentPage===page? 'px-3 py-1 border-red-50 border-2 bg-[#7C4DFF] text-white ' :'px-3 py-1 border-red-50 border-2 bg-red-50 '}>{page}</button>
                                </>)}
            <button onClick={()=>currentPage<pages?.length && setCurrentPage(currentPage+1)} className='px-3 py-1 border-red-50 border-2 bg-red-50 '>Next</button>
            
            </div>
 </div>
                
        </div>: <p className="text-white text-xl text-center">Warning: You are not allowed to access this section</p>}
          
        </div>
    );
};

export default Ledger;