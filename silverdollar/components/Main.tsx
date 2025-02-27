import Image from "next/image"

const Main = () => {
  return (
    <div className='relative h-[700px] w-full'>
        <Image 
            src = '/images/FOH_Sunset.jpg'
            alt='Breakfast food item'
            fill
            className='object-cover'
            sizes="100vw"
            priority
            style={{
                zIndex: 0
            }}
        />
        <div className='absolute left-14 h-full min-h-full flex space-y-8 flex-col justify-center font-arvo text-white text-5xl sm:text-6xl lg:text-6xl xl:text-7xl w-[50%]'
        >
          <div>Welcome to</div>
          <div>Silver Dollar's</div>
        </div>
    </div>
  )
}

export default Main