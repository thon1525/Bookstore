"use client";

import React from "react";

interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  borderColor?:
    | "phonenumberSize"
    | "file"
    | "primary"
    | "secondary"
    | "black"
    | "none"
    | "border-class";
  paddingX?: "sm" | "md" | "lg" | "xl";
  paddingY?: "sm" | "md" | "lg" | "xl";
  borderRadius?: "sm" | "md" | "lg" | "xl" | "full" | "borderphone";
  borderSize?:
    | "btnlogin"
    | "classroom"
    | "forgetpassword"
    | "phonenumber"
    | "checkbox"
    | "Subject"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "full"
    | "bio";
  onChange?: (event: any) => void;
  accept?: string;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  checked?: boolean | undefined;
  onKeyEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputProps> = ({
  className,
  type = "text",
  placeholder = "example",
  borderColor = "primary",
  borderRadius = "sm",
  paddingX = "sm",
  paddingY = "sm",
  borderSize = "sm",
  value,
  name,
  ref,
  disabled,
  onChange,
  defaultValue,
  accept,
  checked,
  onKeyEnter,
}) => {
  const borderColorControl = (borderColorParam: string) => {
    switch (borderColorParam) {
      case "primary":
        return "border border-[#455445] focus:border-2";
      case "phonenumberSize":
        return "border-r border-t border-b border-[#7B2CBF]";
      case "file":
        return "";
      case "secondary":
        return "border border-[#455445] focus:border-2";
      case "black":
        return "border border-black";
      case "none":
        return "";
      case "border-class":
        return "border-l-4  border-[#0000e8]";
      default:
        return "border border-[#7B2CBF] focus:border-2 border-[#7B2CBF]";
    }
  };
  const paddingXControl = (paddingXParam: string) => {
    switch (paddingXParam) {
      case "sm":
        return "px-4";
      case "md":
        return "px-6";
      case "lg":
        return "px-8";
      case "xl":
        return "px-10";
      default:
        return "px-4";
    }
  };
  const paddingYControl = (paddingYParam: string) => {
    switch (paddingYParam) {
      case "sm":
        return "py-1";
      case "md":
        return "py-2";
      case "lg":
        return "py-3";
      case "xl":
        return "py-4";
      default:
        return "py-1";
    }
  };
  const borderRaduisControl = (borderRadiusParam: string) => {
    switch (borderRadiusParam) {
      case "sm":
        return "rounded-sm";
      case "borderphone":
        return "rounded-r-md";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-xl";
      case "full":
        return "rounded-full";
      default:
        return "rounded-sm";
    }
  };
  const borderSizeControl = (borderSizeParam: string) => {
    switch (borderSizeParam) {
      case "btnlogin":
        return "w-[300px] h-[40px]";
      case "checkbox":
        return "w-[16px] h-[16px]";
      case "classroom":
        return "w-[350px] h-[40px]";
      case "forgetpassword":
        return "w-full h-[50px]";
      case "phonenumber":
        return "w-full sm:w-[180px] h-[40px]";
      case "Subject":
        return "w-full h-[40px]";
      case "sm":
        return "w-[332px] h-[40px]";
      case "md":
        return "w-[460px] h-[44px]";
      case "lg":
        return "w-[420px] h-[60px]";
      case "xl":
        return "w-[511px] h-[65px]";
      case "2xl":
        return "w-[564px] h-[65px]";
      case "full":
        return "w-screen h-[65px]";
      case "bio":
        return "w-[564px] h-[80px]";
      default:
        return "w-[332px] h-[40px]";
    }
  };

  const setBorderColor = borderColorControl(borderColor);
  const setPaddingX = paddingXControl(paddingX);
  const setPaddingY = paddingYControl(paddingY);
  const setBorderRadius = borderRaduisControl(borderRadius);
  const setBorderSize = borderSizeControl(borderSize);

  const setClassName = ` ${setBorderSize}  ${setBorderColor} ${setPaddingX} ${setPaddingY} ${setBorderRadius}  ${className}`;

  return (
    <input
      type={type}
      value={value}
      name={name}
      defaultValue={defaultValue}
      ref={ref}
      accept={accept}
      placeholder={placeholder}
      className={setClassName}
      onChange={onChange}
      checked={checked}
      disabled={disabled}
      onKeyDown={onKeyEnter}
    />
  );
};

export { InputForm };
