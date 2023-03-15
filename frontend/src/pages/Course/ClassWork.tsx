import { Button } from 'primereact/button'

function ClassWork() {
  return (
    <div className='lg:w-7 mx-auto my-5'>
        <div>
        <Button className=" primaryButt mt-2" rounded> 
        <i className='pi pi-plus font-semibold'></i>
        <span className='text-sm ml-2 font-semibold'>Create</span>
         </Button>
        </div>
    </div>
  )
}

export default ClassWork