import { useState } from "react";
import Interview from "../shared/Interview";
import NewJobForms from "./NewJobForms";
import Table from "../shared/Table";
import {
  useDeleteJobMutation,
  useGetJobsByUserQuery,
  useUpdateJobMutation,
} from "../../services/jobs";
import InputField from "../shared/InputField";
import Modal from "../shared/Modal";
import { useNavigate } from "react-router-dom";
import { toastify } from "../../helpers";

type DropdownOption = {
  label: string | JSX.Element;
  action: (item: any) => void;
};

interface JobData {
  job_title: string;
  country: string;
  city: string;
  job_type: string;
  working_type: string;
  salary: string;
  job_description: string;
  _id: string;
  user: string;
}

const UploadJob = () => {
  const [pageView, setPageView] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedWorkingType, setSelectedWorkingType] = useState("All");
  // Search filters
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState<JobData>({
    job_title: "",
    country: "",
    city: "",
    job_type: "",
    working_type: "",
    salary: "",
    job_description: "",
    _id: "",
    user: "661a7440f34ab18c9e35fcb2",
  });

  const {
    job_title,
    country,
    city,
    working_type,
    salary,
    job_type,
    _id,
    job_description,
  } = formData;

  const { data } = useGetJobsByUserQuery("");
  const [deleteJob] = useDeleteJobMutation();

  const fetchedJobs: JobData[] = data?.jobs;

  const filteredData = fetchedJobs?.filter(
    (job) =>
      job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedWorkingType === "All" ||
        job.working_type === selectedWorkingType)
  );

  const columns = [
    { label: "Job Title", accessor: "job_title" },
    { label: "Country", accessor: "country" },
    { label: "City", accessor: "city" },
    { label: "Job Type", accessor: "job_type" },
    { label: "Date Posted", accessor: "createdAt", isDate: true },
  ];

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

  const editJobHandler = (item: any) => {
    setFormData({ ...item });
    setToggleModal(true);
  };

  const deleteJobHandler = async (item: any) => {

    const {_id, user} = item
    try {
      const res = await deleteJob({_id, user});
      console.log("Deleted o", res)
      toastify("Job deleted successfully.");
    } catch (error) {
      toastify("Something went wrong.");
    }
    console.log("Deleted", item);
  };

  const dropdownOptions = [
    { label: "Edit", action: editJobHandler },
    { label: "Delete", action: deleteJobHandler },
  ];

  const [updateJob] = useUpdateJobMutation();

  const handleUpdateJob: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
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
      const response = await updateJob({ ...formData, _id }).unwrap();
      toastify(response.message, { type: "success" });
      setToggleModal(false);

      // navigate("/upload-jobs")
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
    <section className="bg-gray-50 flex">
      <section className="w-3/4 shadow-md shadow-gray-100">
        {pageView ? (
          <NewJobForms pageView={pageView} setPageView={setPageView} />
        ) : (
          <>
            <div className="flex justify-between items-end mx-6">
              <div>
                <h1 className="font-bold text-lg font-gray-900 mx-3 mt-6">
                  Manage All Jobs You've Posted
                </h1>
                <p className="text-gray-500 mx-3">
                  When a job is edited or deleted, it affects all previously job
                  applications.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPageView(true)}
                className=" bg-[#007AA9] mx-3 font-bold px-6 py-2 text-white text-lg rounded-lg "
              >
                Post New Job
              </button>
            </div>

            {/* Filters */}
            <div className="flex justify-start items-end mx-6 mt-6">
              <div>
                <input
                  placeholder="Search by job title"
                  name="search_term"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  value={searchTerm}
                  type="search"
                  className="bg-white py-3 px-3 shadow-sm w-[400px] border-2 border-gray-100 rounded-lg shadow-gray-100 mr-6"
                />
              </div>
              <InputField
                name="working_type"
                label=""
                type="select"
                className="font-normal"
                options={["Select working type", "Remote", "On-site", "Hybrid"]}
                // options={allCountries}
                value={""}
                // value={formData.working_type}
                onChange={() => {}}
              />
            </div>

            <Table
              data={filteredData}
              columns={columns}
              dropdownOptions={dropdownOptions}
            />
          </>
        )}
      </section>
      <aside className="w-1/4">
        <Interview />
      </aside>

      {/* Modal for editing */}

      <Modal
        isOpen={toggleModal}
        key={Math.random()}
        onClose={() => setToggleModal(false)}
      >
        <div className="w-[80vw] gap-10 md:grid-cols-3">
          {" "}
          <div className="md:col-span-2">
            {" "}
            {/* Form column */}
            <form
              className="grid grid-cols-2 gap-12 m-6"
              onSubmit={handleUpdateJob}
            >
              <div className="col-span-2">
                <h1 className="font-bold mb-2 text-2xl text-gray-900">
                  Edit Job Details
                </h1>
                <p className="text-gray-500">
                  Editing this job will affect the old applications by other
                  users.
                </p>
              </div>
              <InputField
                name="job_title"
                label="Job Title"
                placeholder="E.g., Fullstack Developer"
                value={job_title}
                onChange={handleChange}
              />
              <InputField
                name="country"
                label="Country"
                placeholder="E.g., Ghana"
                value={country}
                onChange={handleChange}
              />
              <InputField
                name="city"
                label="City"
                placeholder="E.g., Accra"
                value={city}
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
                value={job_type}
                onChange={handleChange}
              />
              <InputField
                name="working_type"
                label="Working Type"
                type="select"
                options={["Select working type", "Remote", "On-site", "Hybrid"]}
                value={working_type}
                onChange={handleChange}
              />
              <InputField
                name="salary"
                label="Salary"
                placeholder="E.g., GHS 3,500.00"
                value={salary}
                onChange={handleChange}
              />
              <InputField
                name="job_description"
                label="Job Description"
                type="textarea"
                className="col-span-2"
                placeholder="Enter detailed job description"
                value={job_description}
                onChange={handleChange}
              />
              <div className="col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setToggleModal(false)}
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
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default UploadJob;
