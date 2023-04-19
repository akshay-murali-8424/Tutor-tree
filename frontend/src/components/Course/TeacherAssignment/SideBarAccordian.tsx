import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox"
import { IGetSubmissionsResponse } from "../../../Types/ResponseInterface"
import { Dispatch } from "react"

function  SideBarAccordian({onIngredientsChange,data,setSubmission,ingredients,type}:
    {onIngredientsChange:(e: CheckboxChangeEvent) => void,data:IGetSubmissionsResponse[],setSubmission:Dispatch<IGetSubmissionsResponse>,
    ingredients:string[],type:"assigned" | "submitted" | "returned"}) {
  return (
    <>
    {data.map((submission)=>{
      return (
        <>
         <div className="flex p-2 align-items-center">
          {type==="submitted" &&
          <Checkbox
          inputId="ingredient1"
          name="pizza"
          value={submission._id}
          onChange={onIngredientsChange}
          checked={ingredients.includes(submission._id)}
          />
          }
          <label htmlFor="ingredient1" className="ml-2">
           </label>
           <span className="text-sm hoverText" onClick={()=>setSubmission(submission)}>{submission.userId.firstName +" "+ submission.userId.lastName}</span>
          </div>
        </>
      )
     })
     }
   </>
  )
}

export default SideBarAccordian