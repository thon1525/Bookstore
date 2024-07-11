"use client";
import React, { ReactNode } from "react";

interface ButtonIconProps {
  icon: ReactNode;
  onclick?: CallableFunction;
  className?: string;
}
const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, className }) => {
  return (
    <button
      className={`h-10 w-10 rounded-ful flex items-center justify-center cursor-pointer hover:rounded-full ${className}`}
    >
      {icon}
    </button>
  );
};
export { ButtonIcon };
