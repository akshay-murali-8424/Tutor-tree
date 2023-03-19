import { Avatar } from 'primereact/avatar'
import React from 'react'

function ClassWorkList() {
  return (
    <>
    <div className='m-2 flex align-items-center'>
    <Avatar
    label={'A'}
    className="primaryButt mr-2"
    shape="circle"
    style={{ color: "white" }}
    />
    <span className='accent text-sm pl-2'>assignment</span>
    </div>
    <hr />
    </>
  )
}

export default ClassWorkList