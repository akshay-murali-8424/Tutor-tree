import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { SplitterPanel } from "primereact/splitter";
import { Dispatch, useState } from "react";
import { IGetSubmissionsResponse } from "../../../Types/ResponseInterface";

function TeacherAssignmentSideBar({data,setSubmission}:{data:IGetSubmissionsResponse[],setSubmission:Dispatch<IGetSubmissionsResponse>}) {
  const [ingredients, setIngredients] = useState<string[]>([]);


  const onIngredientsChange = (e: CheckboxChangeEvent) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  return (
   <>
    {data.map((submission)=>{
      return (
         <div className="flex p-3 align-items-center">
          <Checkbox
          inputId="ingredient1"
          name="pizza"
          value={submission._id}
          onChange={onIngredientsChange}
          checked={ingredients.includes(submission._id)}
          />
          <label htmlFor="ingredient1" className="ml-2">
           </label>
           <span className="text-sm hoverText" onClick={()=>setSubmission(submission)}>{submission.userId.firstName +" "+ submission.userId.lastName}</span>
          </div>
      )
    })
    }
    </>
  );
}

export default TeacherAssignmentSideBar;
