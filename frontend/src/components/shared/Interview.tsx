import React from "react";
import InterviewAppointment from "./InterviewAppointment";

const Interview = () => {
  return (
    <div className="shadow-md shadow-gray-100 p-6 my-6 mx-3 bg-white sticky top-[10vh]">
      <div className="flex justify-between items-center border-b-2 border-gray-100 mb-4">
        <h1 className="font-bold text-lg font-gray-900 mb-5">My Interviews</h1>
        <h1 className="font-medium text-md text-blue-500 mb-5 ">See All</h1>
      </div>
      <InterviewAppointment />
      <InterviewAppointment />
      <InterviewAppointment />
      <InterviewAppointment />
      
    </div>
  );
};

export default Interview;
