import React, { useState } from "react";
import section from "../assets/section.png";
import { NavLink, useNavigate } from "react-router-dom";
import InputField from "../components/shared/InputField";
import { useForgotPasswordMutation } from "../services/auth";
import { useDispatch } from "react-redux";
import { toastify } from "../helpers";

const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const [forgotPassword] =useForgotPasswordMutation()


  const forgotPasswordHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      console.log("Email", email)

      if (!email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        toastify('Please enter a valid email address', { type: 'error' });
        return;
      }
      
      const response = await forgotPassword({email}).unwrap();
      console.log("Res from forgotpassword", response);
      toastify(response.message, { type: "success" });
      navigate("/")
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
      <form className="w-1/2 flex p-24 flex-col" onSubmit={forgotPasswordHandler}>
        <img
          width={165}
          className="rounded-full cursor-pointer"
          src="https://static.vecteezy.com/system/resources/previews/011/401/355/non_2x/job-finder-logo-vector.jpg"
          alt="job_finder_logo"
        />
        <h1 className="text-4xl pt-8 text-gray-900 pb-2 font-bold">
          Forgot Password
        </h1>
        <p className="text-gray-500 mb-6">
          You will receive a link in your email to reset your password
        </p>
        <InputField
          name="email"
          label="Email"
          placeholder="E.g. yaa.asantewah@gmail.com"
          value={email}
          className="mt-9"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <div className="flex justify-between">
          <NavLink to={"/"}>
            <p className="text-gray-500 mt-6 text-center mx-0 px-0">
              <span className="text-blue-500 font-medium">
                I remember my password
              </span>{" "}
            </p>
          </NavLink>
        </div>
        <button className="bg-[#007AA9] w-full mt-8 p-5 rounded-lg font-bold text-white text-xl">
          Send Link
        </button>
      </form>

      <img src={section} alt="sign_in banner" className="w-1/2 p-12" />
    </div>
  );
};

export default ForgotPassword;
