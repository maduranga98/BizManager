import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-buttons flex flex-row justify-between p-5">
      <h1 className="text-xl font-serif font-semibold text-color1">
        BizManager
      </h1>
      {/* <div className="w-20">
       
      </div> */}
      {/* <div className="flex flex-row justify-evenly align-middle space-x-5 text-chars">
        <h2>Accounts</h2>
        <h2>Accounts</h2>
        <h2>Accounts</h2>
        <h2>Accounts</h2>
        <h2>Accounts</h2>
      </div> */}
      <div className="text-stacks flex flex-row space-x-2">
        <CiLogout />
        <Link to={"/login"}>LogOut</Link>
      </div>
    </div>
  );
};

export default Header;
