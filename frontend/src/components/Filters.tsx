import React from "react";

const Filters = () => {
  return (
    <div className="shadow-md shadow-gray-100 p-6 m-6 bg-white fixed">
      <div className="flex justify-between items-center border-b-2 border-gray-100 mb-4">
        <h1 className="font-bold text-lg font-gray-900 mb-5">Filter</h1>
        <h1 className="font-medium text-md text-red-500 mb-5 ">Clear All</h1>
      </div>

      {/* Job Type Filter */}
      <section className="border-b-2 border-gray-100 mb-4">
        <h1 className="font-bold text-lg font-gray-900 mb-3">Job Type</h1>
        <div className="grid grid-cols-2">
          <div>
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium">Full-time</label>
          </div>
          <div className="">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium">Internship</label>
          </div>
          <div className="mt-2">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium">Freelance</label>
          </div>
          <div className="mt-2 mb-8">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium">Volunteer</label>
          </div>
        </div>
      </section>
      {/* On site / Remote */}
      <section className="border-b-2 border-gray-100 mb-4">
        <h1 className="font-bold text-lg font-gray-900 mb-3">On site / Remote</h1>
        <div className="grid grid-cols-2">
          <div>
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium">On-site</label>
          </div>
          <div className="">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium">Remote</label>
          </div>
          <div className="mt-2 mb-8">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium">Hybrid</label>
          </div>
          
        </div>
      </section>
     
      {/* Salary Range Filter */}
      <section className=" mb-4">
        <h1 className="font-bold text-lg font-gray-900 mb-3">Salary Range</h1>
        <div className="grid grid-cols-2">
          <div>
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium">Under 500</label>
          </div>
          <div className="">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium"> 500 - 1,000</label>
          </div>
          <div className="mt-2">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium"> 1,000 -  2,500</label>
          </div>
          <div className="mt-2 mb-8">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-medium">Above 2,500</label>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Filters;
