import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion"


const ItemCatalog = () => {
    const headingText = "Item Catalogue";
    const {data:items}=useQuery({
        queryKey:['items'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/items')
            return res.data
        }
    })
    console.log('items:',items[0])
    
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
  <table className="table max-w-[900px]">
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
        items?.map(((item,index)=><>
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
  </table>
  </div>
</div>
    );
};

export default ItemCatalog;