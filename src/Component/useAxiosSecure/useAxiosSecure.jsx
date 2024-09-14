import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const axiosSecure=axios.create({
    baseURL:'http://localhost:5012'
})
const useAxiosSecure = () => {
  const {logOut}=useContext(AuthContext)
    const navigate=useNavigate()
    axiosSecure.interceptors.request.use(function (config) {
        const token=localStorage.getItem('access_token')
        config.headers.authorization=`Bearer ${token}`
        console.log('requst stopped by the interceptors')
        // Do something before request is sent
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

      axiosSecure.interceptors.response.use(function(response){
       return response
      }, async(error)=>{
        const errorStatus=error.response.status
        if(errorStatus===401 || errorStatus===403){
         await logOut()

         setTimeout(() => {
          navigate('/login');
       }, 0);
        }
        console.log('interceptor error',error.response.status)
        return Promise.reject(error);
      })

    return axiosSecure
};

export default useAxiosSecure;