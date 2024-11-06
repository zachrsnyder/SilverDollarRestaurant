import React from 'react'
import Image from 'next/image'


//TODO: If gonna be used, add font size differences. But honestly dont use.

interface CardProps{
    imageSrc: string,
    title: string,

    text: string

    reverse: boolean
}


const FoodCard : React.FC<CardProps> = ({imageSrc, title, text, reverse}) => {
  return (
    <div className={`overflow-hidden md:h-[500px] shadow-xl flex relative ${reverse ? 'md:flex-row' : 'md:flex-row-reverse'} bg-primary flex-col rounded-lg mx-10 md:mx-20 mb-8`}>
        <div className='w-full md:w-1/2 relative'>
            <Image
                src={imageSrc}
                alt={title}
                width={400}
                height={450}
                className='object-cover w-full h-full rounded-lg'
            />
        </div>
        <div className="px-6 py-4 w-full md:w-1/2 bg-primary rounded-lg md:rounded-none md:relative absolute bottom-0 z-5">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className='text-gray-700 text-base'>
                {text}
            </p>
        </div>
    </div>
  )
}

export default FoodCard