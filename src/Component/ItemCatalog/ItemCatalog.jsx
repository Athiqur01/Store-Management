import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const ItemCatalog = () => {

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
            <h2 className="pb-6 pt-2 flex justify-center text-3xl md:text-4xl lg:text-5xl font-bold">Item Catalog</h2>
  <div className="flex justify-center">
  <table className="table max-w-[900px]">
    {/* head */}
    <thead>
      <tr className="text-lg font-bold text-center">
        <th className="text-[#03A9F4]"></th>
        <th className="text-[#03A9F4]">Item Name</th>
        <th className="text-[#03A9F4]">Description</th>
        <th className="text-[#03A9F4]">Stock</th>
        <th className="text-[#03A9F4]">Ledger Serial No</th>
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