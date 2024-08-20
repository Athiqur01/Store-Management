import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Demand = () => {

    const {data:requisiteData, refetch}=useQuery({
        queryKey:['requisiteData'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/requisitedata')
            refetch
            return res.data
        }
    })
          console.log('requisition',requisiteData)
    
    // Post Operation to send data to store keeper
    const requisitionBy='monsur'
    const isChecked=false
    const handleStoreKeeper=()=>{
        axios.post('http://localhost:5012/storeKeeper',{requisiteData, requisitionBy,isChecked})
        .then(res=>
            console.log(res.data)
            
        )
            
    }
    
    

        
      

    return (
        <div className="text-white w-[100%] md:w-[20%] lg:w-[20%] px-2 flex flex-col items-center ">
        <h2 className="text-3xl font-bold text-center mb-2 display md:hidden lg:hidden">Issued Items</h2>
      <table className="table   ">
        {/* head */}
       <thead className="">
       <tr className="text-sm md:text-base font-bold text-white text-center">
       <th className=""></th>
       <th>Item Name </th>
       <th className=" "> Quantity </th>
       </tr>
       </thead>

       <tbody>

      {/* row  */}
  {
  requisiteData?.map((item,index)=><>
 <tr className="lg:text-xl text-white  text-center">
 <th className="">{index+1}</th>
 <td>{item?.itemName}</td>
 <td className="flex text-center flex justify-center"><button className="text-xl bg-[#7C4DFF] px-3 ">-</button> <p className="bg-white min-w-10 max-w-14 text-black">{item?.demand}</p> <button className="bg-[#7C4DFF] px-3">+</button></td>
 </tr>
</>)
}

</tbody>
</table>

     <button onClick={handleStoreKeeper} className=" font-semibold px-3 py-2 mt-2 rounded-md bg-[#4CAF50]">Send To Store Keeper</button>
      </div>
    );
};

export default Demand;