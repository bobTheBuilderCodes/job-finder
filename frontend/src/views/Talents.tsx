import React from "react";
import { Banner, Navbar } from "../components";
import Talent from "../components/talents/Talent";
import { useResponsiveJSX } from "../components/shared/useResponsiveJSX";
import MobileNavigation from "../components/shared/MobileTabs";
import MobileNavbar from "../components/shared/MobileNavbar";

const Talents = () => {

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
           <MobileNavbar />
          <p>Talents not done</p>
          <MobileNavigation />
        </main>
      )}
      {breakpoint === 1 && <main> Tablet view </main>}
      {breakpoint === 2 && (
        <main>
          <Talent />
        </main>
      )}
      {breakpoint === 2 && (
        <main>
          <Talent />
        </main>
      )}
      {breakpoint === 3 && (
        <main>
          <Talent />
        </main>
      )}
    </>
  );
};

export default Talents;
