import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useLoggedUser = () => {
    const {user}=useContext(AuthContext)
   
    
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
    return [loggedUser]
};

export default useLoggedUser;