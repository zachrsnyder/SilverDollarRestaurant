'use client'

import React from 'react';
import { useEffect, useState } from 'react';

const MapComponent = ({ 
  apiKey, 
  address,
  zoom = 15 
}) => {
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (!window.google) {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      document.head.appendChild(googleMapScript);

      // Define initMap function globally
      window.initMap = function() {
        const mapDiv = document.getElementById('map');
        

        const map = new google.maps.Map(mapDiv, {
          center: new google.maps.LatLng(38.306158, -92.577506),
          zoom: zoom,
          mapTypeControl: false,
          //streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true
        });

        
      };

      googleMapScript.onerror = () => {
        setMapError('Failed to load Google Maps');
      };

      document.head.appendChild(googleMapScript);

      return () => {
        document.head.removeChild(googleMapScript);
        delete window.initMap;
      };
    }
  }, [apiKey, address, zoom]);

  if (mapError) {
    return (
      <div style={{ 
        padding: '20px',
        backgroundColor: '#fee2e2',
        borderRadius: '8px',
        color: '#dc2626'
      }}>
        Error: {mapError}
      </div>
    );
  }

  return (
    <div 
      id="map" 
      style={{ 
        height: '300px', 
        width: '300px',
        borderRadius: '8px'
      }}
      className='ml-4'
    />
  );
};

export default MapComponent;