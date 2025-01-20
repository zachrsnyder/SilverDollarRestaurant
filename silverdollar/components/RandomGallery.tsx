'use client'

import { shuffle } from "lodash";
import { LegacyRef, useEffect, useRef, useState } from "react"
import Image from "next/image";

export default function RandomGallery() {

    const [layout, setLayout] = useState<Array<{ id: number, src: string, alt: string, gridArea: string }>>([])
    const gridRef = useRef<HTMLElement>(null)
    const [visible, setVisible] = useState<boolean>(false)

    const images = [
        { id: 1, src: '/gallery/IMG_1091.jpeg', alt: 'egg' },
        { id: 2, src: '/gallery/IMG_1743.jpeg', alt: 'egg 3' },
        { id: 3, src: '/gallery/IMG_1757.jpeg', alt: 'egg 5' },
        { id: 4, src: '/gallery/IMG_1762.jpeg', alt: 'egg 6' },
        { id: 5, src: '/gallery/IMG_1820.jpeg', alt: 'egg 7' },
        { id: 6, src: '/gallery/IMG_2055.jpeg', alt: 'egg 8' },
        { id: 7, src: '/gallery/IMG_2061.jpeg', alt: 'egg 8' },
        { id: 8, src: '/gallery/IMG_3381.jpeg', alt: 'egg 8' },
        { id: 9, src: '/gallery/IMG_3520.jpeg', alt: 'egg 9'},
        { id: 10, src: '/gallery/IMG_3580.jpeg', alt: 'egg 9'},
        { id: 11, src: '/gallery/IMG_3606.jpeg', alt: 'egg 9'},
        { id: 12, src: '/gallery/IMG_3607.jpeg', alt: 'egg 9'},
        { id: 13, src: '/gallery/IMG_1779.jpeg', alt: 'waffle!'}
      ];

    const generateValidLayout = (totalRows : number, totalCols : number) => {

        

        const canPlaceItem = (row: number, col: number, colSpan : number, rowSpan: number) => {
            
            // check if it goes beyond the bounds of the grid with the current spans
            if( row + rowSpan > totalRows || col + colSpan > totalCols ) return false;

            //ensure that if these dimensions are taken, then there will be enough room to at least have a 1x1 version of the remaining images.
            if(spaceLeft - (rowSpan * colSpan) < (items.length - 1 - currItem)) return false;

            //edge case where space would become unfillable (should force a 2x1 or 1x2 tile in this scenario)
            if(spaceLeft - (rowSpan * colSpan) > (items.length - 1 - currItem) * 2) return false;


             
            for( let i = row; i < row + rowSpan; i++){
                for( let j = col; j < col + colSpan; j++){
                    if ( grid[i][j] != null ) return false;
                }
            }

            // duh ( I didnt notice this for an hour (need to subtract away the space you just took!))
            spaceLeft -= (rowSpan * colSpan);
            return true;
        }

        const placeItem = (row : number, col : number, rowSpan : number, colSpan : number, item : { id: number, src: string, alt: string }) => {
            const itemRes = {
                ...item,
                gridArea: `${row + 1} / ${col + 1} / ${row + rowSpan + 1} / ${col + colSpan + 1}`
            };

            for( let i = row; i < row + rowSpan; i++){
                for( let j = col; j < col + colSpan; j++){
                    grid[i][j] = 1;
                }
            }

            return itemRes;
        }



        const grid = Array(totalRows).fill([]).map((_ : Array<null>) => Array(totalCols).fill(null));
        const items = shuffle([...images]);

        const layoutItems = [];
        let spaceLeft = totalCols * totalRows; // need to ensure that we have enough to give the other images a home!
        let currItem = 0;
        
        
        for(let row = 0; row < totalRows; row++){
            for(let col = 0; col < totalCols; col++){
                if(grid[row][col] == null && currItem < items.length){
                    const spans = shuffle([
                        {col: 1, row: 1}, {col: 2, row: 1}, {col:1, row:2}
                    ])
                    for(const span of spans){
                        if(canPlaceItem(row, col, span.col, span.row) == true){
                            layoutItems.push(placeItem(row, col, span.row, span.col, items[currItem]))
                            currItem++;
                            break;
                        }
                    }
                }
            }
        }

        if(spaceLeft == 0){
            return layoutItems;
        }
        
        //extra run to maybe fill the holes
        for(let row = 0; row < totalRows; row++){
            for(let col = 0; col < totalCols; col++){
                if(grid[row][col] == null && currItem < items.length){
                    layoutItems.push(placeItem(row, col, 1, 1, items[currItem]))
                    currItem++;
                    if(spaceLeft == 0){
                        return layoutItems;
                    }
                }
            }
        }
        



        return layoutItems;
    }

    useEffect(() => {
        const newLayout = generateValidLayout(4,5);
        setLayout(newLayout)    
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect(); // Stop observing once visible
            }
          },
          {
            threshold: 0.1 // Trigger when 10% of the element is visible
          }
        );
    
        if (gridRef.current) {
          observer.observe(gridRef.current);
        }
    
        return () => observer.disconnect();
      }, []);

    return (
        <div className='bg-gray-700 p-1 sm:p-2 md:p-4 lg:p-6 xl:p-10'
            style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: '.5rem'
            }}
        >
            <div className='max-w-[1065px]'
                ref={gridRef as LegacyRef<HTMLDivElement>}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, minmax(0, 213px))',
                    // gridAutoRows: 'min-content',
                    position: 'relative',
                    gridTemplateRows: 'repeat(4, minmax(0, 160px))',
                    aspectRatio: '',
                    rowGap: '.7rem',
                    columnGap: '.6rem'
                    
                }}
            >
                {layout.map((item : { id: number, src: string, alt: string, gridArea: string }, index : number) => (
                
                    <a
                        href={item.src} target="_blank" rel="noopener noreferrer"
                        key={item.id}
                        style={{
                            transition: 'opacity',
                            transitionDuration: '1500ms',
                            transitionTimingFunction: 'cubic-bezier(0, 0, 0.3, 1)',
                            opacity: `${visible ? '1' : '0'}`,
                            backgroundImage: `url('${item.src}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            gridArea: item.gridArea,
                            position: 'relative',
                            zIndex: 1,
                            borderRadius: '.3rem',
                            boxShadow: '5px 5px 4px rgba(0,0,0,.5)'
                        }}
                    >
                        <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full text-white uppercase font-arvo font-bold text-9xl text-wrap'
                            style={{
                                zIndex: 10,
                                backgroundColor: 'rgba(20,20,20,.1)',
                                textTransform: 'capitalize',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems:'center',
                                transition: 'background-color 0.3s ease',
                                cursor: 'zoom-in'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(200,200,200,0.45)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(20,20,20,0)';
                            }}
                        >

                        </div>  
                    </a>
                
                ))}
            </div>

        </div>
    )
}