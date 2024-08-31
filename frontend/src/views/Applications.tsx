import React from "react";

import { Banner, Jobs, Navbar } from "../components";
import Application from "../components/applications/Application";
import UserDetails from "../helpers";
import { useGetApplicationByUserQuery } from "../services/applications";
import { useResponsiveJSX } from "../components/shared/useResponsiveJSX";
import MobileNavigation from "../components/shared/MobileTabs";

const Applications = () => {

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
        <p>Applications not done</p>
        <MobileNavigation />
      </main>
    )}
    {breakpoint === 1 && <main> Tablet view </main>}
    {breakpoint === 2 && (
      <main>
        <Application />
      </main>
    )}
    {breakpoint === 2 && (
      <main>
        <Application />
      </main>
    )}
    {breakpoint === 3 && (
      <main>
        <Application />
      </main>
    )}
  </>
  );
};

export default Applications;
