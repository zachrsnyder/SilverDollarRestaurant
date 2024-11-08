'use client'
import MapComponent from './Map'

const MapClientContainer = () => {
  return (
    <div className='flex w-1/3 h-full justify-end'>
        <MapComponent 
        apiKey = {process.env.NEXT_PUBLIC_REACT_MAPS_API_KEY}
        address = '20 Acorn Dr, Eldon, MO 65026'
        zoom = {15}
        />
    </div>
  )
}

export default MapClientContainer