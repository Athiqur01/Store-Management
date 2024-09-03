import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const SIB = () => {
    const {data:sib}=useQuery({
        queryKey:['sib'],
        queryFn:async()=>{
           const res=await axios.get('http://localhost:5012/sibdata')
           return res.data

        }
    })

    console.log('sib data:', sib)

    const generatePdf=()=>{
        const doc=new jsPDF()
        doc.text('SIB Item List', doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
        const tableColumn = [
            'No.',
            'Date',
            'Item Name',
            'Demand',
            'Ledger Serial No',
            'SIB Serial No',
            'Remark',
          ];
          const tableRows = [];
          sib?.forEach((item, index) => {
            const itemData = [
              index + 1,
              item.approvalDate,
              item.itemName,
              item.demand,
              item.ledgerSerialNo,
              item.sibSerialNo,
              
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
      
          doc.save('sib_item_list.pdf');      

    }



    return (
        <div className="flex flex-col justify-center">
            <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20  ">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8 ">SIB Item List</h2>
                <table className="table   ">
                  {/* head */}
                 <thead className="">
                 <tr className="text-sm md:text-base font-bold text-white text-center">
                 <th className=""></th>
                 <th>Date</th>
                 <th className=" "> Item Name  </th>
                 <th className=" "> Demand </th>
                 <th className=" "> Ledger Serial No </th>
                 <th className=" "> SIB Serial No </th>
                 <th className=" ">Purpose  </th>
                 
                 
                 </tr>
                 </thead>

                 <tbody id="kepper-hidden">
        
    {/* if user status is keeper and is checked is false */}           
            {
           sib?.map((item,index)=><>
           <tr className="lg:text-xl text-white  text-center">
           <th className="">{index+1}</th>
           <td>{item?.approvalDate}</td>
           <td>{item?.itemName}</td>
           <td>{item?.demand}</td>
           <td>{item?.ledgerSerialNo}</td>
           <td>{item?.sibSerialNo}</td>
           <td>{item?.purpose}</td>
           
           </tr>
         </>)
      }


      
    </tbody>
  </table>
  <div><button onClick={generatePdf} className="font-semibold px-3 py-2 mt-4 rounded-md bg-[#4CAF50]">Download</button></div>
 </div>
 
                
        </div>
    );
};

export default SIB;