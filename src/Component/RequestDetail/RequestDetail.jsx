import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";


const RequestDetail = () => {
    const [loading, setLoading] = useState(false);
    const [demandState, setDemandState]=useState()
    const { id } = useParams();
    console.log('iddddddd---',id)

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
    
    console.log('logged user',loggedUser?.status)
    const userStatus=loggedUser?.status

    // Fetch data using useQuery
    // Fetch data using useQuery in object form
    const { data: detailData, isLoading, error } = useQuery({
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

    // useEffect to update demandState when detailData changes
    useEffect(() => {
      if (detailData && Array.isArray(detailData[0]?.LocalStorageItem)) {
        const initialDemandState = detailData[0]?.LocalStorageItem?.reduce((acc, item) => {
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
   }
console.log('demandState---',demandState)

 // Function to update demand in the backend
 const updateDemandInBackend = (itemId, newDemand) => {
  axios.patch(`http://localhost:5012/storeKeeper/${id}/item/${itemId}`, {
      demand: newDemand
  })
  .then(res => {
      console.log("Demand updated:", res.data);
  })
  .catch(err => {
      console.error("Error updating demand:", err);
  });
};


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
    const dataaa = detailData[0];
    const view = dataaa?.LocalStorageItem;
    const isChecked=dataaa?.isChecked
    console.log('isChecked',isChecked)
    
    if(!view){
      return <p>data is loading----</p>
    }
    

   
   

    return (
        <div className="flex flex-col justify-center">
            <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20  ">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8 ">All Items</h2>
                <table className="table   ">
                  {/* head */}
                 <thead className="">
                 <tr className="text-sm md:text-base font-bold text-white text-center">
                 <th className=""></th>
                 <th>Item Name </th>
                 <th className=" "> Stock </th>
                 <th className=" "> Demand </th>
                 <th className=" ">Purpose  </th>
                 
                 </tr>
                 </thead>

                 <tbody id="kepper-hidden">
        
    {/* if user status is keeper and is checked is false */}           
            {
           view?.map((item,index)=><>
           {!isChecked && userStatus==='keeper' && <tr className="lg:text-xl text-white  text-center">
           <th className="">{index+1}</th>
           <td>{item?.itemName}</td>
           <td>{item?.quantity}</td>
           <td className="flex text-center justify-center"><button className="text-xl bg-[#7C4DFF] px-3 w-10 ">-</button> <p className="bg-white min-w-10 max-w-14 text-black">{item?.demand}</p> <button  className="bg-[#7C4DFF] px-3 w-10">+</button></td>
           <td><p className=" text-white text-center  ">{item?.purpose}</p></td>
           
           
           </tr>}
         </>)
      }
{/* if user status is admin and is checked is true */}

{
           view?.map((item,index)=><>
           {isChecked && userStatus==='admin' && <tr className="lg:text-xl text-white  text-center">
           <th className="">{index+1}</th>
           <td>{item?.itemName}</td>
           <td>{item?.quantity}</td>
           <td className="flex text-center justify-center"><button onClick={()=>handleDecrease(item?._id)} className="text-xl bg-[#7C4DFF] px-3 w-10 ">-</button> <input className="bg-white min-w-10 max-w-14 text-center text-black" value={demandState?.[item?._id] || 0} readOnly />  <button onClick={()=>handleIncrease(item?._id)} className="bg-[#7C4DFF] px-3 w-10">+</button></td>
           <td><p className=" text-white text-center  ">{item?.purpose}</p></td>
           
           
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

    {isChecked && userStatus==='admin' && <button  className=" px-3 md:px-4 lg:px-4 py-1 md:py-2 lg:py-2 text-base md:text-lg lg:text-lg mt-4 md:mt-6 lg:mt-6 text-white font-bold rounded-md bg-[#4CAF50]">Approve Request</button>}
  </div>
 </div>
                
        </div>
                
    );
};

export default RequestDetail;