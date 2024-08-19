import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const AddItem = () => {


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = (itemInfo) => {
        const itemName=itemInfo?.itemName
        const description=itemInfo?.description
        const catagory= itemInfo?.catagory
        const quantity= itemInfo?.quantity
        const entryDate=itemInfo?.entryDate
        const storeLocation=itemInfo?.storeLocation
        const requisitedBy=''
        const storePassedBy=''
        const approvedBy=''
        const stage='one'
        
        const item={itemName, description, catagory, quantity, entryDate, storeLocation,requisitedBy,storePassedBy,approvedBy,stage
        }
       // post operation in items----
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
            }
        })

        // Post operation in srb

        axios.post('http://localhost:5012/srb',item)
        .then(res=>{
            console.log(res)
        })
       
        // Post operation in ledger

        axios.post('http://localhost:5012/ledger',item)
        .then(res=>{
            console.log(res)
        })
       
       
      }



    return (
        <section className="max-w-[1000px] mx-auto text-center py-6 md:py-8 lg:py-10">
            <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold pb-4 md:pb-10">Add Item</h2>
            <div className="border-white border-2 rounded-md mx-2">
                <form  onSubmit={handleSubmit(onSubmit)} action="" className="space-y-4 p-10 "   >
                <input type="text"  {...register("itemName", { required: true })} placeholder="Item Name" className="input input-bordered text-black w-full " />
                <textarea   id="" {...register("description", { required: true })} placeholder="Item's Description" className="w-full rounded-lg h-16 p-4 text-black"></textarea>
                <input type="text" {...register("catagory", { required: true })} placeholder="Catagory" className="input input-bordered text-black w-full " />
                <input type="text" {...register("quantity", { required: true })} placeholder="quantity" className="input input-bordered text-black w-full " />
                <input type="date" {...register("entryDate", { required: true })} placeholder="Entry Date" className="input input-bordered text-black w-full " />
                <input type="text" {...register("storeLocation", { required: true })} placeholder="Store Location" className="input input-bordered text-black w-full " />
                
                
                <button type="submit" className='px-4 py-2 bg-[#487DF0] rounded-md border border-2 border-transparent hover:border-[#FF00FF] transition duration-500 ease-in-out text-lg font-bold '>Save Item</button>
                </form>
                </div>
        </section>
    );
};

export default AddItem;