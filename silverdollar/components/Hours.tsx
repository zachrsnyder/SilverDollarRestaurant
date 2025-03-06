'use client'

import {useEffect, useState} from 'react'
import { RestaurantHours, getRestaurantHours } from '@/lib/util/hours';


const Hours = () => {
    const [hours, setHours] = useState<RestaurantHours[]>([])
    useEffect(()=> {
        setHours(getRestaurantHours());
      }, [])
  return (
    <div className='mx-2 mt-4 border-2 flex flex-col border-white'>
        <h1 className='font-bold font-arvo text-lg pl-2'>HOURS</h1>
        <div className='flex flex-col pl-4 text-gray-300' id='hours-container'>
            {hours.map((value, index) => (
                <div key={index} className={`w-full ${!index && 'font-bold'} justify-between`}>
                    <span>{value.day}</span> <span>{value.hours}</span>
                </div>
            ))} 
        </div>
    </div>
  )
}

export default Hours