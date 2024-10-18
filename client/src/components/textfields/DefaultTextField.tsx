import React from "react";
import { Props } from "@interfaces/textfields.interface";

const DefaultTextField: React.FC<Props> = (props) => {
  const { value, onChange, error, type } = props;
  return (
    <div className="w-full">
      <input type={type} value={value} onChange={onChange} />
      {error?.message && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default DefaultTextField;
