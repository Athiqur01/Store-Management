import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion"


const Alart = () => {
    const headingText = "Stock Alert";
  
  
  
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

    return (
      <div className="mx-2 md:mx-6 lg:mx-8 py-10">
       
        <motion.h2
      className="text-white text-center text-2xl  md:text-3xl lg:text-4xl font-bold pb-4 md:pb-10"
    >
      {headingText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10,color: '#FFFFFF' }}
          animate={{ opacity: 1, y: 0, color: '#03A9F4' }}
          transition={{
            duration: 0.2,
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


          <div className="text-white grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            
           {orderedList?.map(item=><>
           <div className="bg-[#7B1Fbf] p-10 rounded-lg transform transition-transform duration-500 hover:scale-105  ">
           <h2><span className="font-semibold">Item Name:</span> {item?.itemName}</h2>
           <p > <span className="font-semibold">Alert:</span> <span className="text-red-400">Stock level is under the desired level</span></p>
           <h2 ><span className="font-semibold">Current Stock:</span> <span className="text-red-400">{item?.quantity} </span></h2>
           </div>
           </>)}
        </div>
      </div>
    );
};

export default Alart;