
import Filters from "./Filters";
import GlobalSearch from "./GlobalSearch";
import Interview from "../shared/Interview";
import JobCard from "./JobCard";
import { useGetJobsQuery } from "../../services/jobs";
import Loader from "../shared/Loader";

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
const Jobs = () => {
  const { data, isLoading } = useGetJobsQuery("");

  const jobs: jobDetails[] = data?.jobs;

  console.log("Jobs fetched", data);

  

  return (
    <section className="bg-gray-50 flex">
      <aside className="w-1/4">
        <Filters />
      </aside>
      <section className="w-2/4">
        <GlobalSearch />
       
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
              />
            )
          )
        )}
      </section>
      <aside className="w-1/4">
        <Interview />
      </aside>
    </section>
  );
};

export default Jobs;
