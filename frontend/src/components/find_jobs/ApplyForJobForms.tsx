import React, { useState } from "react";
import InputField from "../shared/InputField";
import { useApplyMutation } from "../../services/applications";
import UserDetails, { toastify } from "../../helpers";

interface ApplyForJobFormsProps {
  pageView: boolean;
  setPageView: (view: boolean) => void;
  jobId: string
  toggleModal: boolean,
  setToggleModal: (toggle: boolean) => void
}

const ApplyForJobForms: React.FC<ApplyForJobFormsProps> = ({
  pageView,
  setPageView, jobId, toggleModal , setToggleModal
}) => {

  const {loggedinUser} = UserDetails()
  const [formData, setFormData] = useState({
    fullname: loggedinUser?.fullname as string,
    email: "",
    address: "",
    salary_expectation: "",
    cover_letter: "",
    user: loggedinUser?.userId,
  jobId

  });

  const {
    fullname,
    email,
    address,
    salary_expectation,
    cover_letter,
  } = formData;

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


  // Apply for job
const [apply] = useApplyMutation()

const handleApplyJob: React.FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();

  console.log("Job id", jobId)
  try {
    const response = await apply(formData).unwrap();
    toastify(response.message, { type: "success" });
    // setPageView(false);
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
    <form className="grid grid-cols-2 gap-12 m-1" onSubmit={handleApplyJob}>
      <div className="col-span-2">
        <h1 className="font-bold mb-2 text-2xl text-gray-900 col-span-2">
          Application Details for UX Strategist Role
        </h1>
        <p className="text-gray-500 col-span-2">
          Posted by James Thomas 2 hours ago
        </p>
      </div>
      <InputField
        name="fullname"
        label="Fullname"
        placeholder="E.g., Fullstack Developer"
        value={fullname}
        onChange={handleChange}
      />
      <InputField
        name="email"
        label="Email"
        placeholder="E.g. robert@gmail.com"
        value={email}
        onChange={handleChange}
      />
      <InputField
        name="address"
        label="Address"
        placeholder="E.g. ama akroma"
        value={address}
        onChange={handleChange}
      />

      <InputField
        name="salary_expectation"
        label="Salary Expectation"
        placeholder="E.g. GHC 3400"
        value={salary_expectation}
        onChange={handleChange}
      />
      <div className="flex flex-col col-span-2">
        <label
          htmlFor="job_description"
          className="font-medium text-gray-900 mb-3 text-lg"
        >
          Cover Letter
        </label>
        <textarea value={cover_letter} name="cover_letter" onChange={handleChange}
          placeholder="Why should we hire you?"
          className=" bg-white resize-none h-32 outline-1 outline-gray-200 bb appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
        ></textarea>
      </div>
      <div className="col-span-2 flex justify-end">
        <button type="reset"
          onClick={(e) => setToggleModal(false)}
          className="border-2 border-[#007AA9] mx-6 font-bold px-6 py-2 text-[#007AA9] text-lg rounded-lg transition-colors duration-300 hover:bg-[#007AA9] hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={(e) => setPageView(!pageView)}
          className="bg-[#007AA9] font-bold px-6 py-2 text-white text-lg rounded-lg"
        >
          Apply For Job
        </button>
      </div>
    </form>
  );
};

export default ApplyForJobForms;
