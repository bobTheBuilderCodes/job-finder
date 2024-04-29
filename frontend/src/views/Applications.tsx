import { Banner, Jobs, Navbar } from "../components";
import Application from "../components/applications/Application";
import UserDetails from "../helpers";
import { useGetApplicationByUserQuery } from "../services/applications";

const Applications = () => {

 
  return (
    <main>
      <Navbar />
      <Banner />
      <Application />
    </main>
  );
};

export default Applications;
