import React, { HTMLAttributes } from "react";
import { format, InputMask, useMask } from "@react-input/mask";

interface PhoneInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  isEdit?: boolean;
  extraStyle?: React.CSSProperties;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder = "Enter phone number",
  disabled = false,
  isEdit = false,
  extraStyle,
}) => {
  return (
    <InputMask
      mask="+1 (___) ___-____"
      replacement={{ _: /\d/ }}
      showMask={true}
      name={name}
      placeholder={placeholder}
      className={`p-2 h-10 bg-white text-xs font-normal focus:ring-0
        ${isEdit ? "focus:ring-0 border-gray-200 focus:border-gray-200 !rounded-md" : "rounded-none border-0 border-b border-gray-300"}`}
      style={{ width: "100%", ...(isEdit ? extraStyle || {} : {}) }}
      disabled={disabled}
      value={value}
      onBlur={onBlur}
      onChange={(e) => {
        console.log("e=====", e.target.value);
        onChange(e.target.value); // Handle value change
      }}
    />
  );
};

export default PhoneInput;
