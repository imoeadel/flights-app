import React from "react";

const InputText = ({
  type,
  leftIcon,
  label,
  labelStyle,
  inputStyle,
  placeholder,
  name,
  register,
  errors,
  errorStyle,
  disabled = false,
  source = "",
  marginBottom
}) => {


  return (
    <div className={`${marginBottom ?? '2xl:mb-3 mb-2'} grow`}>
      <div className="flex items-center gap-2">
        {leftIcon && <span>{leftIcon}</span>}
        <label
          htmlFor={name}
          className={
            labelStyle
              ? labelStyle
              : `block text-black font-medium 2xl:text-base text-sm 2xl:mb-2 mb-1`
          }
        >
          {label}
        </label>
      </div>
        <input
          type={type}
          id={name}
          {...register(name)}
          placeholder={placeholder}
          className={
            inputStyle
              ? inputStyle
              : `${disabled ? 'cursor-not-allowed' : 'cursor-default'} bg-[#F4F7F9] appearance-none border border-[#9a9a9a] 2xl:h-11 h-9 text-black 2xl:text-sm text-xs 2xl:rounded-[12px] rounded-[8px] w-full py-3 px-3 font-normal  outline-none text-left`
          }
          disabled={disabled}
        />
      {(errors && errors[name]) && (
        <p className={` capitalize text-red-500 2xl:text-sm text-xs 2xl:mt-1 w-full ${errorStyle ? errorStyle : ""}`}>{errors[name].message}</p>
      )}
    </div>
  );
};

export default InputText;
