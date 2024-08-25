import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Demand from "../Demand/Demand";
import { removeItem } from "localforage";


const Requisition = () => {

    //Handle change input name
    //const [formData, setFormData] = useState({});

    const [inputData, setInputData]=useState({})
    const [colorData, setColorData]=useState({})
    const [isNum, setIsNum]=useState(true)
    const [colorId, setColorId]=useState(false)
    const [itemId, setItemId]=useState(null)
    const [searchTerm, setSearchTerm]=useState('')
    const [searchItem,setSearchItem]=useState(null)


    const handleSearchTerm=(e)=>{
      setSearchTerm(e.target.value)
     
    }

    useEffect(()=>{
      fetch(`http://localhost:5012/item?q=${searchTerm}`)
      .then(res=>res.json())
      .then(data=>setSearchItem(data))
  }
  ,[searchTerm])


    const handleInputData=(e,id,index)=>{
    const colorId=document.getElementById(`id${index}`)
    console.log('colorId',colorId)
      if(isNaN(parseInt (e.target.value))){
        setInputData('')  
        console.log('Insert a valid data')
        setIsNum(false)
        setColorId(colorId)
        colorId.classList.add('bg-red-500')
        setColorData({
          ...colorData,
              [id]: {
                  ...colorData[id],
                  [e.target.name]: e.target.value
                  
            }
        })
      }

      else{
        setInputData({
          ...inputData,
              [id]: {
                  ...inputData[id],
                  [e.target.name]: e.target.value
                  
            }
        })

        setColorData({
          ...colorData,
              [id]: {
                  ...colorData[id],
                  [e.target.name]: e.target.value
                  
            }
        })
        setIsNum(true)
        setColorId(colorId)
        colorId.classList.remove('bg-red-500')
        setItemId(id)
      }
      
      
      
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

      const demand=colorData[itemId]?.demand
      const purpose=colorData[itemId]?.purpose
      const length=colorData[itemId]?.demand?.length 
      const isNAN=isNaN(parseInt(demand))


      useEffect(()=>{
      
      if(length===0){
        colorId.classList.add('bg-white')
        colorId.classList.remove('bg-red-500')
      }
      
       else if(length>0 && isNAN===true){
        
        colorId.classList.remove('bg-white')
        colorId.classList.add('bg-red-500')
      }
      else if(length>0 && isNAN===false){
        
        colorId.classList.remove('bg-red-500')
        colorId.classList.add('bg-white')
      }

      },[colorData,colorId?.classList,itemId,isNAN,length])
     
    
      
    //LocalStorage data set and get-----
    const LocalStorageItem= JSON.parse(localStorage?.getItem('localData')) || []
    //const demand2=inputData[itemId]?.demand
    
    console.log('demand',demand,'purpose',purpose)
    const handleSendData=(item)=>{
    item.demand=demand
    item.purpose=purpose
    console.log('item-------',item)
    const isExist=LocalStorageItem.some(localItem=>localItem?._id===item?._id )
    if(!isExist){
      LocalStorageItem?.push(item)
      localStorage?.setItem('localData',JSON.stringify(LocalStorageItem) )
      
    }
   
    


      
     //Post operation in Requisition
        //  axios.post(`http://localhost:5012/requisition?q=${itemName}`,demandItemData)
        //  .then(res=>{
        //      console.log(res)
        //      if(res.data){
        //       Swal.fire({
        //           position: "top-end",
        //           icon: "success",
        //           title: "Requisition sent to the store keeper",
        //           showConfirmButton: false,
        //           timer: 2500
        //         });
        //   }
        //  })
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

    if(!items){
      return <p>Data is loading------</p>
    }

    //Sreach item-------
    

console.log('input data',inputData, 'color data', colorData)


    return (
        <section className=" mx-auto text-center py-6 md:py-8 lg:py-10">
            <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold pb-4 md:pb-10">Requisition</h2>

            <div className="flex flex-col lg:flex-row gap-4 ">

              {/* left side start */}
              <div className="px-2 flex flex-col mt-0 md:mt-11 lg:mt-11  w-[100%] md:w-[20%] lg:w-[20%] ">
                <h2 className="text-lg font-bold text-white bg-[#7C4DFF] py-2 mb-3">Search Item</h2>
                <input onChange={handleSearchTerm} type="text"  placeholder="Search Item" className="input input-bordered text-black w-full mb-8 bg-white " />
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
            searchTerm?.length>0 &&  searchItem?.map((item,index)=><>
            <tr className="lg:text-xl text-white  text-center">
            <th className="">{index+1}</th>
            <td>{item.itemName}</td>
            <td>{item.quantity}</td>
            <td className=""> <input id={`id${index}`} onChange={(e)=>handleInputData(e,item?._id,index)} type="text" name="demand" value={inputData[item?._id]?.demand } className=' min-w-10 max-w-14 text-black text-center rounded-sm '  /> </td>
            <td><textarea onChange={(e)=>handleInputData(e,item?._id,index)} name="purpose" value={inputData[item?._id]?.purpose} id="" className="max-w-16 max-h-7 text-black rounded-sm   "></textarea></td>
            <td><button onClick={()=>handleSendData(item)} className=" px-2 py-1 rounded-md bg-[#4CAF50]">Send</button></td>
            
            </tr>
          </>)   
      }

{
            searchTerm?.length==0 &&  items?.map((item,index)=><>
            <tr className="lg:text-xl text-white  text-center">
            <th className="">{index+1}</th>
            <td>{item.itemName}</td>
            <td>{item.quantity}</td>
            <td className=""> <input id={`id${index}`} onChange={(e)=>handleInputData(e,item?._id,index)} type="text" name="demand" value={colorData[item?._id]?.demand } className=' min-w-10 max-w-12 text-black text-center rounded-sm '  /> </td>
            <td className=""><textarea onChange={(e)=>handleInputData(e,item?._id,index)} name="purpose" value={colorData[item?._id]?.purpose || ""} id="" className="max-w-12 max-h-5 md:max-h-7 lg:max-h-7 text-black rounded-sm   "></textarea></td>
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