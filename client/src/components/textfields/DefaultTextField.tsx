import React, { forwardRef } from "react";
import { Props } from "@interfaces/textfields.interface";

const DefaultTextField: React.ForwardRefExoticComponent<Props> = forwardRef<
  HTMLInputElement,
  Props
>((props, ref) => {
  const { value, onChange, error, type, placeholder } = props;

  return (
    <div className="w-full">
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-lg ${
          error ? "border-red-500" : "border-gray-300"
        } w-full p-2`}
        aria-invalid={error ? "true" : "false"}
      />
      <div className="h-6 flex items-center">
        {error?.message && (
          <p className="text-red-500 mt-1 text-sm">
            <i className="fa-solid fa-circle-exclamation text-xs" />{" "}
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
});

export default DefaultTextField;
