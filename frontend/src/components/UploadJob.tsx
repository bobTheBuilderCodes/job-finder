import { useState } from "react";
import Interview from "./Interview";
import NewJobForms from "./NewJobForms";

const UploadJob = () => {
  const [pageView, setPageView] = useState(true)
  return (
    <section className="bg-gray-50 flex">
      <section className="w-3/4 shadow-md shadow-gray-100">
        {
          pageView ? 
          <NewJobForms pageView={pageView} setPageView={setPageView} /> : <h1>Table view</h1>
        }
      </section>
      <aside className="w-1/4">
        <Interview />
      </aside>
    </section>
  );
};

export default UploadJob;
