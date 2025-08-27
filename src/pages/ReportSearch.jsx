import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react'

const ReportSearch = ({setQuery ,Query }) => {
     const handleChange = (e) => {
    setQuery(e.target.value);
   
  };
  return (
     <div className=" flex items-center bg-transparent p-2  rounded-2xl ">
      <Search className="text-gray-500 w-10 h-5" />
      <Input
        type="search"
        onChange={handleChange}
        placeholder="Enter the CoverID"
        className="bg-transparent border-none shadow-none focus-visible:ring-0 focus:outline-none ml-2 md:w-max-7xl border_b "
      />
    </div>
  )
}

export default ReportSearch