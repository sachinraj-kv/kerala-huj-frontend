// StateReceiptPage.jsx
import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Link, useLocation } from "react-router-dom";
import { ChevronsLeft } from "lucide-react";
import StateReceipt from "./StateRecipt";



const StateReceiptPage = () => {
  const location = useLocation();
  const receiptData = location.state?.reciptData; 

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      
      <div className="w-full flex justify-start">
        <Link to={"/"} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <ChevronsLeft className="w-5 h-5 md:mt-1" />
          <span className="text-sm md:text-base">Back</span>
        </Link>
      </div>

    
      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <StateReceipt receiptData={receiptData} />
      </PDFViewer>
    </div>
  );
};

export default StateReceiptPage;
