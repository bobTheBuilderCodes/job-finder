import React from 'react'

const GlobalSearch = () => {
  return (
    <div className='border-2 border-gray-100 rounded-lg m-6 p-4 bg-white shadow-sm flex'>
        <input type='search' placeholder='Search by job title or country' className='flex-1 outline-none font-medium text-gray-500 text-lg pr-6' />
        <button className='bg-green-600 text-white font-bold px-3 py-2 rounded-lg'>Find Jobs</button>
    </div>
  )
}

export default GlobalSearch