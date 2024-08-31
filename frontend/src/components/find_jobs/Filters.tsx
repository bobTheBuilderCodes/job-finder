import React from "react";

const Filters = () => {
  return (
    <div className="shadow-md shadow-gray-100 p-4 my-6 mx-3 bg-white sticky top-[10vh]">
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
            <label className="text-gray-500 font-regular text-sm">Full-time</label>
          </div>
          <div className="">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-regular text-sm">Internship</label>
          </div>
          <div className="mt-2">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-regular text-sm">Freelance</label>
          </div>
          <div className="mt-2 mb-8">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-regular text-sm">Volunteer</label>
          </div>
        </div>
      </section>
      {/* On site / Remote */}
      <section className="border-b-2 border-gray-100 mb-4">
        <h1 className="font-bold text-lg font-gray-900 mb-3">On site / Remote</h1>
        <div className="grid grid-cols-2">
          <div>
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-regular text-sm">On-site</label>
          </div>
          <div className="">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-regular text-sm">Remote</label>
          </div>
          <div className="mt-2 mb-8">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-regular text-sm">Hybrid</label>
          </div>
          
        </div>
      </section>
     
      {/* Salary Range Filter */}
      <section className=" mb-4">
        <h1 className="font-bold text-lg font-gray-900 mb-3">Salary Range</h1>
        <div className="flex flex-col flex-wrap">
          <div>
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-regular text-sm">Between 500 and 900</label>
          </div>
          <div className="mt-2">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-regular text-sm"> Between 900 - 1,500</label>
          </div>
          <div className="mt-2">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-regular text-sm"> Between 1,500 -  2,500</label>
          </div>
          <div className="mt-2 mb-8">
            <input className="mr-3" type="checkbox" />
            <label className="text-gray-500 font-regular text-sm">Above 2,500</label>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Filters;
