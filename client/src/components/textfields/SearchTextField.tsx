import React from "react";

interface Props {
  type: string;
  value: string;
  placeholder: string;
  onClick: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchTextField: React.FC<Props> = (props) => {
  const { type, value, placeholder, onChange, onClick } = props;
  return (
    <div className="w-80 bg-white px-4 py-2 rounded-lg flex items-center shadow-sm shadow-black">
      <i
        className="fa-solid fa-magnifying-glass text-xl opacity-70 mr-5 cursor-pointer"
        onClick={onClick}
      />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-full outline-none"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchTextField;
