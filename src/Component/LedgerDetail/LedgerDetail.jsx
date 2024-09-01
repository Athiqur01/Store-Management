import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";


const LedgerDetail = () => {

    const {name}=useParams()
    const decodedName=decodeURIComponent(name)
    console.log('name:',name, decodedName)

    const {data:ledgerDetail}=useQuery({
        queryKey:['ledgerDetail'],
        queryFn:async ()=>{
        const res=await axios.get(`http://localhost:5012/ledgerdetail?q=${decodedName}`)
        return res.data
        }
    })

    console.log('ledgerData:', ledgerDetail)

    return (
        <div>
            <h2>hello</h2>
            
        </div>
    );
};

export default LedgerDetail;