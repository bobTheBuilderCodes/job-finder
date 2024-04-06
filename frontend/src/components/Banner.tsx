import bannerr from "../assets/bannerr.png"

const Banner = () => {
  return (
    <section className="pl-12 bg-gray-100 h-[22vh] flex">
      <div className="mr-auto">
      <h1 className="text-4xl pt-8 text-gray-900 pb-4 font-bold">Find your dream job</h1>
      <p className="text-gray-500">Looking for job? Browse our latest job openings to view and apply to the best jobs today!</p>
      </div>
      {/* <img alt="banner_picture" className="" height={1400} src={bannerr} /> */}
    </section>
  )
}

export default Banner