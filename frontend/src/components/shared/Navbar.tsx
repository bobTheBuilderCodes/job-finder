import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {

  const pending= "p-3 hover:bg-gray-100"
  const active = "p-3 hover:bg-gray-100 border-b-4 border-[#007AA9]"
  return (
    <nav className="h-[8vh] px-4 border-2 border-gray-100 flex justify-between items-center sticky top-0 bg-white">
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
        
        <NavLink
          to="/upload-jobs"
          className={({ isActive, isPending }) =>
            isActive ? active : pending
          }
        >
         My Jobs
        </NavLink>
        
      </ul>

      {/* Profile and notifications */}
      <ProfileDropdown avatarUrl="https://via.placeholder.com/150" />
    </nav>
  );
};

export default Navbar;
