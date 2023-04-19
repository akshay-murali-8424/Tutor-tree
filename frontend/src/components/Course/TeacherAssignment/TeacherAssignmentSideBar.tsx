import { CheckboxChangeEvent } from "primereact/checkbox";
import { Dispatch } from "react";
import { IGetSubmissionsResponse } from "../../../Types/ResponseInterface";
import { Accordion, AccordionTab } from 'primereact/accordion';
import SideBarAccordian from "./SideBarAccordian";
        

function TeacherAssignmentSideBar({data,setSubmission,ingredients,setIngredients}:{data:IGetSubmissionsResponse[],setSubmission:Dispatch<IGetSubmissionsResponse>
 ingredients:string[],setIngredients:Dispatch<string[]>}) {

  const submitted:IGetSubmissionsResponse[]=[]
  const assigned:IGetSubmissionsResponse[] = []
  const returned:IGetSubmissionsResponse[] = []

  data.forEach((submission)=>{
     if(submission.status==="submitted")
     submitted.push(submission)
     else if(submission.status==="assigned")
     assigned.push(submission)
     else
     returned.push(submission)
  })

  

  const onIngredientsChange = (e: CheckboxChangeEvent) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  return (
   <div> 
    <Accordion>
    <AccordionTab header="Handed in">
    <SideBarAccordian onIngredientsChange={onIngredientsChange} data={submitted} setSubmission={setSubmission}
    ingredients={ingredients} type="submitted"/> 
    </AccordionTab>
    <AccordionTab header="Assigned">
    <SideBarAccordian onIngredientsChange={onIngredientsChange} data={assigned} setSubmission={setSubmission}
    ingredients={ingredients} type="assigned"/> 
    </AccordionTab>
    <AccordionTab header="Returned">
    <SideBarAccordian onIngredientsChange={onIngredientsChange} data={returned} setSubmission={setSubmission}
    ingredients={ingredients} type="returned"/> 
    </AccordionTab>
    </Accordion>
    </div>
  );
}

export default TeacherAssignmentSideBar;
