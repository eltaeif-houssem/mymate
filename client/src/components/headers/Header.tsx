import React from "react";

import logo from "@assets/logo.png";
import { Link } from "react-router-dom";
import SearchTextField from "../textfields/SearchTextField";
import * as routePaths from "@constants/route-urls.constant";

import profilePic from "@assets/profile-1.png";

interface Props {
  value: string;
  onClick: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Header: React.FC<Props> = (props) => {
  const { value, onClick, onChange } = props;
  return (
    <div className="w-full h-20 bg-blue-200 flex items-center justify-between px-12">
      <div className="flex items-center">
        <Link to={routePaths.HOME} className="mr-14">
          <img src={logo} alt="logo" className="w-10" />
        </Link>
        <SearchTextField
          type="text"
          placeholder="Search for friends here..."
          value={value}
          onClick={onClick}
          onChange={onChange}
        />
      </div>

      <div className="flex items-center">
        <div className="flex mr-10 cursor-pointer hover:opacity-80 duration-200">
          <img src={profilePic} alt="profile-logo" className="w-12" />
          <div className="ml-3">
            <p className="text-md font-semibold">Steve Rogers</p>
            <p className="text-xs">@steve_rogers</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-white py-2 px-3 rounded-md mr-4 cursor-pointer hover:opacity-80 duration-200">
            <i className="fa-solid fa-gear"></i>
          </div>

          <div className="bg-white py-2 px-3 rounded-md cursor-pointer hover:opacity-80 duration-200">
            <i className="fa-solid fa-bell"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
