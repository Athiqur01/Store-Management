import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { motion } from "framer-motion"
import useLoggedUser from "../useLoggedUser/useLoggedUser";
import { useEffect, useState } from "react";

const SRB = () => {
  const headingText = "SRB Item List";

    const {data:srbdata}=useQuery({
        queryKey:['srbdata'],
        queryFn:async()=>{
           const res=await axios.get('http://localhost:5012/srbdata')
            return res.data
        }
    })
    console.log('srbData',srbdata)

    //Pagenation start -------
    const [currentPage, setCurrentPage]=useState(0)
    const [paginationItem,setpaginationItem]=useState(null)
    const count =srbdata?.length // total item count for pagination
    console.log('srb data:', count)
    const itemsPerPage=15
    const totalPages=Math.ceil(count/itemsPerPage)
    const pages=[]
      for(let i=0; i<totalPages; i++){
        pages?.push(i)

         }
    console.log("pages",currentPage)

    useEffect(()=>{
      fetch(`http://localhost:5012/srbpage?page=${currentPage}&size=${itemsPerPage}`)
      .then(res=>res.json())
      .then(data=>setpaginationItem(data))
  }

  ,[currentPage,itemsPerPage])

 //Pagenation end -------

    const [loggedUser]=useLoggedUser()
    const userStatus=loggedUser?.status

    const generatePdf=()=>{
      const doc=new jsPDF()
      doc.text('SRB Item List', doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
      const tableColumn = [
          'No.',
          'Item Name',
          'Entry Date',
          'Amount (In)',
          'Ledger Serial No',
          'SRB Serial No',
          'Remarks',
        ];
        const tableRows = [];
        srbdata?.forEach((item, index) => {
          const itemData = [
            index + 1,
            item.itemName,
            item.entryDate,
            item.addItemData,
            item.ledgerSerialNo,
            item.srbSerialNo,   
          ];
          tableRows.push(itemData);
        });
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 20,
          styles: {
            halign: 'center', // Horizontal alignment of text (center)
            valign: 'middle', // Vertical alignment of text (middle)
          },
          headStyles: {
            fillColor: [0, 57, 107], // Set header background color
            textColor: [255, 255, 255], // Set header text color
            halign: 'center',
            valign: 'middle',
          },
          bodyStyles: {
            halign: 'center',
            valign: 'middle',
          },
        });
    
        doc.save('srb_item_list.pdf');      

  }

    return (
        <div className="flex flex-col justify-center">
     { (userStatus==='keeper' || userStatus==='admin')? <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20  ">
              

              <motion.h2
     className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8 "
    >
      {headingText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10,color: '#fffff' }}
          animate={{ opacity: 1, y: 0, color: '#03A9F4' }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            repeat: Infinity,           // Loop animation
            repeatType: "mirror",       // Alternate direction after each loop
            repeatDelay: 1              // Delay between loops
          }}
          style={{ display: 'inline-block', minWidth: char === " " ? "0.5em" : "auto" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>

            <table className="table   ">
              {/* head */}
             <thead className="">
             <tr className="text-sm md:text-base font-bold text-white text-center">
             <th className=""></th>
            
             <th className=" "> Item Name  </th>
             <th className=" "> Quantity (In) </th>
             <th className=" "> Ledger Serial No </th> 
             
             
             
             </tr>
             </thead>

             <tbody id="kepper-hidden">
    
{/* if user status is keeper and is checked is false */}           
        {
       paginationItem?.map((item,index)=><>
       <tr className="lg:text-xl text-white  text-center">
       <th className="">{(currentPage*itemsPerPage) + index+1}</th>
       
       <td>{item?.itemName}</td>
       <td>{item?.addItemData}</td>
       <td>{item?.ledgerSerialNo}</td>
       
       
       
       </tr>
     </>)
  }


  
</tbody>
</table>

<div><button onClick={generatePdf} className="text-xs md:text-base lg:text-base font-semibold px-3 py-2 mt-4 rounded-md bg-[#4CAF50]">Download</button></div>
  {/* Pagination button start */}
  <div className="flex justify-center">
 <div className='space-x-3 py-10 text-black text-xs md:text-base lg:text-base'>
            <button onClick={()=>currentPage>0 && setCurrentPage(currentPage-1)} className='px-3 py-1 border-red-50 border-2 bg-red-50 '>Prev</button>
                {pages.map(page=><>
                                   <button onClick={()=>{setCurrentPage(page)}} className={currentPage===page? 'px-3 py-1 border-red-50 border-2 bg-[#7C4DFF] text-white ' :'px-3 py-1 border-red-50 border-2 bg-red-50 '}>{page}</button>
                                </>)}
            <button onClick={()=>currentPage<pages?.length && setCurrentPage(currentPage+1)} className='px-3 py-1 border-red-50 border-2 bg-red-50 '>Next</button>
            
            </div>
 </div>
  {/* Pagination button end */}
</div> :<p className="text-white text-xl text-center">Warning: You are not allowed to access this section</p> }        
    </div>
    );
};

export default SRB;