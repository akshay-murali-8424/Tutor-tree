import React from 'react'

function EmptyHome() {
  return (
    <>
    <div > 
    <img className='mx-auto block' style={{paddingTop:"8rem"}} 
    src="https://res.cloudinary.com/dzgqefrmc/image/upload/v1678891173/empty_states_home_y0tf5k.svg"
     alt='empty'/>
    </div>
    <div>
        <div className='flex justify-content-center accent text-sm mt-3'>
        <span className='accent'>Add a class to get started</span>
        </div>
    </div>
    </>
  )
}

export default EmptyHome