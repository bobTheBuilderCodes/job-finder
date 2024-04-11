const ApplicationCard = () => {
  return (
    
    <section className="shadow-sm border-2 border-gray-100 p-4 m-3 bg-white rounded-lg flex items-start mx-6">
      <h1 className="h-12 w-12 bg-gray-100 rounded-lg flex items-center font-bold justify-center text-4xl">
        U
      </h1>
      <div className="ml-4">
        <h1 className="font-bold text-lg font-gray-900 ">Developer Bob</h1>
        <p className="text-gray-500">Accra, Ghana</p>
        <div className="flex">
          <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mt-3">
           Pending Review
          </p>
         
          
        </div>
      </div>
    </section>
  );
};

export default ApplicationCard;
