const ApplicationCard = () => {
  return (
    <section className="bg-white px-4 py-8 m-6 shadow-md shadow-gray-100  w-80 h-40 flex rounded-lg">
      <div className="bg-[#007AA9] max-h-10 max-w-10 min-h-10 min-w-10 rounded-md mr-8 font-bold text-xl flex justify-center items-center text-white">
        U
      </div>
      <div >
        <div className="">
        <h1 className="font-bold text-lg font-gray-900">Developer Bob</h1>
          <h1 className="font-medium text-md text-gray-500 mb-3">Accra, Ghana</h1>
        </div>
        <span className="bg-yellow-100 px-2 py-1 mt-6 max-w-auto font-semibold text-yellow-700">
          Pending Review
        </span>
      </div>
    </section>
  );
};

export default ApplicationCard;
