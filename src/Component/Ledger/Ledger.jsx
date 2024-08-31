import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Ledger = () => {

    const {data:ledgerData}=useQuery({
        queryKey:['ledgerData'],
        queryFn:async()=>{
        const res=await axios.get('http://localhost:5012/ledgerdata')
        return res.data
        }
    })
    console.log('ledger data:',ledgerData)

    return (
        <div>
            <h2>hello</h2>
            
        </div>
    );
};

export default Ledger;