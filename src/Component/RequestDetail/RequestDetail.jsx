import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";


const RequestDetail = () => {
    const [loading, setLoading] = useState(true);
    const [demandState, setDemandState]=useState()
    const [ids,setIds]=useState()
    const [stockState, setStockState]=useState()
    const { id } = useParams();
    console.log('iddddddd---',id)

    const navigate=useNavigate()
    

    //user Status-----
    const {user}=useContext(AuthContext)

    const {data:loggedUser}=useQuery({
        queryKey:['loggedUser',user?.email],
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
    
    
    const userStatus=loggedUser?.status

    // count sib number----
    const {data:sibSerial}=useQuery({
      queryKey:['sibSerial'],
      queryFn:async ()=>{
          const res=await axios.get('http://localhost:5012/sib/count')
          console.log(res.data)
          return res.data
          
      }
  })

    // Fetch data using useQuery
    // Fetch data using useQuery in object form
    const { data: detailData, isLoading, error,refetch } = useQuery({
        queryKey: ['detailData', id], // Unique key for the query
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5012/storeKeepers/${id}`);
            return res.data;
        },
    enabled: !!id,
    retry: 2,
    refetchOnWindowFocus: true, // Consider enabling this if you want to ensure up-to-date data
    refetchOnMount: true, // Ensure data is fetched every time the component mounts
    staleTime: 0, // Disable caching to always fetch fresh data
    
    });

    console.log('detaillll',detailData)
    // useEffect to update demandState when detailData changes
    useEffect(() => {
      if (detailData && Array.isArray(detailData?.LocalStorageItem)) {
        const initialDemandState = detailData?.LocalStorageItem?.reduce((acc, item) => {
          if (item?._id) { // Ensure item._id is defined
            acc[item?._id] = parseInt(item?.demand, 10) || 0; // Default to 0 if demand is undefined
          }
          return acc;
        }, {});
        setDemandState(initialDemandState);
      }
    }, [detailData]);
  console.log('demand Data state',demandState)

  //Handle Increase----
   const handleIncrease=(itemId)=>{
    
    setDemandState((prevState)=>{
      const newDemand=prevState[itemId]+1
      updateDemandInBackend(itemId, newDemand);
      console.log('newDemand',newDemand)

      return {
        ...prevState,
        [itemId]:newDemand
      }
    })
    refetch()
   }
   // Dandle Decrease------
   const handleDecrease=(itemId)=>{
      setDemandState((prevState)=>{
      const newDemand=Math.max(prevState[itemId]-1,0)
      updateDemandInBackend(itemId, newDemand);
      return {
        ...prevState,
        [itemId]:newDemand
      }
    })
    refetch()
   }

   console.log('detail Data:--- ',detailData)

 // Function to update demand in the backend
 const updateDemandInBackend = (itemId, newDemand) => {
  axios.patch(`http://localhost:5012/storeKeeper/${id}/item/${itemId}`, {
      demand: newDemand
  })
  .then(res => {
      console.log("Demand updated:", res.data);
      refetch()
  })
  .catch(err => {
      console.error("Error updating demand:", err);
  });
};


console.log('viewwww', )
console.log('id', id)

//after decrement to of single item requisition if the demand is zero the delete operation of the mother object
if(detailData?.LocalStorageItem?.length===0){
  axios.delete(`http://localhost:5012/deletetotal/${id}`)
  .then(res=>{
    console.log(res.data)
    refetch()
    navigate('/request')
  })
}


    // Handling loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handling error state
    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    // Check if detailData is defined and is an array
    if (!detailData || detailData?.length === 0  ) {
        return <div><span className="loading loading-dots loading-lg"></span></div>;
    }

    if(!loggedUser){
      return <div><span className="loading loading-dots loading-lg"></span></div>
    }
    
    
    // Send to Re----
    const handleSendToRE=(id)=>{
        const keeperHidden=document.getElementById('kepper-hidden')
        const keeperButton=document.getElementById('keeper-button')
        
        console.log('keeperHidden', keeperButton)
         const isChecked=true
         console.log('isChecked2',isChecked)
         axios.patch(`http://localhost:5012/keeper/${id}`,{isChecked})
         .then(res=>{
         console.log(res)
 
      })

    keeperHidden.classList.add('hidden')
        keeperButton.classList.add('hidden')
     
    }

 
    // Assuming the first item in detailData contains the requisiteData array
    //const dataaa = detailData[0];
    const view = detailData?.LocalStorageItem ;
    const isChecked=detailData?.isChecked
    const requisitionBy=detailData?.requisitionBy
    const demanderDesignation=detailData?.designation
    console.log('detail Data2:--- ',requisitionBy,demanderDesignation)
    
    if(!view){
      return <p>data is loading for----</p> 
    }
    if(!demandState){
      return <p>data is loading----</p>
    }
    // if(loading){
    //   return <p>data is loading------</p>
    // }
   
    console.log('detail Data:--- ',detailData?.LocalStorageItem[0].fullItemDetails.quantity)

    view.map(item=>{
      console.log('quantity', item?.demand)
    })
    

    // update data in the sib and ledger-----
    console.log('logged user',loggedUser?.name)
    const {totalItems}=sibSerial
    const sibSerialPerse=parseInt(totalItems)+1
    const currentDate = new Date();
    const approvalDate = currentDate.toLocaleDateString();
    const approvedBy=loggedUser?.name
    const approverDesignation=loggedUser?.designation 
    console.log('designation',approverDesignation)
    const handleApproveRequest=()=>{
    refetch()
    .then(()=>{

      view?.forEach((item,index) => {
        const quantity=item?.fullItemDetails?.quantity
        const sibSerialNo=index+sibSerialPerse
        
        const {itemName,purpose,demand,ledgerSerialNo}=item
        const encodedItemName=encodeURIComponent(itemName)
        const balance= parseInt(quantity)-parseInt(demand)
        const lastOut=currentDate.toLocaleDateString();
        const sibData={itemName,purpose,quantity,demand,balance,ledgerSerialNo,approvalDate,sibSerialNo}
    
        console.log('demand', demand )
        
         axios.post('http://localhost:5012/sib',sibData) //post operation in sibCollection and ledger simultinuously
         .then(res=>{
          if(res.data){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item added successfully",
                showConfirmButton: false,
                timer: 2500
              });
              refetch()
        }
          console.log(res.data)
         })  
         
        
         //Patch operation--------
    
         axios.patch(`http://localhost:5012/balance?q=${itemName}`,{balance,lastOut})
         .then(res=>{
          console.log('update',res.data)
         })
        
        console.log('balanc', itemName )
    
    
         axios.post('http://localhost:5012/sibLedger',sibData) //post operation of requisition in ledgerCollection
         .then(res=>{
          console.log(res.data)
         })                 
        
      })

    })
    ;

   //requisition Register
   const registerData={view,approvalDate,approvedBy,approverDesignation,demanderDesignation,requisitionBy}

   axios.post('http://localhost:5012/requisition/register',{registerData}) //post operation in sibCollection and ledger and requisition Register simultinuously
   .then(res=>{
    if(res.data){
      console.log(res.data)
  }
    console.log(res.data)
   }) 

   //delete operation---

   axios.delete(`http://localhost:5012/viewdetail/${id}`)
   .then(res=>{
    navigate('/')
    console.log(res.data)
    
   })
   
refetch()
}

