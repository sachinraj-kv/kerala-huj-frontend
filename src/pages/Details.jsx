import { api } from "@/api/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ChevronsLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Details = () => {
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [data, setData] = useState([]);
  const [result , setresult] = useState([])

  const navigate  = useNavigate()
  const params = useParams();
  const id = params.id;
  
  const record_Data = data.filter((ele) => ele.coverId === id).reverse()
  console.log("record_Data",record_Data);
  

   useEffect(() => {
    const fetchdata = async () => {
    
      try {
        const data = await api.get("/data/users",{
          params :{
            id:id
          } 
        });
        if (data.data.success) {
          setData(data.data.Users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchdata();
  }, []);


  const [checks, setChecks] = useState({});

  useEffect(() => {
    if (!record_Data || record_Data.length === 0) return;

    if (Object.keys(checks).length === 0) {
      const initial = {};
      record_Data.forEach((record) => {
        if (!initial[record.coverId]) {
          initial[record.coverId] = {};
        }
        initial[record.coverId][record._id] = {
          payment_slip: true,
          medical_certificate: true,
          application: true,
          declaration: true,
          remarks: "",
        };
      });
      setChecks(initial);
    }
  }, [record_Data]);


const handleSubmit = async () => {
  const payload = {
    cover_id: Object.keys(checks)[0],
    records: Object.entries(checks[Object.keys(checks)[0]]).map(
      ([recordId, details]) => ({
        record_id: recordId,
        ...details,
      })
    ),
  };

  try {
    const res = await api.post("/report/submit", payload);

    if (res.data.success) {
      console.log("Submitted successfully");
      setresult(res.data.data);
      navigate("/receipt", { state: { reciptData: res.data.data } });
    } else {
      console.log("Failed:", res.data.message);
      navigate("/");
    }
  } catch (error) {
   
    if (error.response) {
      console.log("Error response:", error.response.data);

      if (error.response.status === 409) {

        navigate("/"); 
      } else {
        navigate("/");
      }
    } else {
      console.log("Network/Unknown error:", error.message);
      navigate("/");
    }
  }
};


  if (!id && id.length === 0) {
    return (
      <div className="mt-6 px-4 md:px-10">
        <p className="text-center text-red-500">Record not found</p>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="mt-6 px-4 md:px-10">
      
        <div className="flex items-center mb-6 max-w-5xl mx-auto">
            <div className="flex justify-between  items-center gap-10 ">
          <div className="flex items-center ">
            <div>
              <Link to={"/"} className="flex items-center gap-2">
            <ChevronsLeft className="w-5 h-5 md:mt-1" />
          </Link>
            </div>
            <div>
              <div>
              <Link to={"/"}>
                <Button
                  variant="ghost"
                  className="bg-transparent text-black shadow-none p-0 hover:bg-transparent hover:underline text-base sm:text-lg"
                >
                  Back to Records
                </Button>
              </Link>
            </div>
            </div>
            </div>
          
        
            
            <div className="font-bold text-10 ">Cover Id : {id}</div>
          </div>
        </div>

        <div className="gap-2">
          {record_Data.map((record) => {
            const rowKey = `${record._id}`;
            const coverid = `${record.coverId}`;

            const recordChecks = checks[coverid]?.[rowKey] || {
              payment_slip: true,
              medical_certificate: true,
              application: true,
              declaration: true,
              remarks: "",
            };

            const isMissingDocs = Object.entries(recordChecks)
              .filter(([key]) => key !== "remarks")
              .some(([_, v]) => v === false);

            return (
              <div
                key={rowKey}
                className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow mb-3"
              >
                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${rowKey}`}>
                    <div>
                  


                      <div className="flex flex-col md:flex-row justify-start md:items-center gap-3 sm:gap-5 md:gap-7 font-bold md:font-extrabold">
                        <div className="text-sm sm:text-base md:text-lg">
                          <span className="font-semibold ">Applicant:</span>{" "}
                          <span  className={`${
        record.ch === "Ch" ? "text-red-900" : "text-gray-700"
      }`}>
                            {record.applicantName}
                          </span>
                        </div>
                       
                      </div>



                      {/* Checkboxes */}
                      <div className="ml-1 sm:ml-3 mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.keys(recordChecks)
                          .filter((f) => f !== "remarks")
                          .map((field) => (
                            <div
                              key={field}
                              className="flex items-center gap-2 sm:gap-3"
                            >
                              <Checkbox
                                checked={recordChecks[field]}
                                onCheckedChange={(val) => {
                                  const updated = {
                                    ...checks,
                                    [coverid]: {
                                      ...checks[coverid],
                                      [rowKey]: {
                                        ...checks[coverid]?.[rowKey],
                                        [field]: val,
                                      },
                                    },
                                  };
                                  setChecks(updated);
                                }}
                                className={`
                                  data-[state=checked]:bg-green-500
                                  data-[state=unchecked]:bg-red-500
                                `}
                              />
                              <Label className="text-sm sm:text-base md:text-lg font-bold">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                              </Label>
                            </div>
                          ))}
                      </div>



                      {/* Textarea */}
                      {isMissingDocs && (
                        <div className="mt-4">
                          <Label className="block mb-1 font-semibold">
                            Remarks :
                          </Label>
                          <Textarea
                            className="w-full md:w-3/4 lg:w-1/2 border-2 h-20 shadow-none 
                              focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                            placeholder="Enter Remarks..."
                            value={recordChecks.remarks}
                            onChange={(e) => {
                              const updated = {
                                ...checks,
                                [coverid]: {
                                  ...checks[coverid],
                                  [rowKey]: {
                                    ...checks[coverid]?.[rowKey],
                                    remarks: e.target.value,
                                  },
                                },
                              };
                              setChecks(updated);
                            }}
                          />  
                        </div>
                      )}
                    </div>

                   

                    <AccordionTrigger className="mt-3 px-0 sm:px-3 md:[&>svg]:hidden text-sm sm:text-base md:text-lg">
                      More details
                    </AccordionTrigger>

                  


                    <AccordionContent>
                      <div className="mt-3 md:mx-5 grid grid-cols-1 md:grid-cols-3 gap-3 font-roboto text-sm sm:text-base md:text-lg">
                        <div>
                          <span className="font-semibold">
                            District
                          </span>{" "}
                          <span>  {record.Districts}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Form Type</span>{" "}
                          <span>{record.ch}</span>
                        </div>
                      
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>

    



      <div className="flex justify-center mt-6">
        <Button
          type="submit"
          className="w-3/4 sm:w-2/4 md:w-2/4
               bg-gray-800 hover:bg-gray-900 
               text-white font-semibold 
               text-sm sm:text-base md:text-lg 
               py-3 rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => {
            handleSubmit(checks);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Details;
