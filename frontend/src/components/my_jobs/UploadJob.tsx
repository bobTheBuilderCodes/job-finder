import React, { useState, useEffect } from "react";
import Interview from "../shared/Interview";
import NewJobForms from "./NewJobForms";
import Table from "../shared/Table";
import { useDeleteJobMutation, useGetApplicationsForJobQuery, useGetJobsByUserQuery, useUpdateJobMutation } from "../../services/jobs";
import InputField from "../shared/InputField";
import Modal from "../shared/Modal";
import { useNavigate } from "react-router-dom";
import UserDetails, { toastify } from "../../helpers";
import { useApproveApplicationMutation, useRejectApplicationMutation } from "../../services/applications";

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
  user: string | number | undefined;
}

const UploadJob = () => {
  const [pageView, setPageView] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleApplicationsModal, setToggleApplicationsModal] = useState(false);
  const [selectedWorkingType, setSelectedWorkingType] = useState("All");
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const { loggedinUser } = UserDetails();
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
    user: loggedinUser?.userId,
  });

  const { job_title, country, city, working_type, salary, job_type, _id, job_description } = formData;

  const { data } = useGetJobsByUserQuery(loggedinUser?.userId);
  const [deleteJob] = useDeleteJobMutation();

  const { data: applicationsForJob, error: applicationsError, refetch: refetchApplications } = useGetApplicationsForJobQuery(selectedJobId ?? "", {
    skip: !selectedJobId,
  });

  useEffect(() => {
    if (selectedJobId) {
      refetchApplications();
    }
  }, [selectedJobId, refetchApplications]);

  useEffect(() => {
    if (applicationsForJob) {
      setApplications(applicationsForJob.applicationsForJob || []);
    }
  }, [applicationsForJob]);

  const fetchedJobs: JobData[] = data?.jobs;

  const filteredData = fetchedJobs?.filter(
    (job) =>
      job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedWorkingType === "All" || job.working_type === selectedWorkingType)
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

  const resetFormData = () => {
    setFormData({
      job_title: "",
      country: "",
      city: "",
      job_type: "",
      working_type: "",
      salary: "",
      job_description: "",
      _id: "",
      user: loggedinUser?.userId,
    });
  };

  const editJobHandler = (item: any) => {
    setFormData({ ...item });
    setToggleModal(true);
  };

  const viewApplicationHandler = (item: any) => {
    setSelectedJobId(item._id);
    setToggleApplicationsModal(true);
  };

  const deleteJobHandler = async (item: any) => {
    const { _id, user } = item;
    try {
      const res = await deleteJob({ _id, user });
      toastify("Job deleted successfully.");
    } catch (error) {
      toastify("Something went wrong.");
    }
  };

  const dropdownOptions = [
    { label: "Applications", action: viewApplicationHandler },
    { label: "Edit job", action: editJobHandler },
    { label: "Delete job", action: deleteJobHandler },
  ];

  const [updateJob] = useUpdateJobMutation();
  const [approveApplication] = useApproveApplicationMutation()
  const [rejectApplication] = useRejectApplicationMutation()

  const handleUpdateJob: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  
    if (formData.job_type === "Select job type" || formData.working_type === "Select working type") {
      toastify("Please select valid options for job type and working type.");
      return;
    }
  
    try {
      const response = await updateJob({ ...formData, _id }).unwrap();
      toastify(response.message, { type: "success" });
      setToggleModal(false);
      window.location.reload();  // Refresh page on modal close
    } catch (err: any) {
      if (err.data && err.data.message) {
        toastify(err.data.message, { type: "error" });
      } else if (err.status === "FETCH_ERROR") {
        toastify("Network error: Unable to connect to the server", { type: "error" });
      } else {
        toastify("An unexpected error occurred", { type: "error" });
      }
    }
  };
  
  const handleApproveApplication = async (item: any) => {
    try {
      const response = await approveApplication({ _id: item._id }).unwrap();
      toastify(response.message, { type: "success" });
      setToggleApplicationsModal(false);
      window.location.reload();  // Refresh page on modal close
    } catch (err: any) {
      if (err.data && err.data.message) {
        toastify(err.data.message, { type: "error" });
      } else if (err.status === "FETCH_ERROR") {
        toastify("Network error: Unable to connect to the server", { type: "error" });
      } else {
        toastify("An unexpected error occurred", { type: "error" });
      }
    }
  };
  
  const handleRejectApplication = async (item: any) => {
    try {
      const response = await rejectApplication({ _id: item._id }).unwrap();
      toastify(response.message, { type: "success" });
      setToggleApplicationsModal(false);
      window.location.reload();  // Refresh page on modal close
    } catch (err: any) {
      if (err.data && err.data.message) {
        toastify(err.data.message, { type: "error" });
      } else if (err.status === "FETCH_ERROR") {
        toastify("Network error: Unable to connect to the server", { type: "error" });
      } else {
        toastify("An unexpected error occurred", { type: "error" });
      }
    }
  };
  


  const downloadResume = () => {}



  const handleCloseApplicationsModal = () => {
    setToggleApplicationsModal(false);
    window.location.reload();  
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
                value={selectedWorkingType}
                onChange={(e) => setSelectedWorkingType(e.target.value)}
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

      <Modal
        isOpen={toggleModal}
        key={selectedJobId}
        onClose={() => {
          setToggleModal(false);
          resetFormData();
          window.location.reload();  // Refresh page on modal close
        }}
      >
        <div className="w-[80vw] gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <form className="grid grid-cols-2 gap-12 m-6" onSubmit={handleUpdateJob}>
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
                  onClick={() => {
                    setToggleModal(false);
                    resetFormData();
                    window.location.reload();  // Refresh page on modal close
                  }}
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

      <Modal
        isOpen={toggleApplicationsModal}
        key={selectedJobId + "_applications"}
        onClose={handleCloseApplicationsModal}
      >
        <div className="w-[96vw]">
          <h1 className="font-bold mb-2 text-2xl text-gray-900">
            {selectedJobId ? fetchedJobs.find(job => job._id === selectedJobId)?.job_title : ""}
          </h1>
          <p className="text-gray-500">View all applications for this job.</p>
          {applications.length > 0 ? (
            <Table
              data={applications}
              columns={[
                { label: "Applicant Name", accessor: "fullname" },
                { label: "Email", accessor: "email" },
                { label: "Address", accessor: "address" },
                { label: "Date Applied", accessor: "createdAt", isDate: true },
                { label: "Status", accessor: "status" },
              ]}
              dropdownOptions={[
                { label: "Download Resume", action: downloadResume },
                { label: "Invite for interview", action: handleApproveApplication },
                { label: "Reject application", action: handleRejectApplication },
              ]}
            />
          ) : (
            <p className="text-gray-500">No applications found for this job.</p>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default UploadJob;
