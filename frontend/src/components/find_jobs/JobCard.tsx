import React from "react";

import { useState } from "react";
import Modal from "../shared/Modal";
import ApplyForJobForms from "./ApplyForJobForms";
import { formatCreatedAt } from "../../helpers";

interface jobDetails {
  _id?: string;
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
        className="bg-white px-4 py-8 my-6 mx-0 shadow-md shadow-gray-100 flex rounded-lg cursor-pointer"
      >
        <p className="bg-[#007AA9] max-h-8 min-w-8 rounded-md mr-4 font-regular text-sm flex justify-center items-center text-white">
          {job_title[0]}
        </p>
        <div className="w-full">
          <div className="flex justify-between gap-2 flex-wrap">
            <h1 className="font-bold text-md font-gray-900 mb-1 mr-auto">
              {job_title}
            </h1>
            <span className="bg-gray-100 px-2 py-1 mb-2 max-w-auto font-regular text-sm text-gray-700 ">
              {job_type[0].toUpperCase() + job_type.slice(1)}
            </span>
          </div>

          {/* Paste here */}

          <h1 className="font-medium text-md text-gray-500 -mt-2">
            {city} {country && `, ${country}`}
          </h1>

          <p className="text-gray-500 list-disc font-normal text-sm my-3">
            {`${job_description.slice(0, 150)}...`}
            <span className="text-blue-500">Read more...</span>
          </p>

          <span className="text-gray-400 text-sm font-regular list-disc">
            {formatCreatedAt(createdAt)}{" "}
          </span>
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
            <ApplyForJobForms
              jobId={_id as string}
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
