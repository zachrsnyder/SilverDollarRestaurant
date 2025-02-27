'use client'

import Facebook from "./Facebook";

const FBWrapper = () => {
  return (
    <div className='p-2 xs:px-3 sm:px-4 md:px-6 md:py-4 lg:px-8 xl:px-12 xl:py-6 2xl:px-16 grid bg-gray-500'
        style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
        }}
    >
        <div className='min-h-[500px] h-[450px] flex align-middle justify-center items-center'>
        <p className='text-white text-6xl sm:text-7xl lg:text-8xl xl:text-8xl font-arvo'
            style={{
            lineHeight: '6rem'
            }}
        >
            Find us on Facebook!
        </p>
        </div>
        <div className='flex justify-center'>
            <div className='w-[400px] h-[500px] flex'>
            <Facebook/>
            </div>
        </div>
    </div>
  )
}

export default FBWrapper