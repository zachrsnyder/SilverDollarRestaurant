'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ResponsiveGallery() {
  const getColumns = () => {
    if (window.innerWidth >= 1280) return 7; // Extra large screens
    if (window.innerWidth >= 1024) return 6; // Large screens
    if (window.innerWidth >= 640) return 5;  // Medium screens
    return 4; // Small screens
  };

  const [columns, setColumns] = useState(getColumns);

  const images = [
    { id: 1, src: '/gallery/IMG_1091.jpeg', alt: 'egg' },
    { id: 2, src: '/gallery/IMG_1165.jpeg', alt: 'egg 2' },
    { id: 3, src: '/gallery/IMG_1743.jpeg', alt: 'egg 3' },
    { id: 4, src: '/gallery/IMG_1749.jpeg', alt: 'egg 4' },
    { id: 5, src: '/gallery/IMG_1757.jpeg', alt: 'egg 5' },
    { id: 6, src: '/gallery/IMG_1762.jpeg', alt: 'egg 6' },
    { id: 7, src: '/gallery/IMG_1820.jpeg', alt: 'egg 7' },
    { id: 8, src: '/gallery/IMG_2055.jpeg', alt: 'egg 8' },
    { id: 9, src: '/gallery/IMG_2061.jpeg', alt: 'egg 8' },
    { id: 10, src: '/gallery/IMG_3381.jpeg', alt: 'egg 8' },
    { id: 11, src: '/gallery/IMG_3469.jpeg', alt: 'egg 8' },
    { id: 12, src: '/gallery/IMG_3517.jpeg', alt: 'egg 8' },
    { id: 13, src: '/gallery/IMG_3520.jpeg', alt: 'egg 9'},
    { id: 14, src: '/gallery/IMG_3580.jpeg', alt: 'egg 9'},
    { id: 15, src: '/gallery/IMG_3606.jpeg', alt: 'egg 9'},
    { id: 16, src: '/gallery/IMG_3607.jpeg', alt: 'egg 9'},
  ];

  useEffect(() => {
    const handleResize = () => setColumns(getColumns());
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container min-h-2000px mx-auto">
      <div
        style={{
          columnCount: columns,
          padding: `0 ${columns === 7 ? '10rem': (columns === 6 ? '6rem' : (columns==5 ? '5rem' : '4rem'))}`,
          columnGap: '1rem', // Space between columns
        }}
      >
        {images.map((image: {id: number, src: string, alt: string} , index) => (
          <div
            key={image.id}
            style={{
              
              marginBottom: '1rem', // Space between items
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="responsive"
              width={1190} // Base width for aspect ratio calculation
              height={1076} // Base height for aspect ratio calculation
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
