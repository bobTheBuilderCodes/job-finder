import React, { FormEvent, useState } from "react";
import { usePostJobMutation } from "../../services/jobs";
import UserDetails, { toastify } from "../../helpers";
import InputField from "../shared/InputField";
import { useNavigate } from "react-router-dom";

interface JobData {
  job_title: string;
  country: string;
  city: string;
  job_type: string;
  working_type: string;
  salary: string;
  job_description: string;
  user: string | number | undefined;
}

const NewJobForms: React.FC<{
  pageView: boolean;
  setPageView: (view: boolean) => void;
}> = ({ setPageView }) => {

  const {loggedinUser} = UserDetails()
  const [formData, setFormData] = useState<JobData>({
    job_title: "",
    country: "",
    city: "",
    job_type: "",
    working_type: "",
    salary: "",
    job_description: "",
    user: loggedinUser?.userId,
  });

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

  const [postJob] = usePostJobMutation();

    const navigate = useNavigate()

  const handlePostJob: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Validate before sending
    if (
      formData.job_type === "Select job type" ||
      formData.working_type === "Select working type"
    ) {
      toastify("Please select valid options for job type and working type.");
      return;
    }

    try {
      const response = await postJob(formData).unwrap();
      toastify(response.message, { type: "success" });
      navigate("/jobs")
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
    <form className="grid grid-cols-2 gap-12 m-6" onSubmit={handlePostJob}>
      <div className="col-span-2">
        <h1 className="font-bold mb-2 text-2xl text-gray-900">Post New Job</h1>
        <p className="text-gray-500">
          Post a new job today. There are thousands of people looking for
          opportunities!
        </p>
      </div>
      <InputField
        name="job_title"
        label="Job Title"
        placeholder="E.g., Fullstack Developer"
        value={formData.job_title}
        onChange={handleChange}
      />
      <InputField
        name="country"
        label="Country"
        placeholder="E.g., Ghana"
        value={formData.country}
        onChange={handleChange}
      />
      <InputField
        name="city"
        label="City"
        placeholder="E.g., Accra"
        value={formData.city}
        onChange={handleChange}
      />
      <InputField
        name="job_type"
        label="Job Type"
        type="select"
        options={[
          "Select job type",
          "Full-time",
          "Part-time",
          "Internship",
          "Volunteer",
        ]}
        value={formData.job_type}
        onChange={handleChange}
      />
      <InputField
        name="working_type"
        label="Working Type"
        type="select"
        options={["Select working type", "Remote", "On-site", "Hybrid"]}
        value={formData.working_type}
        onChange={handleChange}
      />
      <InputField
        name="salary"
        label="Salary"
        placeholder="E.g., GHS 3,500.00"
        value={formData.salary}
        onChange={handleChange}
      />
      <InputField
        name="job_description"
        label="Job Description"
        type="textarea" className="col-span-2"
        placeholder="Enter detailed job description"
        value={formData.job_description}
        onChange={handleChange}
      />
      <div className="col-span-2 flex justify-end">
        <button
          type="button"
          onClick={() => setPageView(false)}
          className="border-2 border-[#007AA9] mx-6 font-bold px-6 py-2 text-[#007AA9] text-lg rounded-lg transition-colors duration-300 hover:bg-[#007AA9] hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#007AA9] font-bold px-6 py-2 text-white text-lg rounded-lg "
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewJobForms;
