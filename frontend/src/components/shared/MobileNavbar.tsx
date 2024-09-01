import React from "react";

import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const MobileNavbar = () => {

  return (
    <nav className="min-h-[8vh] px-6 py-3 border-2 border-gray-100 flex justify-between items-center sticky top-0 bg-white">
      <NavLink to={'/jobs'}>

      <img
        width={55}
        className="rounded-full cursor-pointer"
        src="https://static.vecteezy.com/system/resources/previews/011/401/355/non_2x/job-finder-logo-vector.jpg"
        alt="job_finder_logo"
        />
        </NavLink>

    

      {/* Profile and notifications */}
      <ProfileDropdown avatarUrl="https://via.placeholder.com/150" />
    </nav>
  );
};

export default MobileNavbar;
