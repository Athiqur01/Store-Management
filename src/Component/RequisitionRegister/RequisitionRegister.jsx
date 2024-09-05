import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

const RequisitionRegister = () => {

  const headingText = "Requisition Register";
    const {data:requisition}=useQuery({
        queryKey:['requisition'],
        queryFn:async()=>{
           const res=await axios.get('http://localhost:5012/reqregister')
           return res.data
        }
    })

   
    
    


    return (
        <div className="flex flex-col justify-center">
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

                <table className="table   ">
                  {/* head */}
                 <thead className="">
                 <tr className="text-sm md:text-base font-bold text-white text-center">
                 <th className=""></th>
                 <th>Approval Date</th>
                 <th className=" ">Action</th>
            
                 </tr>
                 </thead>

                 <tbody id="kepper-hidden">
        
    {/* if user status is keeper and is checked is false */}           
            {
           requisition?.map((item,index)=><>
           <tr className="lg:text-xl text-white  text-center">
           <th className="">{index+1}</th>
           <td>{item?.registerData?.approvalDate}</td>
           <td><Link to={`/download/${item?._id}`}><button className="font-semibold px-3 py-2 mt-2 rounded-md bg-[#4CAF50]">View Detail</button></Link></td>
 
           </tr>
         </>)
      }


      
    </tbody>
  </table>
  
 </div>
 
                
        </div>
    );
};

export default RequisitionRegister;