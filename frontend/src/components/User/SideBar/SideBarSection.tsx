import { Avatar } from "primereact/avatar";
import React from "react";
import { Link } from "react-router-dom";
import { CourseInterface } from "../../../Types/CourseInterface";

function SideBarSection({
  courses,
  title,
}: {
  courses: CourseInterface[];
  title: string;
}) {
  return (
    <div className="mt-3 accent">
      <span className="accent ml-3">{title}</span>
      <div className="mt-1">
        {courses.map((course) => {
          return (
            <Link className="sidebarOptions" to={'/'}>
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
