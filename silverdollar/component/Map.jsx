'use client'

import React from 'react';
import { useEffect, useState, useRef } from 'react';

const loadGoogleMapsScript = (apiKey, callback) => {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (window.google?.maps) {
      resolve();
      return;
    }

    // Create a unique callback name
    const callbackName = `googleMapsCallback_${Math.random().toString(36).substr(2, 9)}`;
    
    window[callbackName] = () => {
      if (callback) callback();
      resolve();
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    
    script.onerror = (error) => {
      reject(error);
    };

    document.head.appendChild(script);
  });
};

const MapComponent = ({
  apiKey,
  address,
  zoom = 15
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const mapInstance = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      try {
        await loadGoogleMapsScript(apiKey);
        
        if (!isMounted || !mapRef.current) return;

        // Initialize map only if it hasn't been initialized yet
        if (!mapInstance.current) {
          mapInstance.current = new window.google.maps.Map(mapRef.current, {
            center: { lat: 38.306158, lng: -92.577506 },
            zoom: zoom,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: true
          });
        }

        setIsLoading(false);
      } catch (error) {
        if (isMounted) {
          setMapError(`Failed to load map: ${error.message}`);
          setIsLoading(false);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        // Clean up map instance if needed
        mapInstance.current = null;
      }
    };
  }, []); // Only run on mount

  // Handle updates to zoom and address
  useEffect(() => {
    if (!mapInstance.current || !window.google?.maps) return;
    
    mapInstance.current.setZoom(zoom);
    // Add address update logic here if needed
  }, [zoom, address]);

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

  if (isLoading) {
    return (
      <div style={{
        height: '300px',
        width: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px'
      }}
      className='ml-4'>
        Loading map...
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
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