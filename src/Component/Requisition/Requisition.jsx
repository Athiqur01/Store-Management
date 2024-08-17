import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const Requisition = () => {

    //Handle change input name
    //const [formData, setFormData] = useState({});

    const [inputData, setInputData]=useState({})
    const handleInputData=(e,id)=>{
      setInputData({
        ...inputData,
            [id]: {
                ...inputData[id],
                [e.target.name]: e.target.value
            }
      })

    }

    const handleSendData=(item)=>{
      console.log('item', item)
     const {_id,itemName,catagory,description, entryDate,quantity,storeLocation}=item
     const demand=inputData[item?._id]?.demand
     const purpose=inputData[item?._id]?.purpose
     const demandItemData={_id,itemName,catagory,description, entryDate,quantity,storeLocation,demand,purpose}
     //Post operation in Requisition
         axios.post('http://localhost:5012/requisition',demandItemData)
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

    const {data:items,refetch}=useQuery({
        queryKey:['items'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/items')
            return res.data
        }
    })
    console.log('items:',items)

    

    //   const handleChange = (event) => {
        
    //     const { name, value } = event.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value,
    //     });
        
    //   };

    //   console.log('kl',formData)

    //   const singleItem=items?.find(item=>item?.itemName===formData?.itemName)
    // console.log('item:',singleItem)

    // console.log('old stock',singleItem?.quantity)

    // // Get operation from 
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //   } = useForm()

    //   const onSubmit = (itemInfo) => {
    //     const itemName=itemInfo?.itemName
    //     const purpose=itemInfo?.purpose
    //     const quantity= itemInfo?.quantity
    //     const issuedBy= itemInfo?.issuedBy
    //     const issueDate=itemInfo?.issueDate
    //     const storeLocation=itemInfo?.storeLocation
        
    //     const issuedItem={itemName, purpose, quantity, issuedBy, issueDate, storeLocation}

    //     console.log(issuedItem)
        
    //     const oldStock=singleItem?.quantity
    //     const outItem=parseInt(quantity)
    //     const oldItemParsed=parseInt(oldStock)
    //     const newStock= oldItemParsed-outItem
    //     console.log('old,out,new',oldStock,outItem,newStock)


       

    //     // Post operation in ledger
    //      axios.post('http://localhost:5012/requisition',issuedItem)
    //      .then(res=>{
    //          console.log(res)
    //      })

    //      if(isNaN(newStock) || singleItem===undefined ||oldStock===undefined){
    //         console.log('NAN')
    //      }
    //      else{
    //         console.log('not nan')
    //         //  Patch operation for requisition
    //      axios.patch(`http://localhost:5012/items/${itemInfo?.itemName}`,{newStock})
    //      .then(res=>{
    //       console.log(res)
    //    })
        
    //      }
        
         
        
       
    //   }



    return (
        <section className=" mx-auto text-center py-6 md:py-8 lg:py-10">
            <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold pb-4 md:pb-10">Requisition</h2>

            <div className="flex flex-col lg:flex-row gap-4 ">

              {/* left side start */}
              <div className="px-2 flex flex-col  w-[100%] md:w-[20%] lg:w-[20%] ">
                <h2 className="text-lg font-bold text-white bg-[#7C4DFF] py-2 mb-3">Search Item</h2>
                <input type="text"  placeholder="Search Item" className="input input-bordered text-black w-full mb-8 bg-[#E1BEE7] " />
                <h2 className="text-lg font-bold text-white bg-[#7C4DFF] py-2 mb-3">Item Catagory</h2>
                <select value="" className="text-lg font-bold text-black bg-[#E1BEE7] py-2 mb-4 text-center" >
                  <option className="text-lg font-bold text-black bg-[#E1BEE7] py-2 mb-4 text-center">Computer</option>
                  <option className="text-lg font-bold text-black bg-[#E1BEE7] py-2 mb-4 text-center">Electric</option>
                  <option className="text-lg font-bold text-black bg-[#E1BEE7] py-2 mb-4 text-center">Miscellaneous</option>
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
           <td className="flex justify-center"> <input onChange={(e)=>handleInputData(e,item?._id)} type="text" name="demand" value={inputData[item?._id]?.demand} className="bg-white min-w-10 max-w-14 text-black rounded-sm" /> </td>
           <td><textarea onChange={(e)=>handleInputData(e,item?._id)} name="purpose" value={inputData?.purpose} id="" className="max-w-16 max-h-7 text-black rounded-sm focus:max-w-40   "></textarea></td>
           <td><button onClick={()=>handleSendData(item)} className=" px-2 py-1 rounded-md bg-[#4CAF50]">Send</button></td>
           
           </tr>
         </>)
      }
      
    </tbody>
  </table>
                </div>
                

                 {/* Middle side end */}

                 {/* Right side start */}

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
           // items?.map((item,index)=><>
           <tr className="lg:text-xl text-white  text-center">
           <th className=""></th>
           <td></td>
           <td className="flex text-center flex justify-center"><button className="text-xl bg-[#7C4DFF] px-3 ">-</button> <p className="bg-white min-w-10 max-w-14 text-black"></p> <button className="bg-[#7C4DFF] px-3">+</button></td>
           </tr>
         //</>)
      }
      
    </tbody>
  </table>
                </div>
                {/* Right side End */}

            </div>

        </section>
    );
};

export default Requisition;