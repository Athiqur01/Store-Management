import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import image from '../../assets/register.png'
import { useContext } from "react";
import AuthProvider, { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";


const Register = () => {

    const {createUser,setLoading}=useContext(AuthContext)
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
        
      const {designation, email, name ,password}=data
      const status='user'
      const userData={designation, email, name, status}
      createUser(email,password)
      .then(result=>{
        if(result.user){   
            axios.post("http://localhost:5012/user",userData)
            .then(res=>{
              console.log(res.data)
              if(res.data.insertedId){
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Register is successful",
                    showConfirmButton: false,
                    timer: 3500
                  });
      
              }
            })
      
      }
      })
        
        
      }



    return (
        <div className="pb-10 md:pb-14 lg:pb-20">
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-center font-bold text-white py-6 md:py-14 lg:py-16">Register</h2>

            <div className="flex flex-col md:flex-row lg:flex-row">
                <div  className="w-full md:w-3/2 lg:w-w-3/7 px-2 text-center flex justify-center items-center">
                <img className="rounded-md" src={image} alt="" />
                </div>

                <div className='lg:w-1/7'>
                <p className='w-[2px] h-full bg-slate-50 hidden md:block lg:block py-8'></p>
                </div>
                 
                 

                 {/* Contact form */}
                <div 
                className="w-full md:w-3/2 lg:w-w-3/7 text-center flex justify-center items-center px-2 md:px-10 lg:px-14 py-10 md:py-6 lg:py-4"
                 >
                    
                <div className="border-white border-2 rounded-md px-2 md:px-6 lg:px-8">
                <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-4  p-10 "   >
                <input type="text" name='name' placeholder="Your Name" {...register("name", { required: true })} className="input input-bordered text-black w-full " />
                <input type="text" name='Designation' {...register("designation", { required: true })} placeholder="Your Designation" className="input input-bordered text-black w-full " />
               
                
                <input type="text" name='email' {...register("email", { required: true })} placeholder="Your Email" className="input input-bordered text-black w-full " />
                <input type="password" name="password" {...register("password", { required: true })} placeholder="Your Password" className="input input-bordered text-black w-full " />
                <button type="submit" className='text-white px-4 py-2 bg-[#4CAF50] rounded-md border border-2 border-transparent hover:border-[#FF00FF] transition duration-500 ease-in-out text-lg font-bold '>Submit</button>
                </form>
                <p className="pb-6 text-white">if  registered, please <span className="text-blue-300 font-bold"><Link to='/login'>Login</Link></span></p>
                
                </div>
                </div>
            </div>
        </div>
    );
};

export default Register;