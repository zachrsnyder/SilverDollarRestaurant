'use client'

import { shuffle } from "lodash";
import { useEffect, useState } from "react"
import Image from "next/image";

export default function RandomGallery() {

    const [layout, setLayout] = useState<Array<{ id: number, src: string, alt: string, gridArea: string }>>([])

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

        return layoutItems;
    }

    useEffect(() => {
        const newLayout = generateValidLayout(4,5);
        setLayout(newLayout)    
    }, []);

    return (
        <div className='py-6 '
            style={{
                marginLeft: 'auto',
                marginRight: 'auto'
            }}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 213px))',
                gridAutoRows: 'min-content',
                position: 'relative',
                gridTemplateRows: 'repeat(4, minmax(0, 160px))',
                aspectRatio: '4/4',
                rowGap: '.5rem',
                columnGap: '.4rem'
            }}>
                {layout.map((item : { id: number, src: string, alt: string, gridArea: string }, index : number) => (
                    <div className=""
                        key={item.id}
                        style={{
                            backgroundImage: `url('${item.src}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            gridArea: item.gridArea,
                            position: 'relative',
                            zIndex: 1,
                            borderRadius: '.5rem'
                        }}
                    >
                    </div>
                ))}
            </div>

        </div>
    )
}