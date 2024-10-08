import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import image from '../../assets/register.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { sendEmailVerification } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setLoading } = useContext(AuthContext);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imageUrl, setImageUrl] = useState('');

  // Image upload handler
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=your_imgbb_api_key`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data.url; // Returning the image URL
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const { designation, email, name, password, image } = data;
    const status = 'user';
    const userData = { designation, email, name, status };

    try {
      // Upload image
      const imageUploadUrl = await uploadImage(image[0]);

      if (imageUploadUrl) {
        userData.profileImage = imageUploadUrl; // Attach image URL to user data
      }

      createUser(email, password)
        .then((result) => {
          if (result.user) {
            axios.post("http://localhost:5012/user", userData)
              .then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "To verify the email. please check your email ",
                    showConfirmButton: true,
                  });
                }
              });

            sendEmailVerification(result?.user)
              .then(() => {
                console.log('Email verification sent');
              });
          }
        });

      reset(); // Reset the form after submission
    } catch (error) {
      console.error('Error registering the user:', error);
    }
  };

  // Show password toggle
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pb-10 md:pb-14 lg:pb-20">
      <h2 className="text-4xl md:text-6xl lg:text-7xl text-center font-bold text-white py-6 md:py-14 lg:py-16">
        Register
      </h2>

      <div className="flex flex-col md:flex-row lg:flex-row">
        <div className="w-full md:w-3/2 lg:w-w-3/7 px-2 text-center flex justify-center items-center">
          <img className="rounded-md" src={image} alt="" />
        </div>

        <div className='lg:w-1/7'>
          <p className='w-[2px] h-full bg-slate-50 hidden md:block lg:block py-8'></p>
        </div>

        <div className="w-full md:w-3/2 lg:w-w-3/7 text-center flex justify-center items-center px-2 md:px-10 lg:px-14 py-10 md:py-6 lg:py-4">
          <div className="border-white border-2 rounded-md px-2 md:px-6 lg:px-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-10">
              <input
                type="text"
                name='name'
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="input input-bordered text-black w-full"
              />
              <input
                type="text"
                name='designation'
                {...register("designation", { required: true })}
                placeholder="Your Designation"
                className="input input-bordered text-black w-full"
              />
              
              <input
                type="text"
                name='email'
                {...register("email", { required: true })}
                placeholder="Your Email"
                className="input input-bordered text-black w-full"
              />
              
              {/* Image upload field */}
              <input
                type="file"
                name='image'
                {...register("image", { required: true })}
                className="input input-bordered text-black w-full"
              />
              {errors.image && <p className="text-red-500">Image is required</p>}
              
              {/* Password input */}
              <label className="input input-bordered flex items-center gap-2">
                <input
                  onClick={handleShowPassword}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Your Password"
                  {...register("password", { required: true })}
                  className="grow"
                />
                <span className="text-2xl">{showPassword ? <FaEyeSlash /> : <FaEye />} </span>
              </label>

              <button
                type="submit"
                className='text-white px-4 py-2 w-full bg-[#4CAF50] rounded-md border border-transparent hover:border-[#FF00FF] transition duration-500 ease-in-out text-lg font-bold'>
                Submit
              </button>
            </form>

            <p className="pb-10 pt-6 text-white">
              If registered, please <span className="text-blue-300 font-bold"><Link to='/login'>Login</Link></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
