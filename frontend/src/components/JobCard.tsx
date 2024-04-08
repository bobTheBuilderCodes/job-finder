const JobCard = () => {
  return (
    <section className="bg-white px-4 py-8 m-6 shadow-md shadow-gray-100 flex  rounded-lg">
      <div className="bg-[#007AA9] max-h-10 min-w-10 rounded-md mr-4 font-bold text-xl flex justify-center items-center text-white">
        U
      </div>
      <div >
        <div className="flex justify-between">
        <h1 className="font-bold text-lg font-gray-900 mb-3">Developer Bob</h1>
        <div>
          <h1 className="font-medium text-md text-gray-500 ">Accra, Ghana</h1>
          <p className="text-gray-400 text-sm list-disc"> 5 minutes ago</p>
        </div>
        </div>
        <span className="bg-gray-100 px-2 py-1 mt-6 max-w-auto font-semibold text-gray-700">
          Full-time
        </span>

        <p className="text-gray-500 list-disc mt-3">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters.
        </p>
      </div>
    </section>
  );
};

export default JobCard;
