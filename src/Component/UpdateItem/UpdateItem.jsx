import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const UpdateItem = () => {

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()

  // const onSubmit = (data) => {
  //   console.log(data)
  //   }

  // const handleInputData=(e)=>{
  //   const data=e.target.addItem.value
  //   console.log(data)

  // }

  const [formData, setFormData] = useState({
    addItem: ''
    
  });

  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  

    const {data:items,refetch}=useQuery({
        queryKey:['items'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/items')
            return res.data
        }
    })

     //handle update----------------
      const handleUpdate=(item)=>{
      const addItemData=parseInt(formData?.addItem)
      const quantityData=parseInt(item?.quantity)
      const newStock=addItemData+quantityData
     //const newStock=
    //  typeof parseInt(id)
    
    if(isNaN(newStock)){
      console.log('nan')
    }

    else{
      axios.patch(`http://localhost:5012/items/${item._id}`,{newStock})
      .then(res=>{
        console.log(res)
        refetch()
      })
    }

     console.log('hello ', newStock )
     setFormData({
      addItem: ''
      
    })

    // Patch operation-/----------------
    
    
      
    

      
    
    
    

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });

    

    }

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
        <td><input onChange={handleInputChange} type="text" placeholder="quantity" name='addItem' className="max-w-20 bg-[#9C27B0] rounded-md border-white border-2 text-center text-white px-2 py-1" /></td>
        <td><button onClick={()=>handleUpdate(item)} className="bg-[#7C4DFF] px-2 py-1 font-bold rounded-md">Update</button></td>
        
        
        
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