import React, { useState } from "react";
import section from "../assets/section.png";
import { NavLink, useNavigate } from "react-router-dom";
import InputField from "../components/shared/InputField";
import { useLoginMutation } from "../services/auth";
import { toastify } from "../helpers";
import { useDispatch } from "react-redux";
import { setUser } from "../app/userSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import jwtDecode from "jwt-decode";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const response = await login(formData).unwrap();

      dispatch(setUser(response.userDetails));
      localStorage.setItem("user", JSON.stringify(response.userDetails));
      toastify(response.message, { type: "success" });
      navigate("/jobs");
    } catch (err: any) {
      if (err.data && err.data.message) {
        toastify(err.data.message, { type: "error" });
      } else if (err.status === "FETCH_ERROR") {
        toastify("Network error: Unable to connect to the server", {
          type: "error",
        });
      } else {
        toastify("An unexpected error occurred", { type: "error" });
      }
    }
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = fetch("https://www.googleapis.com/oauth2/v3/userinfo");
      } catch (err: any) {
        toastify(err);
      }
    },
  });

  return (
    <div className="w-screen flex flex-col lg:flex-row items-center lg:h-screen p-6 lg:p-24">
      <form
        className="w-full lg:w-1/2 flex flex-col p-0 lg:p-24 pt-8 lg:pt-16"
        onSubmit={loginHandler}
      >
        <img
          width={140}
          className="rounded-full cursor-pointer mx-auto lg:mx-0"
          src="https://static.vecteezy.com/system/resources/previews/011/401/355/non_2x/job-finder-logo-vector.jpg"
          alt="job_finder_logo"
        />
        <h1 className="text-4xl pt-8 text-gray-900 pb-2 font-bold text-center lg:text-left">
          Glad you're here, log in!
        </h1>
        <p className="text-gray-500 mb-3 text-center lg:text-left">
          Enter email and password to log in
        </p>
        <InputField
          name="email"
          label="Email"
          placeholder="E.g. yaa.asantewah@gmail.com"
          value={email}
          className="mt-4 w-full"
          onChange={handleChange}
        />
        <InputField
          name="password"
          label="Password"
          placeholder="E.g. ************"
          type="password"
          value={password}
          className="mt-4 w-full"
          onChange={handleChange}
        />
        <div className="flex flex-row lg:flex-row justify-between">
          <NavLink to={"/signup"}>
            <p className="text-gray-500 mt-6 text-center lg:text-left">
              <span className="text-blue-500 font-medium">
                Create Free Account
              </span>{" "}
            </p>
          </NavLink>
          <NavLink to={"/forgot-password"}>
            <p className="text-gray-500 mt-6 text-center lg:text-right">
              <span className="text-blue-500 font-medium">Forgot Password</span>{" "}
            </p>
          </NavLink>
        </div>
        <button className="bg-[#007AA9] w-full mt-8 p-3 rounded-lg font-bold text-white text-xl mb-6">
          Sign in
        </button>
        <button
          onClick={() => googleLoginHandler()}
          className="flex items-center justify-center bg-white w-full p-3 rounded-lg font-bold text-gray-700 text-xl mb-6 border-2"
        >
          <span className="mr-6 text-3xl">
            <FcGoogle />
          </span>
          Sign in with Google
        </button>
      </form>
      <div className="hidden lg:block w-full lg:w-1/2 p-12">
        <img src={section} alt="sign_in banner" />
      </div>
    </div>
  );
};

export default Signin;
