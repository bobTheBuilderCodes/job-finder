import React from "react";

import { useSelector } from "react-redux"
import UserDetails from "../../helpers"


const Banner = () => {
  const {loggedinUser} = UserDetails()

  
  return (
    <section className="pl-7 bg-gray-100 h-[15vh] flex  z-10">
      <div className="mr-auto">
      <h1 className="text-4xl pt-5 text-gray-900 pb-2 font-bold">Welcome {loggedinUser?.fullname}</h1>
      <p className="text-gray-500">Looking for job? Browse our latest job openings to view and apply to the best jobs today!</p>
      </div>
      {/* <img alt="banner_picture" className="" height={1400} src={bannerr} /> */}
    </section>
  )
}

export default Banner