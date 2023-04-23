import { Sidebar } from "primereact/sidebar";
import { Button } from 'primereact/button';
import { useState } from "react";
import { PrimeIcons } from 'primereact/api';
import SideBarSection from "./SideBarSection";
import { Link } from "react-router-dom";
import { IGetUserAndCoursesResponse } from "../../../Types/ResponseInterface";
import { CourseInterface } from "../../../Types/CourseInterface";
        

function SideBar({data}:{data:IGetUserAndCoursesResponse | undefined}) {
    const [sideVisible, setSideVisible] = useState<boolean>(false);
    let coursesAsStudent:CourseInterface[] | [] = []
    let coursesAsTeacher:CourseInterface[] | [] = []
    if(data){
      coursesAsStudent=data.coursesAsStudent
      coursesAsTeacher=data.coursesAsTeacher
    }
  return (
    <>
    <Sidebar visible={sideVisible} onHide={() => setSideVisible(false)} style={{width:"17rem"}}>
    <div>
      <Link className="sidebarOptions" to={'/home'}>
      <i className="pi pi-home mr-3" style={{ fontSize: '1.2rem' }}></i>
        Classes
      </Link>
    </div>
    {coursesAsStudent?.length>0&&<SideBarSection courses={coursesAsStudent} title="Enrolled"/>}
    {coursesAsTeacher?.length>0&&<SideBarSection courses={coursesAsTeacher} title="Teaching"/>}
  </Sidebar>
  <Button icon={PrimeIcons.BARS} rounded text severity="secondary" className="ml-2" style={{ fontSize: '15px',margin:"5px "}} onClick={() => setSideVisible(true)}/>
  </>
  )
}

export default SideBar