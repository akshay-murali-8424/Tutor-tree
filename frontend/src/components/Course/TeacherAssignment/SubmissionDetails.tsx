import React from 'react'
import { IGetSubmissionsResponse } from '../../../Types/ResponseInterface'

function SubmissionDetails({submission}:{submission:IGetSubmissionsResponse|undefined}) {
    console.log(submission)
  return (
    <>
    <div className='p-6 flex justify-content-between'>
        <div>
        <span className='text-xl accent font-semibold' >{submission?.userId.firstName+ " "+ submission?.userId.lastName}</span> <br />
        <span className='text-xs textGray'>{submission?.status}</span>
        </div>
        <div>
            {submission?.classWork.totalMark ? <span className='text-lg'>{submission?.classWork.totalMark}</span>:
            <span>Unmarked</span> }
        </div>
    </div>
    <div className='pl-6'>
       {submission?.attachments && submission.attachments}
    </div>
    </>
  )
}

export default SubmissionDetails