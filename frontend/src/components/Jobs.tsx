import Filters from "./Filters";
import GlobalSearch from "./GlobalSearch";
import Interview from "./Interview";
import JobCard from "./JobCard";

const Jobs = () => {
  return (
    <section className="bg-gray-50 flex">
      <aside className="w-1/4">
        <Filters />
      </aside>
      <section className="w-2/4">
        <GlobalSearch />
        <JobCard />
        <JobCard />
        <JobCard />
      </section>
      <aside className="w-1/4">
       <Interview />
      </aside>
    </section>
  );
};

export default Jobs;
