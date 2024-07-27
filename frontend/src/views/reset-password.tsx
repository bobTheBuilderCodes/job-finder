import React, { useState } from "react";
import section from "../assets/section.png";
import InputField from "../components/shared/InputField";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

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

  return (
    <div className="w-screen flex flex-col lg:flex-row items-center lg:h-screen p-6 lg:p-24">
      <form className="w-full lg:w-1/2 flex flex-col lg:p-24 pt-8 lg:pt-16">
        <img
          width={140}
          className="rounded-full cursor-pointer mx-auto lg:mx-0"
          src="https://static.vecteezy.com/system/resources/previews/011/401/355/non_2x/job-finder-logo-vector.jpg"
          alt="job_finder_logo"
        />
        <h1 className="text-4xl pt-8 text-gray-900 pb-2 font-bold text-center lg:text-left">
          Reset Password
        </h1>
        <p className="text-gray-500 mb-6 text-center lg:text-left">
          Enter your new password. You will need this for your next log in
        </p>
        <InputField
          name="password"
          label="Password"
          placeholder="E.g. ************"
          type="password"
          value={password}
          className="w-full mt-4"
          onChange={handleChange}
        />
        <InputField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="E.g. ************"
          type="password"
          value={confirmPassword}
          className="w-full mt-4"
          onChange={handleChange}
        />
        <button className="bg-[#007AA9] w-full mt-8 p-3 rounded-lg font-bold text-white text-xl mb-6">
          Save new password
        </button>
      </form>

      <div className="hidden lg:block w-full lg:w-1/2 p-12">
        <img src={section} alt="sign_in banner" />
      </div>
    </div>
  );
};

export default ResetPassword;
