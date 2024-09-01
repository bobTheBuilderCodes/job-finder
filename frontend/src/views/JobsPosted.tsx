import React from "react";
import { Banner, Jobs, Navbar } from "../components";
import { useResponsiveJSX } from "../components/shared/useResponsiveJSX";
import MobileNavigation from "../components/shared/MobileTabs";
import MobileNavbar from "../components/shared/MobileNavbar";
import GlobalSearch from "../components/find_jobs/GlobalSearch";
import { useGetJobsQuery } from "../services/jobs";
import Loader from "../components/shared/Loader";
import JobCard from "../components/find_jobs/JobCard";

const JobsPosted = () => {
  const { data, isLoading } = useGetJobsQuery("");

  interface jobDetails {
    _id: string;
    job_title: string;
    city: string;
    country: string;
    working_type: string;
    job_type: string;
    job_description: string;
    createdAt: string;
  }

  const jobs: jobDetails[] = data?.jobs;

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
        <section className="bg-gray-100">
          <MobileNavbar />
          <GlobalSearch />

<main className="mx-3">


          {isLoading ? (
            <Loader />
          ) : (
            jobs?.map(
              ({
                _id,
                job_title,
                city,
                country,
                working_type,
                job_type,
                job_description,
                createdAt,
              }) => (
                <JobCard
                  key={_id}
                  job_title={job_title}
                  city={city}
                  country={country}
                  working_type={working_type}
                  job_type={job_type}
                  job_description={job_description}
                  createdAt={createdAt}
                  _id={_id}
                />
              )
            )
          )}
   </main>     

          <MobileNavigation />
        </section>
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
