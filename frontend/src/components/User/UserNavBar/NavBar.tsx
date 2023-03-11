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
import { useNavigate } from "react-router-dom";
import { IGetUserAndCoursesResponse } from "../../../Types/ResponseInterface";

function NavBar({firstLetter,data}:{firstLetter:string | undefined,data:IGetUserAndCoursesResponse | undefined}) {
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
    }
  ]
  return (
    <div
      className="flex flex-row flex-wrap card-container blue-container justify-content-between"
      style={{ borderBottom: "1px solid black" }}
    >
      <div className="card flex justify-content-center align-items-center">
        <SideBar data={data}/>
        <span style={{fontSize:"larger", color:"var(--accent)"}}>Tutor Tree</span>
      </div>

      <div className="flex align-items-center">
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
          label={firstLetter}
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

export default NavBar;
