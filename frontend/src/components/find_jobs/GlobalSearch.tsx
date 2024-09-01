import React from "react";
import { useResponsiveJSX } from "../shared/useResponsiveJSX";

const GlobalSearch = () => {
  const breakpoint = useResponsiveJSX([600, 1024, 1440, 1920]);
  const globalSearch =
    breakpoint !== 0 ? (
      <div className="border-2 border-gray-100 rounded-lg my-6 mx-3 p-4 bg-white shadow-sm flex">
        <input
          type="search"
          placeholder="Search by job title or country"
          className="flex-1 outline-none font-medium text-gray-500 text-lg pr-6"
        />
        <button className="bg-[#007AA9] text-white font-bold px-3 py-2 rounded-lg">
          Find Jobs
        </button>
      </div>
    ) : (
      <div className="border-2 border-gray-100 rounded-lg my-6 mx-3 px-4 py-2 bg-white shadow-sm flex">
        <input
          type="search"
          placeholder="Search by job title or country"
          className="flex-1 outline-none  text-gray-500 text-sm pr-6"
        />

        <button className="bg-[#007AA9] text-white p-1.5 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
            />
          </svg>
        </button>
      </div>
    );

  return globalSearch;
};

export default GlobalSearch;
