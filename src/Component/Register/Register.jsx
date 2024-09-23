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
    const [imageFile, setImageFile] = useState(null);  // Store the selected profile image file
    const [signatureFile, setSignatureFile] = useState(null); // Store the selected signature file
    const { createUser, setLoading } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Handle profile image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    // Handle signature image selection
    const handleSignatureChange = (e) => {
        const file = e.target.files[0];
        setSignatureFile(file);
    };

    const onSubmit = async (data) => {
        const { designation, email, name, password } = data;
        const status = 'user';

        // Step 1: Upload profile image to ImageBB
        const formDataProfile = new FormData();
        formDataProfile.append('image', imageFile);

        // Step 2: Upload signature image to ImageBB
        const formDataSignature = new FormData();
        formDataSignature.append('image', signatureFile);

        try {
            // Upload profile image
            const profileUploadResponse = await axios.post(
                `https://api.imgbb.com/1/upload?key=f84a4a370f5d7c6ed8cd4d1d20d96740`,
                formDataProfile
            );

            // Upload signature image
            const signatureUploadResponse = await axios.post(
                `https://api.imgbb.com/1/upload?key=f84a4a370f5d7c6ed8cd4d1d20d96740`,
                formDataSignature
            );

            // Get URLs of uploaded images
            const profileImageUrl = profileUploadResponse.data.data.url;
            const signatureImageUrl = signatureUploadResponse.data.data.url;

            // Prepare user data with both image URLs
            const userData = { 
                designation, 
                email, 
                name, 
                status, 
                imageUrl: profileImageUrl,  // Profile image URL
                signatureUrl: signatureImageUrl  // Signature image URL
            };

            // Step 3: Create user with Firebase Authentication
            const result = await createUser(email, password);
            if (result.user) {
                // Step 4: Store user data in MongoDB
                const response = await axios.post("http://localhost:5012/user", userData);
                if (response.data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "To verify the email, please check your email",
                        showConfirmButton: true,
                    });
                    await sendEmailVerification(result.user);
                    console.log('Please check your email');
                }
            }
        } catch (error) {
            console.error("Error during registration:", error);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.message,
            });
        }
    };

    // Show/hide password functionality
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="pb-10 md:pb-14 lg:pb-20">
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-center font-bold text-white py-6 md:py-14 lg:py-16">Register</h2>

            <div className="flex flex-col md:flex-row lg:flex-row px-2 md:px-6 lg:px-8">
                <div className="w-full md:w-3/2 lg:w-w-3/7 px-2 text-center flex justify-center items-center">
                    <img className="rounded-md" src={image} alt="" />
                </div>

                <div className='lg:w-1/7 px-2 md:px-6 lg:px-8'>
                    <p className='w-[2px] h-full bg-slate-50 hidden md:block lg:block py-8'></p>
                </div>

                {/* Contact form */}
                <div className="w-full md:w-3/2 lg:w-w-3/7 text-center flex justify-center items-center py-10 md:py-6 lg:py-4">
                    <div className="border-white border-2 rounded-md px-2 md:px-6 lg:px-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-10">
                          {/* Your Name */}
                          <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                {...register("name", { required: true })}
                                className="input input-bordered text-black w-full"
                            />
                            {/* Designation */}
                            <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Your Designation</label>
                            <input
                                type="text"
                                name="designation"
                                {...register("designation", { required: true })}
                                placeholder="Your Designation"
                                className="input input-bordered text-black w-full"
                            />
                            {/* Email--- */}
                            <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Email</label>
                            <input
                                type="text"
                                name="email"
                                {...register("email", { required: true })}
                                placeholder="Your Email"
                                className="input input-bordered text-black w-full"
                            />

                            {/* Password input */}
                            <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Password</label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    onClick={handleShowPassword}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Your Password"
                                    {...register("password", { required: true })}
                                    className="grow"
                                />
                                <span className="text-2xl">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                            </label>

                            {/* Profile Image Upload */}
                            <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Profile Picture</label>
                            
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                className="input input-bordered text-black w-full"
                                
                            />

                            {/* Signature Image Upload */}
                            <label htmlFor="" className="text-[#03A9F4] text-left font-bold text-xl flex justify-start">Signature Image</label>
                            <input
                                type="file"
                                name="signature"
                                onChange={handleSignatureChange}
                                className="input input-bordered text-black w-full"
                            />

                            <button type="submit" className="text-white px-4 py-2 w-full bg-[#4CAF50] rounded-md border border-transparent hover:border-[#FF00FF] transition duration-500 ease-in-out text-lg font-bold">
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
