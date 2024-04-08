import React from "react";

const TalentCard = () => {
  return (
    <section className="shadow-sm border-2 border-gray-100 p-4 m-3 bg-white rounded-lg flex items-center max-w-fit">
      <h1 className="h-28 w-28 bg-gray-100 rounded-lg flex items-center font-bold justify-center text-4xl">
        RS
      </h1>
      <div className="ml-4">
        <h1 className="font-bold text-lg font-gray-900 ">Jason Statan</h1>
        <p className="text-gray-500">jason.statan@gmail.com</p>
        <div className="flex">
          <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mt-3">
            ReactJS
          </p>
          <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mt-3 mx-3">
           NextJS
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default TalentCard;
