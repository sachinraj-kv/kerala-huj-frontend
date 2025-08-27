import { api } from "@/api/api";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ENDPOINTS } from "@/Routes/endpoint";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ReportSearch from "./ReportSearch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ban, ChevronsLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const Reports = () => {
  const [data, setData] = useState([]);
  const [editingCovers, setEditingCovers] = useState({});
  const [formData, setFormData] = useState({});
  const [Query, setQuery] = useState("");
  const [userdata, setUserdata] = useState([]);
  const [searchresult, setSearchresult] = useState([]);
  const [filterValue, setFilterValue] = useState("all");
  const [updatedata , setupdatedata] = useState([])

  const {id} = useParams()

  console.log("id",id);
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/report');
        setData(res.data.result);
      } catch (error) {
        console.error(error); 
      }
    };
    fetchReports();
  }, [updatedata]);

  
  const handleChange = (coverId, recordId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [coverId]: {
        ...prev[coverId],
        [recordId]: {
          ...prev[coverId]?.[recordId],
          [field]: value,
        },
      },
    }));
  };

  const startEdit = (cover) => {
    const coverData = {};
    cover.records.forEach((rec) => {
      coverData[rec._id] = { ...rec };
    });

    setFormData((prev) => ({
      ...prev,
      [cover._id]: coverData,
    }));

    setEditingCovers((prev) => ({
      ...prev,
      [cover._id]: true,
    }));
  };

  const cancelEdit = (coverId) => {
    setFormData((prev) => {
      const copy = { ...prev };
      delete copy[coverId];
      return copy;
    });
    setEditingCovers((prev) => ({
      ...prev,
      [coverId]: false,
    }));
  };

  const handleSubmit = async (coverId) => {
    const updatedRecords = Object.entries(formData[coverId] || {}).map(
      ([recordId, record]) => ({
        record_id: record.record_id || recordId,
        payment: record.payment,
        receipt: record.receipt,
        passport: record.passport,
        documents: record.documents,
        remarks: record.remarks,
      })
    );

    const payload = {
      cover_id: data.find((c) => c._id === coverId)?.cover_id,
      records: updatedRecords,
    };

    

    const update = await api.put(ENDPOINTS.REPORTVIEW, payload);

    if (update.data.success) {
      console.log("update data", update.data.data);
      setupdatedata(update.data.data)

    }

    setData((prev) =>
      prev.map((cover) =>
        cover._id === coverId ? { ...cover, records: updatedRecords } : cover
      )
    );

    cancelEdit(coverId);
  };

  
  useEffect(() => {
    if (!Query) {
      setSearchresult([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await api.post("/report/search", { Query });
        if (res.data.success) {
          setSearchresult(res.data.result);
        } else {
          setSearchresult([]);
        }
      } catch (err) {
        console.log(err.message);
        setSearchresult([]);
      }
    };

    fetchData();
  }, [Query]);

  
  useEffect(() => {
    if (searchresult && searchresult.length > 0) {
      setUserdata(searchresult);
    } else {
      setUserdata(data);
    }
  }, [searchresult, data, Query]);


  
  useEffect(() => {
    if (filterValue === "all") {

      setUserdata(data);

    } else {

      const filtered = data.filter(
        (ele) => String(ele.completed) === filterValue
      );
      setUserdata(filtered);

    }
  }, [filterValue, data]);

  const incomplete = data.filter((ele)=>ele.completed === 0)
  const complete = data.filter((ele)=>ele.completed === 1)

  

  return (
    <div className="max-w-7xl mx-auto mt-6 space-y-8 px-3 sm:px-6 font-roboto font-extrabold">
      <div className="flex justify-start gap-10 items-center">
        <div className="flex gap-2 items-center ">
            <Link to={'/'}>
          <div className="flex items-center text-lg">
            <div> <ChevronsLeft /></div>
            <div>back to Records</div>
          </div>
           </Link>
        <div className="text-2xl sm:text-3xl font-extrabold font-roboto">
          Documentation Report
        </div>
        </div>
        <div>
          <ReportSearch Query={Query} setQuery={setQuery} />
        </div>
        <div className="max-w-2xl ">
          <Select defaultValue="all" onValueChange={setFilterValue} className="p-4">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All<div className="pl-3 pr-3 pt-1 pb-1 bg-gray-200 rounded-full font-bold ">{data.length}</div></SelectItem>
              <SelectItem value="0">Incomplete<div className="pl-3 pr-3 pt-1 pb-1 bg-gray-200 rounded-full font-bold ">{incomplete.length}</div></SelectItem>
              <SelectItem value="1">Complete<div className="pl-3 pr-3 pt-1 pb-1 bg-gray-200 rounded-full font-bold">{complete.length}</div></SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

    
      {Query && searchresult.length === 0 ? (
        <div className=" font-semibold text-slate-900  flex justify-center gap-4"> <Ban />Not found</div>
      ) : (
        userdata.map((cover) => {
          const isEditing = editingCovers[cover._id] || false;

          return (
            <div
              key={cover._id}
              className="bg-white shadow-md rounded-2xl p-4 sm:p-6 border border-gray-200"
            >
             
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg sm:text-xl font-semibold">
                  Cover Id:{" "}
                  <span className="text-amber-700">{cover.cover_id}</span>
                </div>

                <div className="flex gap-2">
                    
                  {isEditing ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleSubmit(cover._id)}
                        className="bg-slate-900 hover:bg-slate-700 text-white"
                      >
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => cancelEdit(cover._id)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => startEdit(cover)}
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>

             
              <div className="space-y-6">
                {cover.records.map((rec) => {
                  const localRec = formData[cover._id]?.[rec._id] || rec;

                  return (
                    <div
                      key={rec._id}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 border-b pb-4"
                    >
                      <div className="text-sm font-medium text-gray-600 break-all">
                        {rec.record_id}
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={localRec.payment}
                          disabled={!isEditing}
                          onCheckedChange={(val) =>
                            handleChange(cover._id, rec._id, "payment", val)
                          }
                        />
                        <Label>Payment</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={localRec.receipt}
                          disabled={!isEditing}
                          onCheckedChange={(val) =>
                            handleChange(cover._id, rec._id, "receipt", val)
                          }
                        />
                        <Label>Receipt</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={localRec.passport}
                          disabled={!isEditing}
                          onCheckedChange={(val) =>
                            handleChange(cover._id, rec._id, "passport", val)
                          }
                        />
                        <Label>Passport</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={localRec.documents}
                          disabled={!isEditing}
                          onCheckedChange={(val) =>
                            handleChange(cover._id, rec._id, "documents", val)
                          }
                        />
                        <Label>Documents</Label>
                      </div>

                      <div className="sm:col-span-2 md:col-span-3 lg:col-span-5">
                        <Textarea
                          disabled={!isEditing}
                          value={localRec.remarks}
                          onChange={(e) =>
                            handleChange(
                              cover._id,
                              rec._id,
                              "remarks",
                              e.target.value
                            )
                          }
                          placeholder="Add remarks..."
                          className="w-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Reports;
