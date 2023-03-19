import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { Dispatch } from 'react';

export default function FileUploader({files,setFiles}:{files:any,setFiles:Dispatch<any>}) {
    const handleUpload=(data:FileUploadHandlerEvent)=>{
       setFiles(data.files)
       data.options.clear()
    }

    return (
        <div className="card">
            <div className='mb-3'><span className='text-sm accent'>Attach</span></div> 
            <FileUpload name="demo[]" customUpload={true} chooseOptions={{className:"primaryButt"}} uploadLabel="Confirm" cancelOptions={{className:"primaryButt"}} uploadOptions={{className:"primaryButt"}} uploadHandler={handleUpload} multiple accept="image/pdf/mp4/*" maxFileSize={10000000} mode={'advanced'} />
        </div>
    )
}