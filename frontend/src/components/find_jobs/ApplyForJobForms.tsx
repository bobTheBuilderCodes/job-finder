import React from "react";

interface ApplyForJobFormsProps {
  pageView: boolean;
  setPageView: (view: boolean) => void;
}

const ApplyForJobForms: React.FC<ApplyForJobFormsProps> = ({
  pageView,
  setPageView,
}) => {
  return (
    <form className="grid grid-cols-2 gap-12 m-1">
      <div className="col-span-2">
        <h1 className="font-bold mb-2 text-2xl text-gray-900 col-span-2">
          Application Details for UX Strategist Role
        </h1>
        <p className="text-gray-500 col-span-2">
          Posted by James Thomas 2 hours ago
        </p>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="Fullname"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
         Fullname
        </label>
        <input
          placeholder="Eg. john doe"
          className=" bg-white  outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
         Email
        </label>
        <input
          placeholder="Eg. johndoe@gmail.com"
          className=" bg-white  outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="Address"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
          Address
        </label>
        <input
          placeholder="Eg. Accra akrom street 119 Block A"
          className=" bg-white  outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
        />
      </div>
      
     
      <div className="flex flex-col">
        <label
          htmlFor="salary_expectation"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
          Salary Expectation
        </label>
        <input
          placeholder="Eg. GHS 3,500.00"
          className=" bg-white  outline-1 outline-gray-200 appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
        />
      </div>
      <div className="flex flex-col col-span-2">
        <label
          htmlFor="job_description"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
         Cover Letter
        </label>
        <textarea
          placeholder="Why should we hire you?"
          className=" bg-white resize-none h-32 outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
        ></textarea>
      </div>
      <div className="col-span-2 flex justify-end">
        <button
          onClick={(e) => setPageView(!pageView)}
          className="border-2 border-[#007AA9] mx-6 font-bold px-6 py-2 text-[#007AA9] text-lg rounded-lg transition-colors duration-300 hover:bg-[#007AA9] hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={(e) => setPageView(!pageView)}
          className="bg-[#007AA9] font-bold px-6 py-2 text-white text-lg rounded-lg"
        >
         Apply For Job
        </button>
      </div>
    </form>
  );
};

export default ApplyForJobForms;
