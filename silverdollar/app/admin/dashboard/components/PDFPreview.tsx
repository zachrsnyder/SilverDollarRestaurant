'use client'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useState } from 'react';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFPreviewProps {
    url: string;
    width?: number;

    height?: number;
}

export default function PDFPreview({ url, width=200, height=300}: PDFPreviewProps){
    const [error, setError] = useState<Error | null>(null);

    return (
        <div className='relative min-h-full h-full'>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
                <div className="backdrop-blur-sm"
                    onClick={()=>{
                        window.open(url, '_blank')
                    }}
                >
                    <Document
                        file={url}
                        onError={(error) => {
                            console.error('PDF Error:', error);
                            setError(error);
                        }}
                        loading={
                            <div className="animate-pulse bg-gray-200 h-[280px] w-full rounded-lg" />
                        }
                        error={
                            <div className="text-red-500 p-4">
                                Error loading PDF: {error?.message}
                            </div>
                        }
                        
                    >
                        <Page
                            pageNumber={1}
                            width={width}
                            height={height}
                            className='h-full min-h-full'
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                </div>
                {/* <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] pointer-events-none" /> */}
            </div>
        </div>
    )
}