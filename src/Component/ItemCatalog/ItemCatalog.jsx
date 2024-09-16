import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion"
import useLoggedUser from "../useLoggedUser/useLoggedUser";
import { p } from "framer-motion/client";
import { useEffect, useState } from "react";


const ItemCatalog = () => {

  const [loggedUser]=useLoggedUser()
  console.log('loooo',loggedUser)

    const headingText = "Item Catalogue";
    const {data:items}=useQuery({
        queryKey:['items'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/items')
            return res.data
        }
    })

    //Pagenation start -------
  const [currentPage, setCurrentPage]=useState(0)
  const [paginationItem,setpaginationItem]=useState(null)
  const count =items?.length // total item count for pagination
  console.log('srb data:', count)
  const itemsPerPage=15
  const totalPages=Math.ceil(count/itemsPerPage)
  const pages=[]
    for(let i=0; i<totalPages; i++){
      pages?.push(i)

       }
  console.log("pages",currentPage)

  useEffect(()=>{
    fetch(`http://localhost:5012/itemCatalog?page=${currentPage}&size=${itemsPerPage}`)
    .then(res=>res.json())
    .then(data=>setpaginationItem(data))
}

,[currentPage,itemsPerPage])

//Pagenation end -------
    
    
    return (
        <div className="text-white overflow-x-auto py-6 lg:py-10 px-2 ">

            <motion.h2
      className="pb-6 pt-2 flex justify-center text-3xl md:text-4xl lg:text-5xl font-bold"
    >
      {headingText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10,color: '#FFFFFF' }}
          animate={{ opacity: 1, y: 0, color: '#03A9F4' }}
          transition={{
            duration: 0.5,
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

  <div className="flex justify-center">
  {loggedUser?.status==='user'? <p>You are not allowed to access this Section</p>: <table className="table max-w-[900px]">
    {/* head */}
    <thead>
      <tr className="text-lg font-bold text-center">
        <th className="text-white"></th>
        <th className="text-white">Item Name</th>
        <th className="text-white">Description</th>
        <th className="text-white">Stock</th>
        <th className="text-white">Ledger Serial No</th>
      </tr>
    </thead>
    <tbody>
     
      {/* row 2 */}
      {
        paginationItem?.map(((item,index)=><>
        <tr className="hover hover:text-black text-white text-center">
        <th>{index+1}</th>
        <td>{item?.itemName}</td>
        <td>{item?.description}</td>
        <td>{item?.quantity}</td>
        <td>{item?.ledgerSerialNo}</td>
      </tr>
        </>))
      }
      
    </tbody>
  </table>}
  
  </div>
  {/* Pagination button start */}
  <div className="flex justify-center">
 <div className='space-x-3 py-10 text-black text-xs md:text-base lg:text-base'>
            <button onClick={()=>currentPage>0 && setCurrentPage(currentPage-1)} className='px-3 py-1 border-red-50 border-2 bg-red-50 '>Prev</button>
                {pages.map(page=><>
                                   <button onClick={()=>{setCurrentPage(page)}} className={currentPage===page? 'px-3 py-1 border-red-50 border-2 bg-[#7C4DFF] text-white ' :'px-3 py-1 border-red-50 border-2 bg-red-50 '}>{page}</button>
                                </>)}
            <button onClick={()=>currentPage<pages?.length && setCurrentPage(currentPage+1)} className='px-3 py-1 border-red-50 border-2 bg-red-50 '>Next</button>
            
            </div>
 </div>
  {/* Pagination button end */}
</div>
    );
};

export default ItemCatalog;