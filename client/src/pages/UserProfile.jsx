import React from 'react'


const UserProfile = () => {
  return (
    <>
        {/* Left logo */}
        {/* <div className="w-16 h-16 bg-kaidCream"></div> */}

        {/* Navigation buttons */}
        {/* <div className="flex space-x-6 gap-20">
          <button className="bg-kaidCream px-4 py-2 shadow" style={{ backgroundColor: "#FAA381" }}>Fridge</button>
          <button className="bg-white px-4 py-2 shadow" style={{ backgroundColor: "#FAA381" }}> Cookbook</button>
          <button className="bg-white px-4 py-2 shadow" style={{ backgroundColor: "#FAA381" }}>Suggest</button>
        </div> */}

        {/* Right profile icon */}
        {/* <div className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center">
          {/* Optional user icon (SVG or image) */}
        {/*</div> */}

      {/* Profile Content */}
      <div className="flex items-start justify-between w-full max-w-4xl mx-auto mt-10 p-6">
        {/* Profile Icon */}
        {/* Left: Circle Icon */}
        <div className="mt-[3.6rem] flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-kaidBrown"></div>
        </div>

        {/* Form */}
        <div className="w-2/3 space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input type="text" className="w-full bg-white border-kaidBrown shadow-lg border-2 p-2 rounded" value="John Smith"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" className="w-full bg-white border-kaidBrown shadow-lg border-2 p-2 rounded" value="j_smith@recipedia.com"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Shcool</label>
            <input type="text" className="w-full bg-white border-kaidBrown shadow-lg border-2 p-2 rounded" value="BCIT"/>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button className="bg-white px-4 py-2 shadow bg-buttonPeach">Edit</button>
            <button className="bg-white px-4 py-2 shadow bg-buttonPeach">Save</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile