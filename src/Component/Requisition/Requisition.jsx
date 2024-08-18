import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import Demand from "../Demand/Demand";


const Requisition = () => {

    //Handle change input name
    //const [formData, setFormData] = useState({});

    const [inputData, setInputData]=useState({})
    const [isNum, setIsNum]=useState(true)
    const [colorId, setColorId]=useState(false)
    const [itemId, setItemId]=useState(null)


    const handleInputData=(e,id,index)=>{
    const  demand=inputData[id]?.demand 
    const colorId=document.getElementById(`id${index}`)
    console.log('colorId',colorId)
      if(isNaN(parseInt (e.target.value))){
        setInputData('')  
        console.log('Insert a valid data')
        setIsNum(false)
        setColorId(true)
        colorId.classList.add('bg-red-500')
      }

      else{
        setInputData({
          ...inputData,
              [id]: {
                  ...inputData[id],
                  [e.target.name]: e.target.value
                  
            }
        })
        setIsNum(true)
        setColorId(false)
        colorId.classList.remove('bg-red-500')
      }
      setItemId(id)
      

      
      // if(e.target.name==='demand'){
      //   console.log('demand value',parseInt (e.target.value))
      // }
      // setInputData({
      //   ...inputData,
      //       [id]: {
      //           ...inputData[id],
      //           [e.target.name]: e.target.value
      //     }
      // })
    }

    
      
    
   
    const handleSendData=(item)=>{
      console.log('item', item)
     const {_id,itemName,catagory,description, entryDate,quantity,storeLocation}=item
     const demand=inputData[item?._id]?.demand
     const purpose=inputData[item?._id]?.purpose
     const demandItemData={itemName,catagory,description, entryDate,quantity,storeLocation,demand,purpose}
     //Post operation in Requisition
         axios.post(`http://localhost:5012/requisition?q=${itemName}`,demandItemData)
         .then(res=>{
             console.log(res)
             if(res.data){
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Requisition sent to the store keeper",
                  showConfirmButton: false,
                  timer: 2500
                });
          }
         })
    }

    console.log('input data',inputData)

    const {data:items}=useQuery({
        queryKey:['items'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/items')
            return res.data
        }
    })
    console.log('items:',items)

    



    return (
        <section className=" mx-auto text-center py-6 md:py-8 lg:py-10">
            <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold pb-4 md:pb-10">Requisition</h2>

            <div className="flex flex-col lg:flex-row gap-4 ">

              {/* left side start */}
              <div className="px-2 flex flex-col  w-[100%] md:w-[20%] lg:w-[20%] ">
                <h2 className="text-lg font-bold text-white bg-[#7C4DFF] py-2 mb-3">Search Item</h2>
                <input type="text"  placeholder="Search Item" className="input input-bordered text-black w-full mb-8 bg-white " />
                <h2 className="text-lg font-bold text-white bg-[#7C4DFF] py-2 mb-3">Item Catagory</h2>
                <select value="" className="text-lg font-bold text-black bg-white py-2 mb-4 text-center" >
                  <option className="text-lg font-bold text-black bg-white py-2 mb-4 text-center">Computer</option>
                  <option className="text-lg font-bold text-black bg-white py-2 mb-4 text-center">Electric</option>
                  <option className="text-lg font-bold text-black bg-white py-2 mb-4 text-center">Miscellaneous</option>
                </select>
                
                
                </div>
              {/* left side end */}

                {/* Middle side start */}

                <div className="text-white w-[100%] md:w-[60%] lg:w-[60%] px-2 flex flex-col items-center ">
                  <h2 className="text-2xl font-bold text-center mb-2 display md:hidden lg:hidden">All Items</h2>
                <table className="table   ">
                  {/* head */}
                 <thead className="">
                 <tr className="text-sm md:text-base font-bold text-white text-center">
                 <th className=""></th>
                 <th>Item Name </th>
                 <th className=" "> Stock </th>
                 <th className=" "> Demand </th>
                 <th className=" ">Purpose  </th>
                 <th className=" "> Action </th>
                 </tr>
                 </thead>

                 <tbody>
        
                {/* row  */}
            {
            items?.map((item,index)=><>
           <tr className="lg:text-xl text-white  text-center">
           <th className="">{index+1}</th>
           <td>{item.itemName}</td>
           <td>{item.quantity}</td>
           <td className="flex justify-center"> <input id={`id${index}`} onChange={(e)=>handleInputData(e,item?._id,index)} type="text" name="demand" value={inputData[item?._id]?.demand } className='bg-white min-w-10 max-w-14 text-black rounded-sm '  /> </td>
           <td><textarea onChange={(e)=>handleInputData(e,item?._id,index)} name="purpose" value={inputData?.purpose} id="" className="max-w-16 max-h-7 text-black rounded-sm focus:max-w-40   "></textarea></td>
           <td><button onClick={()=>handleSendData(item)} className=" px-2 py-1 rounded-md bg-[#4CAF50]">Send</button></td>
           
           </tr>
         </>)
      }
      
    </tbody>
  </table>
                </div>
                

                 {/* Middle side end */}

                 {/* Right side start */}

               <Demand></Demand>
                {/* Right side End */}

            </div>

        </section>
    );
};

export default Requisition;