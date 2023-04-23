import { Button } from "primereact/button"

function CourseTitleCard({className,section}:{className:string | undefined,section:string | undefined}) {
  return (
    <div className='fadein animation-duration-1000 flex align-content-end flex-wrap card-container justify-content-between mx-auto mt-6 mb-4 border-round lg:w-7' style={{backgroundImage:"url(/assets/img_backtoschool.jpg)",minHeight:"240px"}}>
      <div className='mb-3 ml-3'>
       <div className='m-2 text-2xl font-medium text-white'><span>{className}</span> </div>
      <div className='m-2 text-lg font-medium text-white'><span>{section}</span> </div> 
      </div>
      <div className="flex align-content-center">
        <div>
        <Button
          raised
          text
          className="mr-2 raisedButt"
          style={{ fontSize: "10px", marginRight: "25px " ,marginTop:"35px"}}
        ><i className="pi pi-pencil" style={{fontSize:"0.7rem"}}></i><span className="ml-2 ">Edit</span> </Button>
        </div>
      </div>
    </div>
  )
}

export default CourseTitleCard