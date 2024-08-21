import React from "react";
import { Banner, Navbar } from "../components";
import UploadJob from "../components/my_jobs/UploadJob";

const UploadJobs = () => {
  return (
    <main>
      <Navbar />
      <Banner />
     <UploadJob />
    </main>
  );
};

export default UploadJobs;
