import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import QRCode from 'qrcode';

const DownloadRequisition = () => {

    const {id} = useParams();
    console.log('id', id);

    const {data: download} = useQuery({
        queryKey: ['download'],
        queryFn: async () => {
            const res = axios.get(`http://localhost:5012/requisitiondownload/${id}`);
            return (await res).data;
        }
    });

    const approvalDate = download?.registerData?.approvalDate;
    const approvedBy = download?.registerData?.approvedBy;
    const approverDesignation = download?.registerData?.approverDesignation;
    const demanderDesignation = download?.registerData?.demanderDesignation;
    const requisitionBy = download?.registerData?.requisitionBy;
    const signatureRE = download?.registerData?.signatureRE;
    const requisitorSignature = download?.registerData?.requisitorSignature;
    const requisitionDate = download?.registerData?.requisitionDate;
    const downloadData = download?.registerData?.view;

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

        // Add the first and second image side by side
        const toDataURL = (url, callback) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                const reader = new FileReader();
                reader.onloadend = function() {
                    callback(reader.result);  // base64 encoded image
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        };

        toDataURL(requisitorSignature, (base64Img1) => {
            toDataURL(signatureRE, (base64Img2) => {

                const imageY = finalY + 18; // Same Y position for both images
                const imageWidth = 40; // Image width
                const imageHeight = 15; // Image height

                // Set X positions for both images to be parallel
                const imageX1 = 40; // X position of the first image
                const imageX2 = 130; // X position of the second image

                // Add the images side by side
                doc.addImage(base64Img1, 'JPEG', imageX1, imageY, imageWidth, imageHeight);
                doc.addImage(base64Img2, 'JPEG', imageX2, imageY, imageWidth, imageHeight);

                // Second table with no special styles
                const secondTableRows = [];

                const firstColumnData = [
                    [
                        requisitionDate,
                        requisitionBy, // Name
                        demanderDesignation, // Designation
                        '________________________',
                        'Requisition By', // Label
                    ].join('\n'),
                ];

                const secondColumnData = [
                    [
                        approvalDate,
                        approvedBy, // Name
                        approverDesignation, // Designation
                        '_______________________',
                        'Approver', // Label
                    ].join('\n'),
                ];

                secondTableRows.push([firstColumnData, secondColumnData]);

                doc.autoTable({
                    body: secondTableRows,
                    startY: imageY + imageHeight,
                    styles: {
                        halign: 'center', // Horizontal alignment of text (center)
                        valign: 'middle', // Vertical alignment of text (middle)
                    },
                    alternateRowStyles: {
                      fillColor: [255, 255, 255], // Force alternate rows to have a white background too
                    }
                });

                // Create the QR code containing approvalDate, approvedBy, and requisitionBy
                const qrCodeData = `Approval Date: ${approvalDate}\nApproved By: ${approvedBy}\nRequisited By: ${requisitionBy}`;

                // Generate the QR code
                QRCode.toDataURL(qrCodeData, { width: 100 }, (err, qrCodeUrl) => {
                    if (!err) {
                        // Add QR code at the end of the PDF
                        doc.addImage(qrCodeUrl, 'JPEG', 10, doc.internal.pageSize.getHeight() - 50, 25, 25);
                        
                        // Save the PDF
                        doc.save('Requisition.pdf');
                    }
                });
            });
        });
    };

    return (
        <div className="flex flex-col justify-center">
            <div className="text-white w-full px-2 md:px-40 lg:px-60 flex flex-col items-center py-10 md:py-14 lg:py-20">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-6 lg:mb-8">Requisition</h2>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-sm md:text-base font-bold text-white text-center">
                            <th></th>
                            <th>Item Name</th>
                            <th>Amount</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody id="kepper-hidden">
                        {downloadData?.map((item, index) => (
                            <tr className="lg:text-xl text-white text-center" key={index}>
                                <th>{index + 1}</th>
                                <td>{item?.itemName}</td>
                                <td>{item?.demand}</td>
                                <td>{item?.purpose}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={generatePdf} className="font-semibold px-3 py-2 mt-4 rounded-md bg-[#4CAF50]">Download</button>
            </div>
        </div>
    );
};

export default DownloadRequisition;
