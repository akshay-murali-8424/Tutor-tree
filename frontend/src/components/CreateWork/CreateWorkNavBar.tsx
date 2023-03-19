import { Button } from 'primereact/button'

function CreateWorkNavBar() {
  return (
    <div>
    <div className="flex justify-content-between align-items-center"
  style={{ borderBottom: "0.0625rem solid #e0e0e0" , padding:"12px"}}>
    <div>
    <span style={{fontSize:"larger", color:"var(--accent)"}}>Assignment</span>
    </div>
    <div>
      <Button className="primaryButt p-2 text-sm">Assign</Button> 
    </div>
    </div>
</div>
  )
}

export default CreateWorkNavBar