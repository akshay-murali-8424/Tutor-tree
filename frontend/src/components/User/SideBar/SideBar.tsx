import { Sidebar } from "primereact/sidebar";
import { Button } from 'primereact/button';
import { useState } from "react";
import { PrimeIcons } from 'primereact/api';

function SideBar() {
    const [sideVisible, setSideVisible] = useState<boolean>(false);
  return (
    <>
    <Sidebar visible={sideVisible} onHide={() => setSideVisible(false)}>
    <h2>Sidebar</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat.
    </p>
  </Sidebar>
  <Button icon={PrimeIcons.TH_LARGE} rounded text severity="secondary" className="ml-2" style={{ fontSize: '15px',margin:"5px "}} onClick={() => setSideVisible(true)}/>
  </>
  )
}

export default SideBar