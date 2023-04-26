import { Button } from 'primereact/button'

function CreateWorkNavBar({type}:{type:"Assignment" | "Study Material"}) {
  return (
    <div>
    <div className="flex justify-content-between align-items-center"
  style={{ borderBottom: "0.0625rem solid #e0e0e0" , padding:"12px"}}>
    <div>
    <span style={{fontSize:"larger", color:"var(--accent)"}}>{type}</span>
    </div>
    <div>
      <Button className="primaryButt p-2 pl-3 pr-3 text-sm">{type==="Assignment"?<>Assign</>:<>Post</>}</Button> 
    </div>
    </div>
</div>
  )
}

export default CreateWorkNavBar