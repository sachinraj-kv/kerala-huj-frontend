
import React from "react";
import { Link } from "react-router-dom"


const AppFooter = () => {
  return (
    <div>
   
        <div>
            <footer className="bg-gray-100 mt-10 py-6 border-t">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </div>

    
        <div className="flex space-x-6 text-md">
          <Link to="/report" className="hover:underline text-gray-700 ">
            Reports
          </Link>
          {/* <Link to="/about" className="hover:underline text-gray-700">
            About
          </Link>
          <Link to="/contact" className="hover:underline text-gray-700">
            Contact
          </Link> */}
        </div>

        
        <div className="flex space-x-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-black"
          >
            
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-blue-500"
          >
          
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-blue-700"
          >
            
          </a>
        </div>
      </div>
    </footer>
        </div>
    
    </div>
  );
};

export default AppFooter;
