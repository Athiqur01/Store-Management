import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { motion } from "framer-motion"



const AddItem = () => {
    const headingText = "Add Item";
    const {user}=useContext(AuthContext)
    //const {count}=useLoaderData()
    const [errorMessage, setErrorMessage]=useState(false)
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

    //count item from item collection to set ledger serial no
    const {data:ledgerSerial, refetch}=useQuery({
        queryKey:['ledgerSerial'],
        queryFn:async ()=>{
            const res=await axios.get('http://localhost:5012/count')
            return res.data
        }
    })
 
    console.log('ledgerSerial:', ledgerSerial)

  // count srb serial no number----
  const {data:srbSerial}=useQuery({
  queryKey:['srbSerial'],
  queryFn:async ()=>{
      const res=await axios.get('http://localhost:5012/srb/count')
      console.log(res.data)
      return res.data   
  }
})

    
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const onSubmit = (itemInfo) => {
        const itemName=itemInfo?.itemName
        const description=itemInfo?.description
        const catagory= itemInfo?.category
        const quantity= itemInfo?.quantity
        const balance= itemInfo?.quantity
        const addItemData= itemInfo?.quantity
        const storeLocation=itemInfo?.storeLocation
        const addedBy=loggedUser?.name || ''
        
        const ledgerSerialNo=parseInt(ledgerSerial?.totalItems)+1
        const entryDate= new Date().toISOString().split('T')[0];
        const {totalItems}=srbSerial
        const srbSerialNo=parseInt(totalItems)+1

        const parseQuantity=parseInt(quantity)
        const isNAN=isNaN(parseQuantity)
       
        
        const item={itemName, description, catagory, quantity, storeLocation,ledgerSerialNo
        }

        const itemSrb={itemName, description, catagory, quantity, storeLocation,ledgerSerialNo,addedBy,entryDate
        }
        const itemLedger={itemName, description, catagory,addItemData, balance, storeLocation,ledgerSerialNo,addedBy,entryDate,srbSerialNo
        }
        console.log('ledger',itemLedger)

        if(!isNAN){
          //  post operation in items collection----
        axios.post('http://localhost:5012/addItem',item)
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
        })


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
            reset()
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

        else{
          setErrorMessage(true)
        }
        
       
      }


      if(!loggedUser || !ledgerSerial){
        return <div className="flex justify-center"><span className="loading loading-ring loading-lg"></span></div>
       }


    



    return (
        <section className="max-w-[1000px] mx-auto text-center py-6 md:py-8 lg:py-10">
                    
    <motion.h2
      className="text-white text-3xl md:text-4xl lg:text-6xl font-bold pb-4 md:pb-10"
    >
      {headingText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10,color: '#FFFFFF' }}
          animate={{ opacity: 1, y: 0, color: '#03A9F4' }}
          transition={{
            duration: 0.2,
            delay: index * 0.1,
            repeat: Infinity,           // Loop animation
            repeatType: "mirror",       // Alternate direction after each loop
            repeatDelay: 1              // Delay between loops
          }}
          style={{ display: 'inline-block', minWidth: char === " " ? "0.5em" : "auto" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>

            <div className="border-white border-2 rounded-md mx-2">
                <form  onSubmit={handleSubmit(onSubmit)} action="" className="space-y-4 p-10 "   >
                <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Item Name</label>
                <input type="text"  {...register("itemName", { required: true })} placeholder="Item Name" className="input input-bordered text-black w-full hover:scale-105 transition duration-300 ease-in-out" required />
                
                <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Item Catagory</label>
                 <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <select {...field} className="input input-bordered text-black w-full hover:scale-105 transition duration-300 ease-in-out">
                <option value="">Select a category</option>
                <option value="computer">Computer</option>
                <option value="electric">Electric</option>
                <option value="stationary">Stationary</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>
            )}
          />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Item Quantity</label>
                <input type="text" {...register("quantity", { required: true })} placeholder="quantity" className="input input-bordered text-black w-full hover:scale-105 transition duration-300 ease-in-out " />

                {errorMessage && (
                    <p className="text-red-300">
                      <br />
                      insert a number
                    </p>
                  )}

                <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Store Name</label>
                <Controller
                      name="storeLocation"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Store Location is required' }}
                      render={({ field }) => (
                        <select {...field} className="input input-bordered text-black w-full hover:scale-105 transition duration-300 ease-in-out">
                          <option value="">Select a Store Location</option>
                          <option value="generalStore">General Store</option>
                          <option value="electricStore">Technical Store</option>
                        </select>
                      )}
                    />
                    {errors.storeLocation && <p className="text-red-500">{errors.storeLocation.message}</p>}

                    <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Item Description</label>
                <textarea   id="" {...register("description", { required: true })} placeholder=" Description like brand, model etc." className="w-full rounded-lg h-16 p-4 text-black hover:scale-105 transition duration-300 ease-in-out"></textarea>
                        
                <button type="submit" className='px-4 py-2 bg-[#03A9F4] text-white rounded-md  border-2 border-transparent hover:border-[#FF00FF] transition duration-500 ease-in-out text-lg font-bold hover:scale-110 '>Save Item</button>
                </form>
                </div>
        </section>
    );
};

export default AddItem;