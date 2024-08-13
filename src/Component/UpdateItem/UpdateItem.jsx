import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const UpdateItem = () => {

    const {data:items}=useQuery({
        queryKey:['items'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/items')
            return res.data
        }
    })

    console.log('items',items)

    return (
        <section>
            <div className="overflow-x-auto px-2  lg:px-6 py-10 mx-auto flex justify-center ">
  <table className="table max-w-[1000px]  ">
    {/* head */}
    <thead className="">
      <tr className="text-sm md:text-base font-bold text-white text-center">
        <th className=""></th>
        <th>Item </th>
        <th>Stock</th>
        
        <th>Add Item</th>
        
        
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        
      {/* row  */}
      {
         items?.map((item,index)=><>
        <tr className="lg:text-xl text-white  text-center">
        <th className="">{index+1}</th>
        <td>{item?.itemName}</td>
        <td>{item?.quantity}</td>
        <td><input type="text" placeholder="Item" className="max-w-20 bg-[#9C27B0] rounded-md border-black border-2 text-center" /></td>
        <td><button className="bg-[#7C4DFF] px-2 py-1 font-bold rounded-md">Update</button></td>
        
        
        
      </tr>
         </>)
      }
      
    </tbody>
  </table>
</div>
        </section>
    );
};

export default UpdateItem;