function ShowSubmitted({attachments}:{attachments:string[]}) {
  return (
    <div className="border-round p-4 mb-3" style={{border: '0.0625rem solid #dadce0'}}>
        Submitted Assignment 
        <div className='mt-2'>
        {attachments.map((attachment)=>{
              return (
                <div className="pb-2">
                <span className="text-sm primary">{attachment}</span>
                </div>
              )   
        })}
        </div>
    </div>
  )
}

export default ShowSubmitted