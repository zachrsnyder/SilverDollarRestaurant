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
        <div className='absolute left-14 h-full min-h-full flex items-center font-arvo text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl w-[50%]'
        >Welcome to Silver Dollar's</div>
    </div>
  )
}

export default Main