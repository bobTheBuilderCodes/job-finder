import React, { useState } from "react";
import section from "../assets/section.png";
import { NavLink, useNavigate } from "react-router-dom";
import InputField from "../components/shared/InputField";
import { useLoginMutation } from "../services/auth";
import { toastify } from "../helpers";
import { useDispatch } from "react-redux";
import { setUser } from "../app/userSlice";

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

  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const loginHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const response = await login(formData).unwrap();
      console.log("Res from signin", response);
      dispatch(setUser(response.userDetails));
      localStorage.setItem("user", JSON.stringify(response.userDetails))
      toastify(response.message, { type: "success" });
      navigate("/jobs")
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


  return (
    <div className="w-screen flex items-center h-screen p-24">
      <form className="w-1/2 flex p-24 flex-col" onSubmit={loginHandler}>
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
        
        <InputField
          name="email"
          label="Email"
          placeholder="E.g. yaa.asantewah@gmail.com"
          value={email}
          className="mt-9"
          onChange={handleChange}
        />
        <InputField
          name="password"
          label="Password"
          placeholder="E.g. ************"
          type="password"
          value={password}
          className="mt-9"
          onChange={handleChange}
        />
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
        <button className="bg-[#007AA9] w-full mt-8 p-5 rounded-lg font-bold text-white text-xl">
          Sign in
        </button>
      </form>

      <img src={section} alt="sign_in banner" className="w-1/2 p-12" />
    </div>
  );
};

export default Signin;
