import React from "react";
import section from "../assets/section.png";
import { NavLink } from "react-router-dom";

const Signin = () => {
  return (
    <div className="w-screen flex items-center h-screen p-24">
      <form className="w-1/2 flex p-24 flex-col">
        <img
          width={165}
          className="rounded-full cursor-pointer"
          src="https://static.vecteezy.com/system/resources/previews/011/401/355/non_2x/job-finder-logo-vector.jpg"
          alt="job_finder_logo"
        />
        <h1 className="text-4xl pt-8 text-gray-900 pb-2 font-bold">
          Glad you're here, log in!
        </h1>
        <p className="text-gray-500 mb-6">Enter email and password to log in</p>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="font-medium text-gray-900 mb-3 text-lg"
          >
            Email
          </label>
          <input
            placeholder="Eg. philomena@gmail.com"
            className=" bg-white  outline-1 outline-gray-200 appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-[500px]"
          />
        </div>
        <div className="flex flex-col mt-6">
          <label
            htmlFor="password"
            className="font-medium text-gray-900 mb-3 text-lg"
          >
            Password
          </label>
          <input
            placeholder="Eg. kfga90eR4I459r"
            className=" bg-white  outline-1 outline-gray-200 appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-[500px]"
          />
        </div>
        <div className="flex justify-between">
          <NavLink to={"/signup"}>
            <p className="text-gray-500 mt-6 text-center mx-0 px-0">
              <span className="text-blue-500 font-medium">
                Create Free Account
              </span>{" "}
            </p>
          </NavLink>
          <NavLink to={"/forgot-password"}>
            <p className="text-gray-500 mt-6 text-end mx-0 px-0">
              <span className="text-blue-500 font-medium">Forgot Password</span>{" "}
            </p>
          </NavLink>
        </div>
        <button className="bg-[#007AA9] w-[500px] mt-8 p-5 rounded-lg font-bold text-white text-xl">
          Sign in
        </button>
      </form>

      <img src={section} alt="sign_in banner" className="w-1/2 p-12" />
    </div>
  );
};

export default Signin;
