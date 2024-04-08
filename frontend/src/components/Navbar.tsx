import { NavLink, redirect } from "react-router-dom";

const Navbar = () => {

  const pending= "p-3 hover:bg-gray-100"
  const active = "p-3 hover:bg-gray-100 border-b-4 border-[#007AA9]"
  return (
    <nav className="h-[8vh] px-4 border-2 border-gray-100 flex justify-between items-center">
      <NavLink to={'/jobs'}>

      <img
        width={75}
        className="rounded-full cursor-pointer"
        src="https://static.vecteezy.com/system/resources/previews/011/401/355/non_2x/job-finder-logo-vector.jpg"
        alt="job_finder_logo"
        />
        </NavLink>

      {/* Nav items */}
      <ul className="flex w-auto justify-between text-gray-500 font-medium cursor-pointer items-start -mb-3">
      <NavLink
          to="/jobs"
          className={({ isActive, isPending }) =>
            isActive ? active : pending
          }
        >
          Find Jobs
        </NavLink>
        <NavLink
          to="/talents"
          className={({ isActive, isPending }) =>
            isActive ? active : pending
          }
        >
          Find Talent
        </NavLink>
        <NavLink
          to="/applications"
          className={({ isActive, isPending }) =>
            isActive ? active : pending
          }
        >
          My Applications
        </NavLink>
        {/* <li className="p-3 hover:bg-gray-100 rounded-lg">Upload Job</li> */}
        <NavLink
          to="/upload-jobs"
          className={({ isActive, isPending }) =>
            isActive ? active : pending
          }
        >
          Upload Job
        </NavLink>
        
      </ul>

      {/* Profile and notifications */}
      <h1 className="bg-gray-200 p-3 w-12 h-12 flex justify-center item text-gray-700 rounded-full font-bold">
        Rob
      </h1>
    </nav>
  );
};

export default Navbar;
