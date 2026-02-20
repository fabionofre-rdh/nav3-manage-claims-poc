import { APIMemberDetails } from "@/services/api/api.types";
import { Input } from ".";
import { AppDispatch } from "@/redux/store";
import { FormikErrors, FormikTouched } from "formik";

interface InputFieldProps {
  label?: string;
  name: string;
  value?: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isEdit?: boolean;
  errors?: FormikErrors<Record<string, unknown>>;
  touched?: FormikTouched<Record<string, unknown>>;
  required?: boolean;
  className?: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  autoComplete?: string;
  dataTestId?: string;
  maxLength?: number;
  labelClassName?: string;
}

export const InputField = ({
  label,
  name,
  value,
  handleChange,
  onBlur,
  isEdit = true,
  errors,
  touched,
  required = false,
  className,
  type,
  placeholder,
  textarea,
  autoComplete,
  dataTestId,
  maxLength,
  labelClassName,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className={`text-xs text-gray-600 pb-2 ${labelClassName}`}>
          {label} {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <Input
        textArea={textarea}
        size="sm"
        name={name}
        className={`${isEdit ? "p-2" : "p-0"}  bg-white text-xs font-normal focus:ring-0 
${isEdit ? (errors?.[name] && touched?.[name] ? "border-1 border-red-500 rounded-md" : "border-b border-gray-300 focus:border-gray-300 rounded-md") : "rounded-none border-0 border-b border-gray-300 "} ${className}`}
        disabled={!isEdit}
        value={value}
        type={type}
        placeholder={placeholder}
        style={{
          pointerEvents: isEdit ? "auto" : "none",
        }}
        autoComplete={autoComplete}
        data-testid={dataTestId}
        maxLength={maxLength}
        onBlur={onBlur}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} // ✅ Pass event forward
      />
      {touched?.[name] && errors?.[name] && (
        <div className="text-red-500 text-xs mt-1">{String(errors?.[name])}</div>
      )}
    </div>
  );
};
