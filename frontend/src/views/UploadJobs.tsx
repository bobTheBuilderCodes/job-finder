import React from "react";
import { Banner, Navbar } from "../components";
import UploadJob from "../components/my_jobs/UploadJob";
import MobileNavigation from "../components/shared/MobileTabs";
import { useResponsiveJSX } from "../components/shared/useResponsiveJSX";

const UploadJobs = () => {

  const breakpoint = useResponsiveJSX([600, 1024, 1440, 1920]);
  const showCommonContent = (
    <>
      <Navbar /> <Banner />
    </>
  );
  return (
    <>
    {breakpoint !== 0 && showCommonContent}
    {breakpoint === 0 && (
      <main className="">
        <p>Jobs? Hmm but you already have a job.</p>
        <MobileNavigation />
      </main>
    )}
    {breakpoint === 1 && <main> Tablet view </main>}
    {breakpoint === 2 && (
      <main>
        <UploadJob />
      </main>
    )}
    {breakpoint === 2 && (
      <main>
        <UploadJob />
      </main>
    )}
    {breakpoint === 3 && (
      <main>
        <UploadJob />
      </main>
    )}
  </>
  );
};

export default UploadJobs;
