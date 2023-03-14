import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction } from "react";

function AddPeopleModal({peopleVisible,setPeopleVisible,type}:{peopleVisible:boolean,setPeopleVisible:Dispatch<SetStateAction<boolean>>,type:"Teacher"|"Student"}) {
  return (
    <div className="card flex justify-content-center">
        <Dialog header={`Add ${type}`}  className='accent' visible={peopleVisible} style={{ width: '30vw' }} onHide={() => {setPeopleVisible(false)}}>
         
        </Dialog>
    </div>
  )
}

export default AddPeopleModal