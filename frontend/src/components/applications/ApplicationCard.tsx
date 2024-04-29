import { formatCreatedAt } from "../../helpers";
import { useGetJobQuery } from "../../services/jobs";

interface applicationProps {
  email: string,
  createdAt: string,
  jobId: string,
  status: "pending review" | "shortlisted for interview" |  "rejected"
}


const ApplicationCard = ({status, jobId, createdAt}: applicationProps) => {

  const {data} = useGetJobQuery(jobId)
  const jobApplied = data?.job?.job_title
  console.log("Details", jobApplied)
  return (
    
    <section className="shadow-sm border-2 border-gray-100 p-4 m-3 bg-white rounded-lg flex items-start mx-6">
      <h1 className="h-12 w-12 bg-gray-100 rounded-lg flex items-center font-bold justify-center text-4xl">
       {jobApplied?.split("")[0]}
      </h1>
      <div className="ml-4">
        <h1 className="font-bold text-lg font-gray-900 ">{jobApplied || "N/A"}</h1>
        <p className="text-gray-500"> <span className="font-semibold">Applied on </span>: {formatCreatedAt(createdAt)}</p>
        <div className="flex">
          <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mt-3">
          {status}
          </p>
         
          
        </div>
      </div>
    </section>
  );
};

export default ApplicationCard;
