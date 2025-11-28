import Header from '@/components/cpCreateRoom/Header'
import MainCr from '@/components/cpCreateRoom/MainCr'
import MainRoom from '@/components/cpRoom/MainRoom';
import React from 'react'
import { useLocation } from 'react-router';

export default function PageRoom() {
  const location = useLocation();
  const { roomCode } = location.state;
  console.log("Room code:", roomCode)

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      
      {/* Aurora Dream Corner Whispers */}
      <div className="absolute inset-0 z-0 h-screen">
        <div className="h-[13%] bg-blue-700"></div>
        <div className="h-[87%] bg-white"></div>
      </div>
      {/* Content */}
      <div className="px-6 mt-2 relative z-10 flex flex-col justify-center items-center">
        <div className='absolute top-0 left-0 pl-5'><Header/></div>
        <div className='shadow-xl shadow-gray-400/50 rounded-4xl w-250 h-130 flex items-center mt-30  bg-linear-to-r from-blue-300 from-50% to-green-200 to-50%'>
           <MainRoom roomCode = {roomCode}/>
        </div>
      </div>
    </div>
  )
}
