import { useState } from "react";
import Modal from "./Modal";
import ApplyForJobForms from "./ApplyForJobForms";

const JobCard = () => {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <section
        onClick={() => setToggleModal(true)}
        className="bg-white px-4 py-8 m-6 shadow-md shadow-gray-100 flex rounded-lg cursor-pointer"
      >
        <div className="bg-[#007AA9] max-h-10 min-w-10 rounded-md mr-4 font-bold text-xl flex justify-center items-center text-white">
          U
        </div>
        <div>
          <div className="flex justify-between">
            <h1 className="font-bold text-lg font-gray-900 mb-3">
              Developer Bob
            </h1>
            <div>
              <h1 className="font-medium text-md text-gray-500 ">
                Accra, Ghana
              </h1>
              <p className="text-gray-400 text-sm list-disc"> 5 minutes ago</p>
            </div>
          </div>
          <span className="bg-gray-100 px-2 py-1 mt-6 max-w-auto font-semibold text-gray-700">
            Full-time
          </span>

          <p className="text-gray-500 list-disc mt-3">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout...
          </p>
        </div>
      </section>
      <Modal
        isOpen={toggleModal}
        key={Math.random()}
        onClose={() => setToggleModal(false)}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3"> {/* Specify grid columns */}
          <div className="md:col-span-2"> {/* Form column */}
            <ApplyForJobForms pageView={true} setPageView={()=>{}} key={Math.random()} />
          </div>
          <div className="md:col-span-1 md:text-gray-500 md:pl-4"> {/* Job description column */}
            <h1 className="font-bold text-lg text-gray-900 mb-4">
              Job Description
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint amet
              fugit officiis aspernatur quis, eaque quidem ducimus. Ab velit
              vero placeat iste provident ea exercitationem minus blanditiis.
              Error, cum nobis.
            </p>
            
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint amet
              fugit officiis aspernatur quis, eaque quidem ducimus. Ab velit
              vero placeat iste provident ea exercitationem minus blanditiis.
              Error, cum nobis.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint amet
              fugit officiis aspernatur quis, eaque quidem ducimus. Ab velit
              vero placeat iste provident ea exercitationem minus blanditiis.
              Error, cum nobis.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint amet
              fugit officiis aspernatur quis, eaque quidem ducimus. Ab velit
              vero placeat iste provident ea exercitationem minus blanditiis.
              Error, cum nobis.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default JobCard;
