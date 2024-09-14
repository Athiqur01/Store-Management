import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
    const {user}=useContext(AuthContext)
    const axiosSecure=useAxiosSecure()
    const {data:isAdmin, isPending:isAdminLoading, isLoading}=useQuery({
        queryKey:[user?.email, 'isAdmin'],
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/adminuser/${user?.email}`)
            return res.data?.admin
        }
    })
    return [isAdmin,isAdminLoading, isLoading]
};

export default useAdmin;