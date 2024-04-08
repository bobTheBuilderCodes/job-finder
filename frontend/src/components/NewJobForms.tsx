import React from "react";

interface NewJobFormsProps {
  pageView: boolean;
  setPageView: (view: boolean) => void;
}

const NewJobForms: React.FC<NewJobFormsProps> = ({ pageView, setPageView }) => {
  return (
    <form className="grid grid-cols-2 gap-12 m-6">
      <div className="col-span-2">
        <h1 className="font-bold mb-2 text-2xl font-gray-900 col-span-2">
          Post New Job
        </h1>
        <p className="text-gray-500 col-span-2">
          Post a new job today. There are thousands of people looking for
          opportunities!
        </p>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="job_title"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
          Job Title
        </label>
        <input
          placeholder="Eg. fullstack developer"
          className=" bg-white  outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="job_country"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
          Country
        </label>
        <input
          placeholder="Eg. Ghana"
          className=" bg-white  outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="job_city"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
          City
        </label>
        <input
          placeholder="Eg. Accra"
          className=" bg-white  outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="job_location"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
          Job Type
        </label>
        <div className="relative">
          <select 
          className=" bg-white  outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Volunteer</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="working_type"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
          Working Type
        </label>
        <div className="relative">
          <select 
          className=" bg-white  outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
          >
            <option>Remote</option>
            <option>On-site</option>
            <option>Hybrid</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="salary"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
          Salary
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
          Job Description
        </label>
        <textarea
          placeholder="Enter detailed job description"
          className=" bg-white resize-none h-32 outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
        ></textarea>
      </div>
      <div className="col-span-2 flex justify-end">
        <button
          onClick={(e) => setPageView(!pageView)}
          className="border-2 border-green-600 mx-6 font-bold px-6 py-2 text-green-600 text-lg rounded-lg transition-colors duration-300 hover:bg-green-600 hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={(e) => setPageView(!pageView)}
          className="bg-green-600 font-bold px-6 py-2 text-white text-lg rounded-lg transition-colors duration-300 hover:bg-green-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewJobForms;
