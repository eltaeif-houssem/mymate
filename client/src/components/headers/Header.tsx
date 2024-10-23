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
    <div className="z-50 w-full h-20 bg-blue-200 flex items-center justify-between px-12 fixed left-0 top-0">
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
        <Link to={routePaths.USER_PROFILE}>
          <div className="flex mr-10 cursor-pointer hover:opacity-80 duration-200">
            <img src={profilePic} alt="profile-logo" className="w-12" />
            <div className="ml-3">
              <p className="text-md font-semibold">Steve Rogers</p>
              <p className="text-xs">@steve_rogers</p>
            </div>
          </div>
        </Link>

        <div className="flex items-center">
          <div className="bg-white mr-4 py-2 px-3 rounded-md cursor-pointer hover:opacity-80 duration-200 relative">
            <span className="bg-red-500 text-white absolute text-xs w-4 h-4 text-center rounded-full -right-1 -top-1">
              1
            </span>
            <i className="fa-solid fa-message" />{" "}
          </div>

          <div className="bg-white py-2 px-3 rounded-md cursor-pointer hover:opacity-80 duration-200 relative">
            <span className="bg-red-500 text-white absolute text-xs w-4 h-4 text-center rounded-full -right-1 -top-1">
              1
            </span>
            <i className="fa-solid fa-bell"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
