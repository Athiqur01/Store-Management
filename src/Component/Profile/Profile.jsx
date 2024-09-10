import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";


const Profile = () => {
    
    const {user}=useContext(AuthContext)
    const {data:loggedUser}=useQuery({
        queryKey:['loggedUser',user?.email],
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
    console.log('user',loggedUser)

    return (
        <div className=" px-20 flex justify-center pt-4 md:pt-6 lg:pt-6">
            <div>
            <p className="flex justify-start gap-4  lg:text-xl" ><h2 className="font-bold">Name:</h2><h3>{loggedUser?.name}</h3></p>
            <p className="flex justify-start gap-4  lg:text-xl" ><h2 className="font-bold">Designation:</h2><h3>{loggedUser?.designation}</h3></p>
            <p className="flex justify-start gap-4  lg:text-xl" ><h2 className="font-bold">Email:</h2><h3>{loggedUser?.email}</h3></p>
            <p className="flex justify-start gap-4  lg:text-xl" ><h2 className="font-bold">User Status:</h2><h3>{loggedUser?.status}</h3></p>
            
            </div>
        </div>
    );
};

export default Profile;