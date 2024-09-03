import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const SRB = () => {

    const {data:srbdata}=useQuery({
        queryKey:['srbdata'],
        queryFn:async()=>{
           const res=await axios.get('http://localhost:5012/srbdata')
            return res.data
        }
    })
    console.log('srbData',srbdata)

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
        <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20  ">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8 ">SRB Item List</h2>
            <table className="table   ">
              {/* head */}
             <thead className="">
             <tr className="text-sm md:text-base font-bold text-white text-center">
             <th className=""></th>
            
             <th className=" "> Item Name  </th>
             <th className=" "> Added Item </th>
             <th className=" "> Ledger Serial No </th> 
             <th className=" ">Action</th>
             
             
             </tr>
             </thead>

             <tbody id="kepper-hidden">
    
{/* if user status is keeper and is checked is false */}           
        {
       srbdata?.map((item,index)=><>
       <tr className="lg:text-xl text-white  text-center">
       <th className="">{index+1}</th>
       
       <td>{item?.itemName}</td>
       <td>{item?.addItemData}</td>
       <td>{item?.ledgerSerialNo}</td>
       
       
       
       </tr>
     </>)
  }


  
</tbody>
</table>
<button onClick={generatePdf} className="font-semibold px-3 py-2 mt-4 rounded-md bg-[#4CAF50]">Download</button>
</div>         
    </div>
    );
};

export default SRB;