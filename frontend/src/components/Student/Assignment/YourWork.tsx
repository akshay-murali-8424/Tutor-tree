import { Button } from 'primereact/button'

function YourWork({files}:{files:File[]}) {
  return (
    <div className="border-round p-4 mb-3" style={{border: '0.0625rem solid #dadce0'}}>
        Your Work
        <div className='mt-2'>
        {files.map((file)=>{
              return (
                <div className="pb-2">
                <span className="text-sm primary"> {file.name}</span>
                </div>
              )   
        })}
        </div>
        <Button  className='primaryButt'>Submit</Button>
    </div>
  )
}

export default YourWork