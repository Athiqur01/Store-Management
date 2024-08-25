import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";


const AddItem = () => {

    const {user}=useContext(AuthContext)
    //const {count}=useLoaderData()
    
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
    const {data:ledgerSerial}=useQuery({
        queryKey:['ledgerSerial'],
        queryFn:async ()=>{
            const res=await axios.get('http://localhost:5012/count')
            return res.data
        }
    })
 
    console.log('ledgerSerial:', ledgerSerial)
    
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (itemInfo) => {
        const itemName=itemInfo?.itemName
        const description=itemInfo?.description
        const catagory= itemInfo?.category
        const quantity= itemInfo?.quantity
        const entryDate= new Date().toISOString().split('T')[0];
        const storeLocation=itemInfo?.storeLocation
        const requisitedBy=loggedUser?.name || ''
        const storePassedBy=''
        const approvedBy=''
        const stage='one'
        
        const item={itemName, description, catagory, quantity, storeLocation,requisitedBy,storePassedBy,approvedBy,stage
        }
        console.log(item)
       // post operation in items----
        // axios.post('http://localhost:5012/addItem',item)
        // .then(res=>{
        //     if(res.data){
        //         Swal.fire({
        //             position: "top-end",
        //             icon: "success",
        //             title: "Item added successfully",
        //             showConfirmButton: false,
        //             timer: 2500
        //           });
        //     }
        // })

        // Post operation in srb

        // axios.post('http://localhost:5012/srb',item)
        // .then(res=>{
        //     console.log(res)
        // })
       
        // Post operation in ledger

        // axios.post('http://localhost:5012/ledger',item)
        // .then(res=>{
        //     console.log(res)
        // })
       
       
      }

      if(!loggedUser){
        return <div className="flex justify-center"><span className="loading loading-ring loading-lg"></span></div>
    }
    



    return (
        <section className="max-w-[1000px] mx-auto text-center py-6 md:py-8 lg:py-10">
            <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold pb-4 md:pb-10">Add Item</h2>
            <div className="border-white border-2 rounded-md mx-2">
                <form  onSubmit={handleSubmit(onSubmit)} action="" className="space-y-4 p-10 "   >
                <input type="text"  {...register("itemName", { required: true })} placeholder="Item Name" className="input input-bordered text-black w-full " required />
                <textarea   id="" {...register("description", { required: true })} placeholder="Item's Description" className="w-full rounded-lg h-16 p-4 text-black"></textarea>
                 <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <select {...field} className="input input-bordered text-black w-full">
                <option value="">Select a category</option>
                <option value="computer">Computer</option>
                <option value="electric">Electric</option>
                <option value="stationary">Stationary</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>
            )}
          />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                <input type="text" {...register("quantity", { required: true })} placeholder="quantity" className="input input-bordered text-black w-full " />
                
                <Controller
                      name="storeLocation"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Store Location is required' }}
                      render={({ field }) => (
                        <select {...field} className="input input-bordered text-black w-full">
                          <option value="">Select a Store Location</option>
                          <option value="generalStore">General Store</option>
                          <option value="electricStore">Technical Store</option>
                        </select>
                      )}
                    />
                    {errors.storeLocation && <p className="text-red-500">{errors.storeLocation.message}</p>}
                        
                <button type="submit" className='px-4 py-2 bg-[#487DF0] rounded-md  border-2 border-transparent hover:border-[#FF00FF] transition duration-500 ease-in-out text-lg font-bold '>Save Item</button>
                </form>
                </div>
        </section>
    );
};

export default AddItem;