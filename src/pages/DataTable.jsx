import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Ban,
  ChevronsLeft,
  ChevronsRight,
  File,
  LogOut,
  Minus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Searchdata from "./Search";
import { ENDPOINTS } from "@/Routes/endpoint";

const DataTable = () => {
  const columns = [
    { header: "Cover ID", accessor: "coverId" },
    { header: "Applicate Name", accessor: "applicantName" },
    { header: "Districts", accessor: "Districts" },
    { header: "Details", accessor: "details" },
  ];

  const [result, setresult] = useState([]);
  const [page, setpage] = useState(1);
  const [currentpage, setcurrentpage] = useState(1);
  const [searchresult, setsearchresult] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await api.get("/data/pagesdata", {
          params: {
            limit: 12,
            pages: currentpage,
          },
        });

        if (data.data.success) {
          setpage(data.data.pages);
          setresult(data.data.Users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchdata();
  }, [currentpage]);

  const handlePrevious = () => {
    if (currentpage > 1) {
      setcurrentpage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentpage < page) {
      setcurrentpage((prev) => prev + 1);
    }
  };


  useEffect(() => {
    if (!query) {
      setsearchresult([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await api.post("/data/search", { query });
        if (res.data.success) {
          setsearchresult(res.data.result);
        } else {
          setsearchresult([]);
        }
      } catch (err) {
        console.log(err.message);
        setsearchresult([]);
      }
    };

    fetchData();
  }, [query]);


  useEffect(() => {
    if (query) {
      if (searchresult && searchresult.length > 0) {
        setuserdata(searchresult);
      } else {
        setuserdata([]); 
      }
    } else {
      setuserdata(result); 
    }
  }, [searchresult, result, query]);

  const handleLogout = async () => {
    const logout = await api.post(ENDPOINTS.LOGOUT);

    if (logout.data.success) {
      console.log("logout scuccesfull");
      navigate("/login");
    }
  };

  return (
    <div className="mt-5 md:mx-3">
      {/* desktop view  start*/}
      <div className="hidden md:block overflow-x-auto  rounded-lg">
        <div className="flex max-w-7xl mx-auto items-center gap-6 ">
          <div>
            <Searchdata query={query} setQuery={setQuery} />
          </div>

          <div className="font-bold text-md ">
            <Link to={"/record/table"} className="flex  items-center">
              <div>
                <File size={20} />
              </div>
              <div className="text-md"> Report</div>
            </Link>
          </div>
          <Button className="bg-neutral-50 text-black hover:bg-neutral-100">
            <div className="flex items-center font-bold " onClick={handleLogout}>
              <div>
                <LogOut size={20} />
              </div>
              <div className=" text-lg ">Logout</div>
            </div>
          </Button>
        </div>
        <table className="min-w-7xl mx-auto border border-gray-200 rounded-lg overflow-hidden ">
          <thead className="bg-gray-100 text-slate-900 ">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-6 py-3 text-sm text-gray-800 border-t font-roboto text-left"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userdata.length > 0 ? (
              userdata.map((row, rowIndex) => (
                <tr
                  key={row.coverId + rowIndex}
                  className={`${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      className="px-6 py-4 text-sm text-slate-700 font-semibold border-t"
                    >
                      {col.accessor === "details" ? (
                        <Link
                          to={`/record/details/${row.coverId}`}
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          View <ChevronsRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        row[col.accessor]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-6 text-center text-gray-600 font-semibold flex justify-center items-center gap-2"
                >
                  <Ban className="h-5 w-5" />
                  {query ? "No results found for your search" : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* desktop view end */}

      {/* mobile view start */}
      <div className="block md:hidden space-y-4 mx-2">
        <div className="flex justify-start items-center">
          <div className="md:max-w-7xl md:mx-auto">
            <Searchdata query={query} setQuery={setQuery} />
          </div>
        </div>
        {userdata.length > 0 ? (
          userdata.map((row, rowIndex) => (
            <div
              key={row.coverId + rowIndex}
              className="bg-white rounded-lg shadow-lg p-4 border"
            >
              {columns.map(
                (col) =>
                  col.accessor !== "details" && (
                    <div
                      key={col.accessor}
                      className="flex justify-between mt-2 text-base py-1 border-b last:border-b-0 p-2 font-roboto"
                    >
                      <span className="font-medium text-gray-600">
                        {col.header}:
                      </span>
                      <span className="text-gray-900">{row[col.accessor]}</span>
                    </div>
                  )
              )}
              <div className="pt-3">
                <Link
                  to={`/record/details/${row.coverId}`}
                  className="text-gray-600 hover:underline flex items-center gap-1 p-2 font-bold"
                >
                  View Details <ChevronsRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 font-semibold flex justify-center items-center gap-2">
            <Ban className="h-5 w-5" />
            {query ? "No results found for your search" : "No data available"}
          </p>
        )}
      </div>
      {/* mobile view end */}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center ml-3 mt-4">
            result founded{" "}
            <span className="bg-gray-100 ml-2 pl-2 pr-2 rounded-full">
              {userdata.length}{" "}
            </span>
          </div>
          <div className="flex-row   pt-2">
            <div>pages</div>
            <div className="flex ">
              <div>{currentpage} </div>{" "}
              <div>
                <Minus className="w-2" />
              </div>{" "}
              <div>{page}</div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 mr-2">
            <Button variant="outline" size="sm" onClick={handlePrevious}>
              <ChevronsLeft className="h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext} variant="outline" size="sm">
              Next <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
