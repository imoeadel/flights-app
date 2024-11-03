import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const InputPassword = ({
  labelStyle,
  inputStyle,
  name,
  register,
  errors,
  label,
  marginBottom
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col 2xl:mb-4 ${marginBottom || 'mb-3'}`}>
      <label
        htmlFor={name}
        className={
          labelStyle
            ? labelStyle
            : `block text-thirdColor font-normal 2xl:text-base text-sm 2xl:mb-2 mb-1`
        }
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={
            inputStyle
              ? inputStyle
              : `bg-[#F4F7F9] appearance-none border border-[#9a9a9a] h-full text-black 2xl:text-sm text-xs 2xl:rounded-[12px] rounded-[8px] w-full py-3 px-3 font-normal outline-none text-left"
              }`
          }
          id={name}
          {...register(name)}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="off"
        />
        <button
          type="button"
          className={`absolute right-4 top-1/2 -translate-y-1/2`}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          <span className="text-inputPlaceholder flex items-center">
            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </span>
        </button>
      </div>
      {errors && errors[name] && (
        <p className="text-red-500 2xl:text-sm text-xs 2xl:mt-1 mt-0">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default InputPassword;
