import React from 'react';
import { Link } from 'react-router'

const Index = () => {
  
  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-gray-100 p-6 gap-6'>
      <h1 className='text-2xl font-semibold text-gray-800'>Welcome To Recipedia</h1>
    <Link to="/login" className="text-indigo-500 hover:underline">
      <button
            type="button"
            className="p-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
      >
            Login
      </button>
      </Link>
      <Link to="/register" className="text-indigo-500 hover:underline">
      <button
            type="button"
            className="p-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
      >
            Register
      </button>
      </Link>
    </div>
  )
}

export default Index