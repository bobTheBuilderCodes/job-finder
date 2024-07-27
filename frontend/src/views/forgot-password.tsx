import React, { useState } from "react";
import section from "../assets/section.png";
import { NavLink, useNavigate } from "react-router-dom";
import InputField from "../components/shared/InputField";
import { useForgotPasswordMutation } from "../services/auth";
import { toastify } from "../helpers";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [forgotPassword] = useForgotPasswordMutation();

  const forgotPasswordHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    try {
      e.preventDefault();

      if (
        !email.trim() ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
      ) {
        toastify("Please enter a valid email address", { type: "error" });
        return;
      }

      const response = await forgotPassword({ email }).unwrap();

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
        onSubmit={forgotPasswordHandler}
      >
        <img
          width={140}
          className="rounded-full cursor-pointer mx-auto lg:mx-0"
          src="https://static.vecteezy.com/system/resources/previews/011/401/355/non_2x/job-finder-logo-vector.jpg"
          alt="job_finder_logo"
        />
        <h1 className="text-4xl pt-8 text-gray-900 pb-2 font-bold text-center lg:text-left">
          Forgot Password
        </h1>
        <p className="text-gray-500 mb-6 text-center lg:text-left">
          You will receive a link in your email to reset your password
        </p>
        <InputField
          name="email"
          label="Email"
          placeholder="E.g. yaa.asantewah@gmail.com"
          value={email}
          className="w-full mt-9"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-between">
          <NavLink to={"/"}>
            <p className="text-gray-500 mt-6 text-center lg:text-left">
              <span className="text-blue-500 font-medium">
                I remember my password
              </span>{" "}
            </p>
          </NavLink>
        </div>
        <button className="bg-[#007AA9] w-full mt-8 p-3 rounded-lg font-bold text-white text-xl">
          Send Link
        </button>
      </form>

      <div className="hidden lg:block w-full lg:w-1/2 p-12">
        <img src={section} alt="sign_in banner" />
      </div>
    </div>
  );
};

export default ForgotPassword;
