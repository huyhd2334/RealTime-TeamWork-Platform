import Header from '@/components/cpCreateRoom/Header'
import MainCr from '@/components/cpCreateRoom/MainCr'
import React from 'react'

export default function PageCreateRoom() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      
      {/* Aurora Dream Corner Whispers */}
      <div className="absolute inset-0 z-0 h-screen">
        <div className="h-[13%] bg-blue-700"></div>
        <div className="h-[87%] bg-white"></div>
      </div>
      {/* Content */}
      <div className="space-y-20 px-6 mt-2 relative z-10 flex flex-col justify-center items-center">
        <div className='absolute top-0 left-0 pl-5'><Header/></div>
        <div className='shadow-xl shadow-gray-400/50 rounded-4xl w-150 h-90 flex items-center pl-12 mt-40  bg-linear-to-r from-blue-300 from-50% to-green-200 to-50%'>
          <MainCr/>
        </div>
      </div>
    </div>
  )
}
