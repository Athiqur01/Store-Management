import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import 'jspdf-autotable';


const DownloadRequisition = () => {

    const {id}=useParams()
    console.log('id', id)

    const {data:download}=useQuery(({
        queryKey:['download'],
        queryFn:async()=>{
        const res=axios.get(`http://localhost:5012/requisitiondownload/${id}`)
        return (await res).data

        }
    }))
     
    
    
   // const {itemName,demand,purpose}=downloadData
   const approvalDate=download?.registerData?.approvalDate
   const approvedBy=download?.registerData?.approvedBy
   const approverDesignation=download?.registerData?.approverDesignation
   const demanderDesignation=download?.registerData?.demanderDesignation
   const requisitionBy=download?.registerData?.requisitionBy


   const downloadData=download?.registerData?.view
   console.log('ittt',downloadData)
   console.log('daaaaaa',requisitionBy )

   const generatePdf = () => {
    const doc = new jsPDF();
    const startY = 20;
  
    // Adding header text
    doc.text("People's Republic of Bangladesh", doc.internal.pageSize.getWidth() / 2, startY, { align: 'center' });
    doc.text('Bangladesh Betar, Mymensingh', doc.internal.pageSize.getWidth() / 2, startY + 7, { align: 'center' });
    doc.text('Requisition', doc.internal.pageSize.getWidth() / 2, startY + 22, { align: 'center' });
    doc.text('____________', doc.internal.pageSize.getWidth() / 2, startY + 24, { align: 'center' });
  
    // Table columns and data
    const tableColumn = ['No.', 'Item Name', 'Demand', 'Purpose'];
    const tableRows = [];
  
    downloadData?.forEach((item, index) => {
      const itemData = [
        index + 1, // No.
        item.itemName, // Item Name
        item.demand, // Demand
        item.purpose, // Purpose
      ];
      tableRows.push(itemData);
    });
  
    // First table with white background for all rows
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 52,
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
    });
  
    const finalY = doc.lastAutoTable.finalY;
  
    // Second table data
    const secondTableRows = [];
  
    const firstColumnData = [
      [
        requisitionBy, // First line: Name
        demanderDesignation, // Second line: Designation
        '________________________',
        'Requisition By', // Label
      ].join('\n'),
    ];
  
    const secondColumnData = [
      [
        approvedBy, // First line: Name
        approverDesignation, // Second line: Designation
        approvalDate,
        '_______________________',
        'Approver', // Label
      ].join('\n'),
    ];
  
    secondTableRows.push([firstColumnData, secondColumnData]);
  
    // Second table with no special styles
    doc.autoTable({
      body: secondTableRows,
      startY: finalY + 20,
      styles: {
        halign: 'center', // Horizontal alignment of text (center)
        valign: 'middle', // Vertical alignment of text (middle)
      },
      bodyStyles: {
        halign: 'center',
        valign: 'middle',
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], // Force alternate rows to have a white background too
      },
    });
  
    doc.save('Requisition.pdf');
  };
  

    return (
        <div className="flex flex-col justify-center">
        <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20  ">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8 ">Requisition</h2>
            <table className="table   ">
              {/* head */}
             <thead className="">
             <tr className="text-sm md:text-base font-bold text-white text-center">
             <th className=""></th>
            
             <th className=" "> Item Name  </th>
             <th className=" "> Amount </th>
             <th className=" "> Purpose </th> 
             </tr>
             </thead>

             <tbody id="kepper-hidden">
    
{/* if user status is keeper and is checked is false */}           
        {
       downloadData?.map((item,index)=><>
       <tr className="lg:text-xl text-white  text-center">
       <th className="">{index+1}</th>
       
       <td>{item?.itemName}</td>
       <td>{item?.demand}</td>
       <td>{item?.purpose}</td>
       
       
       
       </tr>
     </>)
  }


  
</tbody>
</table>
<button onClick={generatePdf}  className="font-semibold px-3 py-2 mt-4 rounded-md bg-[#4CAF50]">Download</button>
</div>         
    </div>
    );
};

export default DownloadRequisition;