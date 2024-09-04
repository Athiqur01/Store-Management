import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";


const UpdateItem = () => {

  const {user}=useContext(AuthContext)
  //get operation to fetch user
  const {data:loggedUser}=useQuery({
    queryKey:['loggedUser'],
    queryFn:async()=>{
      const res=await axios.get(`http://localhost:5012/user?email=${user?.email}`)
      return res.data
    },
    enabled: !!(user?.email),
    retry: 2,
    refetchOnWindowFocus: true, // Consider enabling this if you want to ensure up-to-date data
    refetchOnMount: true, // Ensure data is fetched every time the component mounts
    staleTime: 0, // Disable caching to always fetch fresh data
})

  const {data:items,refetch}=useQuery({
    queryKey:['items'],
    queryFn:async()=>{
        const res=await axios.get('http://localhost:5012/items')
        return res.data
    }
})

// count srb serial no number----
const {data:srbSerial}=useQuery({
  queryKey:['srbSerial'],
  queryFn:async ()=>{
      const res=await axios.get('http://localhost:5012/srb/count')
      console.log(res.data)
      return res.data   
  }
})


  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage]=useState({})

  const handleInputChange = (event,itemId) => {
    console.log('itemId',itemId)
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [itemId]: value,
    });

    const isNAN=isNaN(value)
    setErrorMessage({
      ...errorMessage,
      [itemId]:isNAN
    })

  };

 // const isNAN=isNaN(formData?.addItem)
  
  
  console.log('test',errorMessage)
  
     //handle update----------------
     const handleUpdate = (item) => {
      const addItemData = parseInt(formData[item._id]);
      const quantityData = parseInt(item?.quantity);
      const newStock = addItemData + quantityData;
      const balance=newStock
      const entryDate= new Date().toISOString().split('T')[0];
      const addedBy=loggedUser?.name || ''
      const {totalItems}=srbSerial
      const srbSerialNo=parseInt(totalItems)+1

      const {itemName, description, catagory, quantity, storeLocation,ledgerSerialNo
      }=item

      const itemSrb={itemName, description, catagory, addItemData, storeLocation,ledgerSerialNo,srbSerialNo,addedBy,entryDate
      }

      const itemLedger={itemName, description, catagory,addItemData, balance, storeLocation,ledgerSerialNo,srbSerialNo,addedBy,entryDate}
  
      if (!errorMessage[item._id] && !isNaN(addItemData)) {
        axios
          .patch(`http://localhost:5012/updateitem?q=${item?.itemName}`,{newStock})
          .then((res) => {
            if(res.data){
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Data updated successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            console.log(res);
            refetch();
          });
  
        
  
        setFormData({
          ...formData,
          [item._id]: '',
        });

         // Post operation in srb
         axios.post('http://localhost:5012/srb',itemSrb)
         .then(res=>{
           if(res.data){
             console.log(res)
             refetch()
           }
           else{
             Swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Item not Added to Srb!", 
             });
           }
             
         })


        // Post operation in ledger
        axios.post('http://localhost:5012/ledger',itemLedger)
        .then(res=>{
          if(res.data){
            console.log(res)
            refetch()
          }
          else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Item not Added to Srb!", 
            });
          }
        }) 


      }
    };

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
        <td><input onChange={(event)=>handleInputChange(event,item?._id)} type="text" placeholder="quantity" name='addItem' className="max-w-20 bg-[#9C27B0] rounded-md border-white border-2 text-center text-white px-2 py-1" />  {errorMessage[item._id] && (
                    <small className="text-red-300">
                      <br />
                      insert a number
                    </small>
                  )} </td>
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