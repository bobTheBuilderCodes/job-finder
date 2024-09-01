import React from 'react'

const InterviewAppointment = () => {
  return (
    <section className=" flex mb-8">
        <div className="bg-orange-600 max-h-10 min-w-10 rounded-md mr-4 font-bold text-xl flex justify-center items-center text-white">
          U
        </div>
        <div>
          <div className="flex justify-between">
            <h1 className="font-medium text-md font-gray-900 mb-3">
             DSA Interview Prepa...
            </h1>
          </div>
          <span className="bg-gray-100 px-2 py-1 mt-6 max-w-auto text-sm text-gray-700">
            Tomorrow at 2:15pm
          </span>

          <p className="text-gray-500 list-disc mt-3 text-sm">Accra -Ghana</p>
        </div>
      </section>
  )
}

export default InterviewAppointment