import React, { useState } from "react";
import section from "../assets/section.png";
import { NavLink, useNavigate } from "react-router-dom";
import InputField from "../components/shared/InputField";
import { useSignupMutation } from "../services/auth";
import { toastify } from "../helpers";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { fullname, email, password } = formData;

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

  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const signUpHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const response = await signup(formData).unwrap();

      toastify(response.message, { type: "success" });
      navigate("/");
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
    <div className="w-screen flex flex-col lg:flex-row items-center lg:h-screen p-6 lg:p-24">
      <form
        className="w-full lg:w-1/2 flex flex-col lg:p-24 pt-8 lg:pt-16"
        onSubmit={signUpHandler}
      >
        <img
          width={140}
          className="rounded-full cursor-pointer mx-auto lg:mx-0"
          src="https://static.vecteezy.com/system/resources/previews/011/401/355/non_2x/job-finder-logo-vector.jpg"
          alt="job_finder_logo"
        />
        <h1 className="text-4xl pt-8 text-gray-900 pb-2 font-bold text-center lg:text-left">
          Create Free Account
        </h1>
        <p className="text-gray-500 mb-6 text-center lg:text-left">
          It's easy and free. Enjoy unlimited job opportunities.
        </p>
        <InputField
          name="fullname"
          label="Fullname"
          placeholder="E.g. Yaa Asantewah"
          value={fullname}
          className="w-full"
          onChange={handleChange}
        />
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
        <div className="flex flex-col lg:flex-row justify-between">
          <NavLink to={"/"}>
            <p className="text-gray-500 mt-6 text-left lg:text-left">
              <span className="text-blue-500 font-medium">
                Already have an account
              </span>{" "}
            </p>
          </NavLink>
        </div>
        <button className="bg-[#007AA9] w-full mt-6 p-3 rounded-lg font-bold text-white text-xl">
          Sign up
        </button>
      </form>
      <div className="hidden lg:block w-full lg:w-1/2 p-12">
        <img src={section} alt="sign_in banner" />
      </div>
    </div>
  );
};

export default Signup;