//handle delete
const handleDelete=(id)=>{
  axios.delete(`http://localhost:5012/deletereq/${id}`)
  .then(res=>{
    console.log(res.data)
    refetch()
  })
  console.log('delete',id)
}


console.log('ddd',id)
   
   

    return (
        <div className="flex flex-col justify-center">
            <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-8 md:py-12 lg:py-14  ">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8 ">Requisition Detail </h2>
                <table className="table   ">
                  {/* head */}
                 <thead className="">
                 <tr className="text-sm md:text-base font-bold text-white text-center">
                 
                 <th>Item Name </th>
                 <th className=" "> Stock </th>
                 <th className=" "> Demand </th>
                 <th className="">Purpose  </th>
                 <th className=" ">Delete  </th>
                 
                 </tr>
                 </thead>

                 <tbody id="kepper-hidden">
        
    {/* if user status is keeper and is checked is false */}           
            {
           view?.map((item,index)=><>
           {!isChecked && userStatus==='keeper' && <tr className="lg:text-xl text-white  text-center">
           
           <td>{item?.itemName}</td>
           <td>{item?.fullItemDetails?.quantity}</td>
           <td className="flex text-center justify-center"><button className="text-xl bg-[#7C4DFF] px-3 w-8 ">-</button> <p className="bg-white min-w-8 max-w-10 text-black">{item?.demand}</p> <button  className="bg-[#7C4DFF] px-3 w-8 flex justify-center">+</button></td>
           <td className=""><p className=" text-white text-center  ">{item?.purpose}</p></td>
           <td className="text-center"><button onClick={()=>handleDelete(item?._id)} className="bg-red-400 p-[6px] rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"><AiFillDelete /></button></td>
           
           
           </tr>}
         </>)
      }
{/* if user status is admin and is checked is true */}

{
           view?.map((item,index)=><>
           {isChecked && userStatus==='admin' && <tr className="lg:text-xl text-white  text-center">
           
           <td>{item?.itemName}</td>
           <td>{item?.fullItemDetails?.quantity}</td>
           <td className="flex text-center  justify-center items-center"><button onClick={()=>handleDecrease(item?._id)} className="text-xl bg-[#7C4DFF] px-3 w-8 ">-</button> <input className="bg-white min-w-86 max-w-8 min-h-[27px] text-center text-black" value={item?.demand || 0} readOnly />  <button onClick={()=>handleIncrease(item?._id)} className="text-xl bg-[#7C4DFF] px-3 w-8 flex justify-center items-center">+</button></td>
           <td><p className=" text-white text-center  ">{item?.purpose}</p></td>
           <button onClick={()=>handleDelete(item?._id)} className="bg-red-400 p-[6px] rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"><AiFillDelete /></button>
           
           
           </tr>}
         </>)
      }


{/* {
          !isChecked && userRole==='keeper' &&  view?.map((item,index)=><>
           <tr className="lg:text-xl text-white  text-center">
           <th className="">{index+1}</th>
           <td>{item?.itemName}</td>
           <td>{item?.quantity}</td>
           <td className="flex text-center justify-center"><button className="text-xl bg-[#7C4DFF] px-3 w-10 ">-</button> <p className="bg-white min-w-10 max-w-14 text-black">{item?.demand}</p> <button className="bg-[#7C4DFF] px-3 w-10">+</button></td>
           <td><p className=" text-white text-center  ">{item?.purpose}</p></td>
           
           
           </tr>
         </>)
      } */}
      
    </tbody>
  </table>
  <div className="flex justify-center">
    {!isChecked && userStatus==='keeper' && <button id="keeper-button" onClick={()=>handleSendToRE(id)} className=" px-3 md:px-4 lg:px-4 py-1 md:py-2 lg:py-2 text-base md:text-lg lg:text-lg mt-4 md:mt-6 lg:mt-6 text-white font-bold rounded-md bg-[#4CAF50]">Send To RE</button>}

    {isChecked && userStatus==='admin' && <button onClick={handleApproveRequest}  className=" px-3 md:px-4 lg:px-4 py-1 md:py-2 lg:py-2 text-base md:text-lg lg:text-lg mt-4 md:mt-6 lg:mt-6 text-white font-bold rounded-md bg-[#4CAF50]">Approve Request</button>}
  </div>
 </div>
                
        </div>
                
    );
};

export default RequestDetail;