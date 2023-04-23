import React from 'react'

function Footer() {
  return (
    <div className='accentBackground p-6'>
      <div className="lg:w-9 mx-auto flex justify-content-between" >
        <div className='lg:w-4'>
          <div className='mb-2'><span className='text-lg'>Tutor Tree</span></div>  
          <span className='text-sm textGray'>Web-based platform that provides a streamlined and efficient way 
          for teachers to manage their online classes. The platform is designed to simplify communication 
          and collaboration between teachers and students,
           and to make it easy for students to access and submit their assignments online.
          </span>
        </div>
        <div className='lg:w-3'>
          <span className='text-m ml-5'>Resources</span>
          <ul className='mt-1 text-sm textGray cursor-pointer' style={{listStyleType:"none"}}>
            <li className='mb-2'>NodeJs</li>
            <li className='mb-2'>Express</li>
            <li className='mb-2'>React</li>
            <li className='mb-2'>MongoDb</li>
          </ul>
        </div>
      </div>
      <div>
        <div className='lg:w-9 mx-auto mt-5'>
          <span className='text-sm '>Akshay Murali . All rights reserved</span>
        </div>
      </div>
    </div>
  )
}

export default Footer