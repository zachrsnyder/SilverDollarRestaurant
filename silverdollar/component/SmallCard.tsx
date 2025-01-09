import Image from 'next/image'


//TODO: Fish out old styles. COMPLETE!
//TODO: 

interface CardProps {
    imageSrc: string,
    title: string,

    text: string
}

const SmallCard : React.FC<CardProps> = ({imageSrc, title, text}) => {
  return (
    <div className={`overflow-hidden justify-center size-[300px] shadow-xl flex relative bg-primary rounded-lg mx-5 mb-8`}>
        <div className='w-full relative'>
            <Image
                src={imageSrc}
                alt={title}
                /* 8:9 image ratio roughly */
                width={8*100}
                height={9 *100}
                className='object-cover w-full h-full rounded-lg'
            />
        </div>
        <div className="px-6 py-4 w-full bg-primary rounded-lg md:rounded-none absolute bottom-0 z-5">
            <div className="font-bold mb-2">{title}</div>
            <p className='text-gray-700 text-base'>
                {text}
            </p>
        </div>
    </div>
  )
}

export default SmallCard