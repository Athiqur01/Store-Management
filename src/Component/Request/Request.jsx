import { useQuery } from '@tanstack/react-query';
import request from '../../assets/Request.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Request = () => {

    //get operation to fetch all request from storekeeper
    

    const {data:storeKeeper}=useQuery({
        queryKey:['storeKeeper'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5012/storeKeeper')
            return res.data
        }
    })

    console.log('storekeeper',storeKeeper)
    return (
        <div className="py-10 md:py-16 lg:py-20">
            <h2 className="text-white font-bold text-2xl md:text-4xl lg:text-6xl pb-8 md:pb-12 lg:pb-14 text-center">All Request</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-4 lg:px-8">
       
       {
        storeKeeper?.map(item=><>
         <div className="card bg-base-100 image-full w-[full] shadow-sm">
  <figure>
    <img
      src={request}
      alt="Image is under process" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Requisition</h2>
    <p>Request From {item?.requisitionBy}</p>
    <div className="card-actions justify-end">
      <Link to={`/request/${item?._id}`}><button className="btn btn-primary">View Detail</button></Link>
    </div>
  </div>
</div>
        </>)
       }


        </div>
            
        </div>
    );
};

export default Request;