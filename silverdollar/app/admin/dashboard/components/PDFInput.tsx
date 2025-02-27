import { useEffect } from "react";
import PDFPreview from "./PDFPreview";


interface Props {
    id: number;

    selectedFile: File | null;
    
    setSelectedFile : React.Dispatch<File | null>;

    previewUrl: string | null;

    setPreviewUrl: React.Dispatch<string | null>;

}

export default function PDFInput({id, selectedFile, setSelectedFile, previewUrl, setPreviewUrl} : Props) {
    
    useEffect(() => {

        return () => {
            if(previewUrl){
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    

    //handle file change events from the file input
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
        } else {
            setSelectedFile(null);
            
            setPreviewUrl(null);
        }
    };

    return (
        <div className="space-y-4 w-full max-w-md">
            {previewUrl && (
                <div className="bg-white rounded-lg shadow-lg p-4 w-full aspect-[3/4]">
                    <PDFPreview url={previewUrl} width={150} />
                </div>
            )}
            
            <div className="relative">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id={`${id}`}
                />
                <label
                    htmlFor={`${id}`}
                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                >
                    <div className="text-center">
                        <p className="text-gray-600 text-wrap">
                            {selectedFile ? selectedFile.name : 'Click to upload PDF'}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            PDF files only
                        </p>
                    </div>
                </label>
            </div>
        </div>
    )
}