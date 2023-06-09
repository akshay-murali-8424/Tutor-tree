import { useRef, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import JoinClass from "../UserModals/JoinClass";
import CreateClass from "../UserModals/CreateClass";
import SideBar from "../SideBar/SideBar";
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { useDispatch } from "react-redux";
import { deleteToken } from "../../../redux/Features/reducers/userAuthSlice";
import { useLocation, useNavigate} from "react-router-dom";
import {  useGetUserAndCoursesQuery } from "../../../redux/Features/api/apiSlice";  
import { ProgressSpinner } from "primereact/progressspinner";
import CourseNavBarOptions from "./CourseNavBarOptions";
import TeacherNavBarOptions from "./TeacherNavBarOptions";
import StudentNavBarOptions from "./StudentNavBarOptions";
import { useGetCourseQuery } from "../../../redux/Features/api/courseApiSlice";

function NavBar({course,teacher,student}:{course:boolean,teacher:boolean,student:boolean}) {

  const {pathname}= useLocation()
  const courseId = pathname.split('/')[3]
  const { data, isLoading, isFetching } = useGetUserAndCoursesQuery()
  const { data:courseData } = useGetCourseQuery({id:courseId},{skip:!course})
  const menu = useRef<Menu>(null);
  const userAvatarMenu=useRef<Menu>(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [joinVisible, setJoinVisible] = useState<boolean>(false);
  const [createVisible, setCreateVisible] = useState<boolean>(false);
  const accept=()=>{
    dispatch(deleteToken())
    navigate('/login')
  }
 
  const logoutConfirm = () => {
    confirmDialog({
        message: 'Are you sure you want to log out?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept,
    });
};
  const items = [
    {
      label: "Create Class",
      command: () => {
        setCreateVisible(true);
      },
    },
    {
      label: "Join Class",
      command: () => {
        setJoinVisible(true);
      },
    },
  ];
  const userAvatarItems=[
    {
      label:"Log out",
      command:()=>{
        logoutConfirm()
      }
    },{
      label:"Settings",
      command:()=>{
         navigate('/settings')
      }
    }
  ]
  if(isLoading || isFetching){
    return(
      <div className="flex justify-content-center" style={{marginTop:"16rem"}}>
          <ProgressSpinner />
      </div>
    )
  }else{
  return (
    <div
      className="flex flex-row flex-wrap card-container "
      style={{ borderBottom: "0.0625rem solid #e0e0e0"}}
    >
      <div className="card flex justify-content-start align-items-center lg:w-2">
        <SideBar data={data}/>
        <span style={{fontSize:"larger", color:"var(--accent)"}}>{courseData?<>{courseData.name}</>:<>Tutor Tree</>}</span>
      </div>
      <div className="lg:w-8 flex justify-content-center" >
      {
        course && <CourseNavBarOptions/>
      }
      {
        teacher && <TeacherNavBarOptions/>
      }
      {
        student && <StudentNavBarOptions/>
      }
      </div>
      <div className="flex align-items-center lg:w-2 justify-content-end">
        <Menu model={items} popup ref={menu} />   
        <Button
          icon={PrimeIcons.PLUS}
          rounded
          text
          severity="secondary"
          className="mr-2"
          style={{ fontSize: "15px", margin: "5px " }}
          onClick={(e) => menu.current?.toggle(e)}
        />
        <ConfirmDialog/>
        <Menu model={userAvatarItems} popup ref={userAvatarMenu} />
        <Avatar
          label={data?.firstName[0]}
          size="large"
          className="primaryButt mr-2"
          shape="circle"
          style={{ color: "white" }}
          onClick={(e) => userAvatarMenu.current?.toggle(e)}
        />

        <CreateClass
          createVisible={createVisible}
          setCreateVisible={setCreateVisible}
        />
        <JoinClass joinVisible={joinVisible} setJoinVisible={setJoinVisible} />

      </div>
    </div>
  );
  }
}

NavBar.defaultProps={
  student:false,
  course:false,
  teacher:false
}

export default NavBar;
