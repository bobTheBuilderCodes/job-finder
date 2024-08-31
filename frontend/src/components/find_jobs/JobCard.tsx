import React from "react";

import { useState } from "react";
import Modal from "../shared/Modal";
import ApplyForJobForms from "./ApplyForJobForms";
import { formatCreatedAt } from "../../helpers";

interface jobDetails {
  _id?: string
  job_title: string;
  city: string;
  country?: string;
  working_type: string;
  job_type: string;
  job_description: string;
  createdAt: string;
}

const JobCard = ({
  _id,
  job_title,
  city,
  country,
  working_type,
  job_type,
  job_description,
  createdAt,
}: jobDetails) => {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <section
        onClick={() => setToggleModal(true)}
        className="bg-white px-4 py-8 my-6 mx-3 shadow-md shadow-gray-100 flex rounded-lg cursor-pointer"
      >
        <div className="bg-[#007AA9] max-h-10 min-w-10 rounded-md mr-4 font-regular text-xl flex justify-center items-center text-white">
          {job_title[0]}
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg font-gray-900 mb-3 mr-auto">
              {job_title}
            </h1>
            <div>
              <h1 className="font-medium text-md text-gray-500 text-end">
                {city} {country && `, ${country}`}
              </h1>
              <p className="text-gray-400 text-sm list-disc text-end">
                {" "}
                {formatCreatedAt(createdAt)}
              </p>
            </div>
          </div>
          <span className="bg-gray-100 px-2 py-1 mt-6 max-w-auto font-regular text-gray-700 ">
            {job_type[0].toUpperCase() + job_type.slice(1)}
          </span>

          <p className="text-gray-500 list-disc font-normal text-sm mt-3">{`${job_description.slice(0,250)}...`} 
          <span className="text-blue-500">Read more...</span>
          </p>
        </div>
        
      </section>
      <Modal
        isOpen={toggleModal}
        key={Math.random()}
        onClose={() => setToggleModal(false)}
      >
        <div className="grid w-[90vw] grid-cols-1 gap-10 md:grid-cols-3">
          {" "}
          {/* Specify grid columns */}
          <div className="md:col-span-2">
            {" "}
            {/* Form column */}
            <ApplyForJobForms jobId={_id as string}
              pageView={true}
              setPageView={() => {}}
              key={Math.random()}
              toggleModal={toggleModal}
              setToggleModal={setToggleModal}
            />
          </div>
          <div className="md:col-span-1 md:text-gray-500 md:pl-4">
            {" "}
            {/* Job description column */}
            <h1 className="font-bold text-lg text-gray-900 mb-2">Job Title</h1>
            <p>{job_title}</p>
            <h1 className="font-bold text-lg text-gray-900 mb-2 mt-6">
              Job Type
            </h1>
            <p>{job_type}</p>
            <h1 className="font-bold text-lg text-gray-900 mb-2 mt-6">
              Job Location
            </h1>
            <p>
              {" "}
              {city} {country && `,${country}`}
            </p>
            <h1 className="font-bold text-lg text-gray-900 mb-2 mt-6">
              Job Description
            </h1>
            <p>{job_description}</p>
            <h1 className="font-bold text-lg text-gray-900 mb-2 mt-6">
              Date Posted
            </h1>
            <p> {formatCreatedAt(createdAt)}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default JobCard;
