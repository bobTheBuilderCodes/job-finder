import React, { useState } from "react";
import Modal from "../shared/Modal";

const TalentCard = () => {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <>
      <section
        className="cursor-pointer shadow-sm border-2 border-gray-100 p-4 m-3 bg-white rounded-lg flex items-start mx-6"
        onClick={() => setToggleModal(true)}
      >
        <h1 className="h-12 w-12 bg-gray-100 rounded-lg flex items-center font-bold justify-center text-4xl">
          R
        </h1>
        <div className="ml-4">
          <h1 className="font-bold text-lg font-gray-900 ">Jason Statan</h1>
          <p className="text-gray-500">jason.statan@gmail.com</p>
          <div className="flex">
            <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mt-3">
              ReactJS
            </p>
            <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mt-3 mx-3">
              NextJS
            </p>
          </div>
        </div>
      </section>
      <Modal
        isOpen={toggleModal}
        key={Math.random()}
        onClose={() => setToggleModal(false)}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {" "}
          <div className="md:col-span-2">
            <div className="col-span-2">
              <h1 className="font-bold mb-2 text-2xl text-gray-900 col-span-2">
                Why You Should Hire Stellar Stella
              </h1>
              <p className="text-gray-500 col-span-2">
                Here are some achievements, projects and tech stacks of the
                talent
              </p>
            </div>

            {/* Tech Stacks */}
            <div>
              <h1 className="font-bold text-lg text-gray-900 mt-12 mb-6">
                Tech Stacks
              </h1>
              <div className="flex flex-wrap justify-start">
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg">
                  ReactJS
                </p>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mx-3">
                  NextJS
                </p>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mx-3 ">
                  NextJS
                </p>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mx-3">
                  NextJS
                </p>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mx-3">
                  NextJS
                </p>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mx-3">
                  NextJS
                </p>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mx-3">
                  NextJS
                </p>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mx-3">
                  NextJS
                </p>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mx-3">
                  NextJS
                </p>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mt-3">
                  NextJS
                </p>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 max-w-fit rounded-lg mt-3 ">
                  NextJS
                </p>
              </div>
            </div>

            {/* Projects */}

            <div>
              <h1 className="font-bold text-lg text-gray-900 mt-12 mb-5">
                Projects
              </h1>
              <div className="flex flex-wrap justify-start">
                <ul className="text-gray-700 list-disc ">
                  <li className="list-disc mb-2 text-lg font-medium">
                    Ecommerce Application for Web
                  </li>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus dolorem cupiditate culpa, eius itaque minima
                    excepturi libero nam ducimus quas ea non temporibus? Officia
                    recusandae eaque possimus temporibus blanditiis nisi?
                  </p>
                  <li className="list-disc mb-2 text-lg font-medium mt-6">
                    Ecommerce Application for Web
                  </li>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus dolorem cupiditate culpa, eius itaque minima
                    excepturi libero nam ducimus quas ea non temporibus? Officia
                    recusandae eaque possimus temporibus blanditiis nisi?
                  </p>
                  <li className="list-disc mb-2 text-lg font-medium mt-6">
                    Ecommerce Application for Web
                  </li>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus dolorem cupiditate culpa, eius itaque minima
                    excepturi libero nam ducimus quas ea non temporibus? Officia
                    recusandae eaque possimus temporibus blanditiis nisi?
                  </p>
                </ul>
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <h1 className="font-bold text-lg text-gray-900 mt-12 mb-5">
                Stella's Resume
              </h1>
              <div className="flex flex-wrap justify-start">
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus dolorem cupiditate culpa, eius itaque minima
              
                </p>
              </div>
            </div>

            {/* Contact Talent */}

            <div className="col-span-2 flex justify-end mt-12">
              <button onClick={()=>setToggleModal(false)} className="border-2 border-green-600 mx-6 font-bold px-6 py-2 text-green-600 text-lg rounded-lg transition-colors duration-300 hover:bg-green-600 hover:text-white">
                Cancel
              </button>
              <button className="bg-green-600 font-bold px-6 py-2 text-white text-lg rounded-lg transition-colors duration-300 hover:bg-green-800">
                Hire Stellar Stella
              </button>
            </div>
          </div>
          <div className="md:col-span-1 md:text-gray-500 md:pl-4">
            {" "}
            <h1 className="font-bold text-lg text-gray-900 mb-4">
              Stellar Stella's Professional Profile
            </h1>
            {/* <img alt="Stella" /> */}
            <div className="flex">
              <h1 className="bg-gray-100 h-40 w-40 rounded-lg font-black text-gray-900 grid place-items-center text-[100px] mb-6 mr-4">
                S
              </h1>
              <div>
                <p className="text-lg leading-normal mb-2">
                  stellar.stella@gmail.com
                </p>
                <p className="text-md leading-normal mb-4">+23354 090 4939</p>
                <p className="text-sm leading-normal mb-4 bg-blue-50 text-blue-700 font-semibold px-2 py-1 max-w-fit rounded-lg">
                  Open to work
                </p>
              </div>
            </div>{" "}
            <p className="text-lg leading-normal mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint amet
              fugit officiis aspernatur quis, eaque quidem ducimus. Ab velit
              vero placeat iste provident ea exercitationem minus blanditiis.
              Error, cum nobis.
            </p>
            <p className="text-lg leading-normal mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint amet
              fugit officiis aspernatur quis, eaque quidem ducimus. Ab velit
              vero placeat iste provident ea exercitationem minus blanditiis.
              Error, cum nobis.
            </p>
            <p className="text-lg leading-normal mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint amet
              fugit officiis aspernatur quis, eaque quidem ducimus. Ab velit
              vero placeat iste provident ea exercitationem minus blanditiis.
              Error, cum nobis.
            </p>
            <p className="text-lg leading-normal mb-4">
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

export default TalentCard;
