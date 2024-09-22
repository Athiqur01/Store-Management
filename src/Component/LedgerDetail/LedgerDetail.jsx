import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import useLoggedUser from "../useLoggedUser/useLoggedUser";


const LedgerDetail = () => {

    const {name}=useParams()
    const [loggedUser]=useLoggedUser()
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

    const generatePdf=()=>{
      const doc=new jsPDF()
      
      const startY = 20;
    
      // Adding header text
      doc.text("People's Republic of Bangladesh", doc.internal.pageSize.getWidth() / 2, startY, { align: 'center' });
      doc.text('Bangladesh Betar, Mymensingh', doc.internal.pageSize.getWidth() / 2, startY + 7, { align: 'center' });
      doc.text(decodedName, doc.internal.pageSize.getWidth() / 2, startY + 18, { align: 'center' });
      doc.text('______________________', doc.internal.pageSize.getWidth() / 2, startY + 20, { align: 'center' });
      const tableColumn = [
          'No.',
          'Entry Date', 
          'Amount (In)',
          'Srb Serial No',
          'Exit Date',
          'Amount (Out)',
          'Sib Serial No',
          'Balance',
          'Remarks',
        ];
        const tableRows = [];
        ledgerDetail?.forEach((item, index) => {
          const itemData = [
            index + 1,
            item?.entryDate,
            item?.addItemData,
            item?.srbSerialNo,
            item?.approvalDate,  
            item?.demand,
            item?.sibSerialNo,
            item?.balance,
            
          ];
          tableRows.push(itemData);
        });

        // Create the table
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 45,
        styles: {
          halign: 'center', // Horizontal alignment of text (center)
          valign: 'middle', // Vertical alignment of text (middle)
          lineWidth: 0.2, // Border thickness for the cells
        },
        headStyles: {
          fillColor: [0, 0, 0], // Black background for header
          textColor: [255, 255, 255], // White text for header
          halign: 'center',
          valign: 'middle',
          lineWidth: 0.5, // Thicker border for header
        },
        bodyStyles: {
          fillColor: [255, 255, 255], // White background for all rows
          textColor: [0, 0, 0], // Black text
          halign: 'center',
          valign: 'middle',
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255], // Force alternate rows to have a white background too
        },
        tableLineWidth: 0.2, // Line width of the border
        tableLineColor: [0, 0, 0], // Border color (black)
      })

       // Adding page numbers
       const totalPages = doc.internal.getNumberOfPages();
       for (let i = 1; i <= totalPages; i++) {
         doc.setPage(i); // Go to the page
         const pageWidth = doc.internal.pageSize.getWidth(); // Get the width of the page
         const pageHeight = doc.internal.pageSize.getHeight(); // Get the height of the page
         doc.text(`Page- ${i} `, pageWidth / 2, pageHeight - 10, { align: 'center' }); // Add page number at the bottom
       }
    
        doc.save('ledger.pdf');      

  }

  if(!loggedUser){
    return <p className="flex justify-center"><span className="loading loading-ring loading-lg"></span></p>
  }

    return (
        <div className="flex flex-col justify-center">
        <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20  ">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8 ">{decodedName}</h2>
            <table className="table   ">
              {/* head */}
             <thead className="">
             <tr className="text-sm md:text-base font-bold text-white text-center">
             <th className=""></th>
            
             <th className=" ">Entry Date</th>
             <th className=" ">Exit Date</th>
             <th className=" ">Amount <br /> (In)</th> 
             <th className=" ">Amount <br /> (Out)</th>
             <th className=" ">Balance</th>
             
             
             </tr>
             </thead>

             <tbody id="kepper-hidden">
    
{/* if user status is keeper and is checked is false */}           
        {
       ledgerDetail?.map((item,index)=><>
       <tr className="lg:text-xl text-white  text-center">
       <th className="">{index+1}</th>
       
       <td>{item?.entryDate}</td>
       <td>{item?.approvalDate}</td>
       <td>{item?.addItemData}</td>
       <td>{item?.demand}</td>
       <td>{item?.balance}</td>
       
       
       
       </tr>
     </>)
  }


  
</tbody>
</table>
<button onClick={generatePdf} className="font-semibold px-3 py-2 mt-4 rounded-md bg-[#4CAF50] hover:scale-110 transition duration-300 ease-in-out">Download</button>
</div>

            
    </div>
    );
};

export default LedgerDetail;