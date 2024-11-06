import Image from "next/image";
import Facebook from "./component/Facebook";
import FoodCard from "./component/SmallCard";
import SmallCard from "./component/SmallCard";

export default function Home() {
  return (
    <div className='pt-24'>
      {/* <FoodCard
        imageSrc="/images/carousel3.jpg"
        title='The Gravy Train!'
        text='I hate biscuits and gravy tbh.'
        reverse={false}
      /> */}
      

      <div className='flex justify-center xl:mx-18'>
        <div className='grid w-full xl:w-4/5 lg:gap-x-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          <div className='flex flex-shrink-0 justify-center'>
            <SmallCard
              imageSrc="/images/carousel3.jpg"
              title='The Gravy Train!'
              text='I hate biscuits and gravy tbh.'
            />
          </div>
          <div className='flex justify-center'>
            <SmallCard
              imageSrc="/images/carousel3.jpg"
              title='The Gravy Train!'
              text='I hate biscuits and gravy tbh.'
            />
          </div>
          <div className='flex justify-center'>
            <SmallCard
              imageSrc="/images/carousel3.jpg"
              title='The Gravy Train!'
              text='I hate biscuits and gravy tbh.'
            />
          </div>
          <div className='flex justify-center'>
            <SmallCard
              imageSrc="/images/carousel3.jpg"
              title='The Gravy Train!'
              text='I hate biscuits and gravy tbh.'
            />
          </div>
          <div className='flex justify-center'>
            <SmallCard
              imageSrc="/images/carousel3.jpg"
              title='The Gravy Train!'
              text='I hate biscuits and gravy tbh.'
            />
          </div>
          <div className='flex justify-center'>
            <SmallCard
              imageSrc="/images/carousel3.jpg"
              title='The Gravy Train!'
              text='I hate biscuits and gravy tbh.'
            />
          </div>
        </div>
      </div>

    </div>
  );
}
