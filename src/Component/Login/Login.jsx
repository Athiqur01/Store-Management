import { Link, useNavigate } from "react-router-dom";
import image from '../../assets/log.jpeg'
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

const {loginUser,setUser,user}=useContext(AuthContext)
const navigate=useNavigate()
const [showPassword, setShowPassword]=useState(false)
 console.log('user',user)   
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const {email,password}=data
    console.log(data)
    loginUser(email,password)
    .then(result=>{
        console.log(result.user)
        setUser(result.user)
        if(result.user){
        
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Login successful",
            showConfirmButton: false,
            timer: 3500
          })
          navigate('/')
        }
    })
  }

  const handleShowPassword=()=>{
    setShowPassword(!showPassword)
  }

  console.log('pass',showPassword)
    return (
        <div className="pb-10 md:pb-14 lg:pb-20">
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-center font-bold text-white py-6 md:py-14 lg:py-16">Login</h2>

            <div className="flex flex-col md:flex-row lg:flex-row">
            <div  className="w-full md:w-3/2 lg:w-w-3/7 px-2 text-center flex justify-center items-center">
                <img className="rounded-md max-h-[500px]" src={image} alt="" />
                </div>

                <div className='lg:w-1/7'>
                <p className='w-[2px] h-full bg-slate-50 hidden md:block lg:block py-8'></p>
                </div>
                 
                 

                 {/* Contact form */}
                <div 
                className="w-full md:w-3/2 lg:w-w-3/7 text-center flex justify-center items-center px-2 md:px-10 lg:px-14 py-10 md:py-6 lg:py-4"
                 >
                    
                <div className="border-white border-2 rounded-md px-2 md:px-6 lg:px-8">
                <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-4 px-10 pt-10 "   >
               <label htmlFor=""> <input type="text" name='email' placeholder="Your Email" {...register("email", { required: true })} className="input input-bordered text-black w-full " /></label>

                

                <label className="input input-bordered flex items-center gap-2">
                <input onClick={handleShowPassword} type={showPassword? 'text':'password'} name="password" placeholder="Your Password" {...register("password", { required: true })} className="grow" />
                <span className="text-2xl">{showPassword? <FaEyeSlash />:<FaEye />} </span>
                </label>


                <label htmlFor="">
                <button type="submit" className='px-4 py-2 mt-6 mb-3 text-white bg-[#4CAF50] rounded-md border-2 border-transparent hover:border-[#FF00FF] transition duration-500 ease-in-out text-lg font-bold '>Submit</button>
                </label>
                </form>
                <p className="pb-6 text-white">if not registered, please <span className="text-blue-300 font-bold"><Link to='/register'>Register</Link></span></p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;