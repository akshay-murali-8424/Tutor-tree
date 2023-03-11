import './ClassCard.css' 
import { Card } from 'primereact/card';
import { IGetUserAndCoursesResponse } from '../../../Types/ResponseInterface';
import { CourseInterface } from '../../../Types/CourseInterface';


export default function ClassCard({data}:{data:IGetUserAndCoursesResponse | undefined}) {
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            
        </div>
    );
    let courses:CourseInterface[] | [] = [] 
    if(data){
      courses=[...data.coursesAsStudent,...data.coursesAsTeacher]
    }
    return (
        <div className="card flex flex-wrap justify-content-start">
        {   
            courses.map((course)=>{
            return(
                <Card title={course.name} subTitle={course.section} footer={footer} header={header} style={{margin:"1rem"}} className="cardShadow cardStyle md:w-17rem">
                </Card>
            )
           })
        }
        
        </div>
    )
}
  