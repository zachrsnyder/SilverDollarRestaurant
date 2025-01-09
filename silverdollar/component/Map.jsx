'use client'

import { useEffect, useState, useRef } from 'react';

// Keep track of script loading state globally
let isScriptLoading = false;
let scriptLoadPromise = null;

const loadGoogleMapsScript = (apiKey) => {
  // If the script is already loaded, return the existing promise
  if (window.google?.maps) {
    return Promise.resolve();
  }

  // If the script is currently loading, return the existing promise
  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  isScriptLoading = true;
  
  // Create a new promise for script loading
  scriptLoadPromise = new Promise((resolve, reject) => {
    // Create a unique callback name
    const callbackName = `googleMapsCallback_${Math.random().toString(36).substr(2, 9)}`;
    
    window[callbackName] = () => {
      isScriptLoading = false;
      resolve();
      delete window[callbackName];
    };

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    
    script.onerror = (error) => {
      isScriptLoading = false;
      scriptLoadPromise = null;
      reject(error);
      delete window[callbackName];
    };

    // Add script to document
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
};

const MapComponent = ({
  apiKey,
  address,
  zoom = 15
}) => {
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
      } catch (error) {
        if (isMounted) {
          console.error('Map loading error:', error);
          setMapError(`Failed to load map: ${error.message}`);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
    };
  }, [apiKey]); // Only run when apiKey changes

  // Handle updates to zoom and address
  useEffect(() => {
    if (!mapInstance.current || !window.google?.maps) return;
    
    mapInstance.current.setZoom(zoom);

    // Add geocoding for address if needed
    if (address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          mapInstance.current.setCenter(results[0].geometry.location);
        }
      });
    }
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

  if (isScriptLoading) {
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