import { Avatar } from "primereact/avatar";

import { Link, useLocation } from "react-router-dom";
import { CourseInterface } from "../../../Types/CourseInterface";

function SideBarSection({
  courses,
  title,
}: {
  courses: CourseInterface[];
  title: string;
}) {
  const {pathname}= useLocation()
  const courseId = pathname.split('/')[3]
  const isReview = pathname.split('/')[1]

  let isReviewActive:string = ""
  let isToDoActive:string = ""

  if(isReview==="t")
     isReviewActive ="activeOption"
  else if(isReview==="s")
     isToDoActive = "activeOption"

  return (
    <div className="mt-3 accent">
      <span className="accent ml-3">{title}</span>
      <div className="mt-1">

      {title==="Teaching"?
      <Link className={`sidebarOptions ${isReviewActive}`} to={`/t/to-review`}>
              <Avatar
                icon="pi pi-user-edit"
                size="normal"
                className="primaryButt mr-2"
                shape="circle"
                style={{ color: "white" }}
              />
              <div>
               <div>To Review</div>
            </div>    
        </Link>:
        <Link className={`sidebarOptions ${isToDoActive}`} to={`/s/assigned`}>
        <Avatar
          icon="pi pi-file-edit"
          size="normal"
          className="primaryButt mr-2"
          shape="circle"
          style={{ color: "white" }}
        />
        <div>
         <div>To do</div>
         </div>    
        </Link>
        } 


        {courses.map((course) => {
          let activeOption:string=""
          if(courseId===course._id){
            activeOption="activeOption"
          }
          return (
            <Link className={`sidebarOptions ${activeOption}`} to={`/course/stream/${course._id}`}>
              <Avatar
                label={course.name[0]}
                size="normal"
                className="primaryButt mr-2"
                shape="circle"
                style={{ color: "white" }}
              />
              <div>
               <div>{course.name}</div>
               <div className="text-xs">{course.section}</div>
              </div>    
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SideBarSection;
