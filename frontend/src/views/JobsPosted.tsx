import React from "react";
import { Banner, Jobs, Navbar } from "../components";
import { useResponsiveJSX } from "../components/shared/useResponsiveJSX";
import MobileNavigation from "../components/shared/MobileTabs";

const JobsPosted = () => {
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
          <p>Check back later...</p>
          <MobileNavigation />
        </main>
      )}
      {breakpoint === 1 && <main> Tablet view </main>}
      {breakpoint === 2 && (
        <main>
          <Jobs />
        </main>
      )}
      {breakpoint === 2 && (
        <main>
          <Jobs />
        </main>
      )}
      {breakpoint === 3 && (
        <main>
          <Jobs />
        </main>
      )}
    </>
  );
};

export default JobsPosted;
