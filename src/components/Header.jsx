import React from "react";
import Window from "./Window";
import { BiWallet } from "react-icons/bi";

function Header() {
  const [openWindow, setOpenWindow] = React.useState(false);
  return (
    <>
      <div className="flex justify-between items-center w-11/12 mx-auto mt-3">
        <div className="font-medium text-lg">Ton Wallet 💎</div>
        <div
          onClick={() => setOpenWindow(!openWindow)}
          className="flex items-center px-2 py-1 border rounded cursor-pointer"
        >
          Настройки <BiWallet className="ml-2" />
        </div>
      </div>
      <div className={openWindow ? "block" : "hidden"}>
        <Window />
      </div>
    </>
  );
}

export default Header;
