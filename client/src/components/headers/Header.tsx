import React from "react";

import logo from "@assets/logo.png";
import { Link } from "react-router-dom";
import SearchTextField from "../textfields/SearchTextField";

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
        <Link to="/" className="mr-14">
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
    </div>
  );
};

export default Header;
