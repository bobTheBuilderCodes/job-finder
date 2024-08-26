
import React from "react";
import Interview from "../shared/Interview";
import TalentCard from "./TalentCard";

const Application = () => {
  return (
    <section className="bg-gray-50 flex">
      <section className="w-3/4 grid grid-cols-3 ">
        <div className="border-2 border-gray-100 rounded-lg p-4 m-6 bg-white shadow-sm flex col-span-2">
          <input
            type="search"
            placeholder="Search by job title or country"
            className="flex-1 outline-none font-medium text-gray-500 text-lg pr-6"
          />
        </div>
        <div className="relative m-6">
          <select className="appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full">
            <option>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Experienced</option>
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
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
        <TalentCard />
      </section>
      <aside className="w-1/4">
        <Interview />
      </aside>
    </section>
  );
};

export default Application;
