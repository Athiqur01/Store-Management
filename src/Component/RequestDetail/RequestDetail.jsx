import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";


const RequestDetail = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    // Fetch data using useQuery
    const { data: detailData } = useQuery({
        queryKey: ['detailData', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5012/storeKeeper?id=${id}`);
            return res.data;
        }
    });

    // Check if detailData is defined and is an array
    if (!detailData || !Array.isArray(detailData)) {
        return <div>Loading or no data available...</div>;
    }

    // Assuming the first item in detailData contains the requisiteData array
    const dataaa = detailData[0];
    const view = dataaa?.requisiteData;

    console.log('view detail', view);
   

    return (
        <div className="flex flex-col justify-center">
            <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20  ">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8 ">All Items</h2>
                <table className="table   ">
                  {/* head */}
                 <thead className="">
                 <tr className="text-sm md:text-base font-bold text-white text-center">
                 <th className=""></th>
                 <th>Item Name </th>
                 <th className=" "> Stock </th>
                 <th className=" "> Demand </th>
                 <th className=" ">Purpose  </th>
                 
                 </tr>
                 </thead>

                 <tbody>
        
                {/* row  */}
            {/* {
                detailData?.map(retrivedData=><>
                <ul>
                    {
                        retrivedData?.map((item,index)=><>
                            <tr className="lg:text-xl text-white  text-center">
                            <th className="">{index+1}</th>
                            <td>{item?.itemName}</td>
                            <td>{item?.quantity}</td>
                            <td className="flex text-center flex justify-center"><button className="text-xl bg-[#7C4DFF] px-3 w-10 ">-</button> <p className="bg-white min-w-10 max-w-14 text-black">{item?.demand}</p> <button className="bg-[#7C4DFF] px-3 w-10">+</button></td>
                            <td><p className="max-w-16 max-h-7 text-white text-center  ">{item?.purpose}</p></td>
                            
                            
                            </tr>
                          </>)
                    }
                </ul>
                </>)
            } */}



            {
            view?.map((item,index)=><>
           <tr className="lg:text-xl text-white  text-center">
           <th className="">{index+1}</th>
           <td>{item?.itemName}</td>
           <td>{item?.quantity}</td>
           <td className="flex text-center flex justify-center"><button className="text-xl bg-[#7C4DFF] px-3 w-10 ">-</button> <p className="bg-white min-w-10 max-w-14 text-black">{item?.demand}</p> <button className="bg-[#7C4DFF] px-3 w-10">+</button></td>
           <td><p className="max-w-16 max-h-7 text-white text-center  ">{item?.purpose}</p></td>
           
           
           </tr>
         </>)
      }
      
    </tbody>
  </table>
  <div className="flex justify-center"><button className=" px-3 md:px-4 lg:px-4 py-1 md:py-2 lg:py-2 text-base md:text-lg lg:text-lg mt-4 md:mt-6 lg:mt-6 text-white font-bold rounded-md bg-[#4CAF50]">Send To RE</button></div>
                </div>
                
        </div>
                
    );
};

export default RequestDetail;