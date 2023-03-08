import { useRef, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import JoinClass from "../UserModals/JoinClass";
import CreateClass from "../UserModals/CreateClass";
import SideBar from "../SideBar/SideBar";

function NavBar() {
  const menu = useRef<Menu>(null);

  const [joinVisible, setJoinVisible] = useState<boolean>(false);
  const [createVisible, setCreateVisible] = useState<boolean>(false);
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
  return (
    <div
      className="flex flex-row flex-wrap card-container blue-container justify-content-between"
      style={{ borderBottom: "1px solid black" }}
    >
      <div className="card flex justify-content-center">
        <SideBar />
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
          onClick={(e) => menu?.current?.toggle(e)}
        />

        <Avatar
          label="A"
          size="large"
          className="primaryButt mr-2"
          shape="circle"
          style={{ color: "white" }}
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
