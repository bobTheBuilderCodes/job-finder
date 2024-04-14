import { useState } from "react";
import Interview from "../shared/Interview";
import NewJobForms from "./NewJobForms";
import Table from "../shared/Table";

const UploadJob = () => {
  const [pageView, setPageView] = useState(false);

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "name" },
  ];

  const sampleData = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];

  const dropdownOptions = [
    { label: "Edit", action: (item: any) => console.log("Edit:", item) },
    { label: "Delete", action: (item: any) => console.log("Delete:", item) },
    // Add more actions as needed
  ];

  return (
    <section className="bg-gray-50 flex">
      <section className="w-3/4 shadow-md shadow-gray-100">
        {pageView ? (
          <NewJobForms pageView={pageView} setPageView={setPageView} />
        ) : (
          <>
            <div className="flex justify-between items-end mx-6">
              <div>
                <h1 className="font-bold text-lg font-gray-900 mx-3 mt-6">
                  Manage All Jobs You've Posted
                </h1>
                <p className="text-gray-500 mx-3">
                  When a job is edited or deleted, it affects all previously job
                  applications.
                </p>
              </div>
              <button
          type="button"
          onClick={() => setPageView(true)}
          className=" bg-[#007AA9] mx-3 font-bold px-6 py-2 text-white text-lg rounded-lg "
        >
          Post New Job
        </button>
            </div>

            <Table
              data={sampleData}
              columns={columns}
              dropdownOptions={dropdownOptions}
            />
          </>
        )}
      </section>
      <aside className="w-1/4">
        <Interview />
      </aside>
    </section>
  );
};

export default UploadJob;
