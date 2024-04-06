

const Navbar = () => {
  return (
    <nav className="h-[8vh] px-12 border-2 border-gray-100 flex justify-between items-center">
      <img width={75} className="rounded-full " src="https://static.vecteezy.com/system/resources/previews/011/401/355/non_2x/job-finder-logo-vector.jpg" alt="job_finder_logo" />

      {/* Nav items */}
      <ul className="flex w-1/3 justify-between text-gray-500 font-medium cursor-pointer">
        <li className="p-3 hover:bg-gray-100 rounded-lg">Find Jobs</li>
        <li className="p-3 hover:bg-gray-100 rounded-lg">Find Talent</li>
        <li className="p-3 hover:bg-gray-100 rounded-lg">My Applications</li>
        <li className="p-3 hover:bg-gray-100 rounded-lg">Upload Job</li>
      </ul>

      {/* Profile and notifications */}
      <h1 className="bg-gray-200 p-3 w-12 h-12 flex justify-center item text-gray-700 rounded-full font-bold">Rob</h1>
    </nav>
  )
}

export default Navbar