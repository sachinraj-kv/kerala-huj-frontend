import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Ban, ChevronsLeft, ChevronsRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "@/Routes/endpoint";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReportSearch from "./ReportSearch";


const ReportTable = () => {
  const columns = [
    { header: "Cover ID", accessor: (row) => row.cover_id },
    {
      header: "Applicant Name",
      accessor: (row) => row.records?.[0]?.record_id?.applicantName || "-",
    },
    { header: "Receipt No", accessor: (row) => row.reciptNo || "-" },
    {
      header: "Receiver Name",
      accessor: (row) => row.recererId?.name || "-",
    },
    {
      header: "Details",
      accessor: (row) => (
        <Link
          to={`/Report/${row.cover_id}`}
          className="text-blue-600 hover:underline"
        >
          View More
        </Link>
      ),
    },
  ];

  const [result, setResult] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [searchresult, setSearchresult] = useState([]);
  const [query, setQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const [totalPages, setTotalPages] = useState(1);
  const [currentpage, setCurrentpage] = useState(1);

  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get(ENDPOINTS.REPORTVIEW, {
          params: { limit: 10, pages: currentpage },
        });

        if (res.data.success) {
          setTotalPages(res.data.pages || 1);
          setResult(res.data.result || []);
        }
      } catch (error) {
        console.error("Error fetching reports:", error.message);
      }
    };
    fetchReports();
  }, [currentpage]);

  
  useEffect(() => {
    if (!query) {
      setSearchresult([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await api.post("/report/search", { Query: query });
        if (res.data.success) {
          setSearchresult(res.data.result || []);
        } else {
          setSearchresult([]);
        }
      } catch (err) {
        console.log(err.message);
        setSearchresult([]);
      }
    };

    fetchData();
  }, [query]);

 
  
  useEffect(() => {
    let baseData = searchresult.length > 0 ? searchresult : result;

    if (filterValue === "all") {
      setUserdata(baseData);
    } else {
      const filtered = baseData.filter(
        (ele) => String(ele.completed) === filterValue
      );
      setUserdata(filtered);
    }
  }, [filterValue, result, searchresult]);


  const incomplete = result.filter((ele) => Number(ele.completed) === 0);
  const complete = result.filter((ele) => Number(ele.completed) === 1);


  const handlePrevious = () => {
    if (currentpage > 1) {
      setCurrentpage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentpage < totalPages) {
      setCurrentpage((prev) => prev + 1);
    }
  };

  if (!userdata || userdata.length === 0) {
    return (
      <div className="font-semibold text-slate-900 flex justify-center gap-2 mt-10">
        <Ban /> No Reports Found
      </div>
    );
  }

  return (
    <div className="mt-5  max-w-7xl mx-auto">
      <div className="hidden md:block overflow-x-auto rounded-lg">
        <div className="flex justify-between items-center gap-10  mb-4">
          <Link to={"/"} className="flex  gap-2">
            <div className="flex items-center text-lg cursor-pointer font-bold hover:underline">
              <ChevronsLeft  size={20}/>
                 
              Back to Records
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-roboto">
            Documentation Report
          </div>
          </Link>

          

          <div className="flex gap-4 items-center">
            <ReportSearch query={query} setQuery={setQuery} />

            <Select defaultValue="all" onValueChange={setFilterValue}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All
                  <span className="ml-2 bg-gray-200 px-2 rounded-full text-sm">
                    {result.length}
                  </span>
                </SelectItem>
                <SelectItem value="0">
                  Incomplete
                  <span className="ml-2 bg-gray-200 px-2 rounded-full text-sm">
                    {incomplete.length}
                  </span>
                </SelectItem>
                <SelectItem value="1">
                  Complete
                  <span className="ml-2 bg-gray-200 px-2 rounded-full text-sm">
                    {complete.length}
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-slate-900">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-sm text-gray-800 border-t text-center"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userdata.map((row, rowIndex) => (
              <tr
                key={row.cover_id + rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-6 py-4 text-sm text-slate-700 font-semibold border-t text-center"
                  >
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
     
<div className="block md:hidden space-y-4 mx-2">

  <div className="flex flex-col gap-2 mb-3">
    <Link to={"/"} className="flex items-center gap-3 text-lg cursor-pointer">
    
    <div  className="flex items-center">
      <div> <ChevronsLeft className="mr-1" /></div>
      <div> Back </div>
     
            
     
      </div>

     
       <div className="text-xl sm:text-2xl font-extrabold font-roboto text-slate-900">
      Documentation Report
    </div>
    </Link>
   
  </div>

  {/* Search + Filter */}
  <div className="flex flex-col gap-3">
    <ReportSearch query={query} setQuery={setQuery} />

    <Select defaultValue="all" onValueChange={setFilterValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          All
          <span className="ml-2 bg-gray-200 px-2 rounded-full text-sm">
            {result.length}
          </span>
        </SelectItem>
        <SelectItem value="0">
          Incomplete
          <span className="ml-2 bg-gray-200 px-2 rounded-full text-sm">
            {incomplete.length}
          </span>
        </SelectItem>
        <SelectItem value="1">
          Complete
          <span className="ml-2 bg-gray-200 px-2 rounded-full text-sm">
            {complete.length}
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  </div>

  {/* Cards */}
  {userdata.map((row, rowIndex) => (
    <div
      key={row.cover_id + rowIndex}
      className="bg-white rounded-lg shadow-lg p-4 border"
    >
      {columns.map((col, idx) => (
        <div
          key={idx}
          className="flex justify-between mt-2 text-base py-1 border-b last:border-b-0 p-2 font-roboto"
        >
          <span className="font-medium text-gray-600">{col.header}:</span>
          <span className="text-gray-900">
            {typeof col.accessor === "function"
              ? col.accessor(row)
              : row[col.accessor]}
          </span>
        </div>
      ))}
    </div>
  ))}
</div>


      {/* Pagination */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center ml-3 mt-4">
            Reports found{" "}
            <span className="bg-gray-100 ml-2 px-2 rounded-full">
              {userdata.length}
            </span>
          </div>
          <div className="flex justify-end gap-3 mt-4 mr-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentpage === 1}
            >
              <ChevronsLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentpage === totalPages}
            >
              Next <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;
