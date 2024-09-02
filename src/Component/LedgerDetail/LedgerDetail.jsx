import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";


const LedgerDetail = () => {

    const {name}=useParams()
    const decodedName=decodeURIComponent(name)
    console.log('name:',name, decodedName)

    const {data:ledgerDetail}=useQuery({
        queryKey:['ledgerDetail'],
        queryFn:async ()=>{
        const res=await axios.get(`http://localhost:5012/ledgerdetail?q=${decodedName}`)
        return res.data
        }
    })

    console.log('ledgerData:', ledgerDetail)

    return (
        <div className="flex flex-col justify-center">
        <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20  ">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8 ">SIB Item List</h2>
            <table className="table   ">
              {/* head */}
             <thead className="">
             <tr className="text-sm md:text-base font-bold text-white text-center">
             <th className=""></th>
            
             <th className=" "> Item Name  </th>
             <th className=" "> Stock </th>
             <th className=" "> Ledger Serial No </th> 
             <th className=" ">Action</th>
             
             
             </tr>
             </thead>

             <tbody id="kepper-hidden">
    
{/* if user status is keeper and is checked is false */}           
        {
       ledgerDetail?.map((item,index)=><>
       <tr className="lg:text-xl text-white  text-center">
       <th className="">{index+1}</th>
       
       <td>{item?.itemName}</td>
       <td>{item?.quantity}</td>
       <td>{item?.ledgerSerialNo}</td>
       
       
       
       </tr>
     </>)
  }


  
</tbody>
</table>

</div>

            
    </div>
    );
};

export default LedgerDetail;