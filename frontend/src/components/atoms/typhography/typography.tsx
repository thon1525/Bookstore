"use client";

import React, { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "justify";
  fontSize?: "base" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  variant?: "normal" | "semibold" | "bold" | "extrabold" | "2-extrabold";
  colorscheme?: "primary" | "secondary" | "tb" | "white"; // Corrected prop name
  tags?: "h1" | "p" | "h4";
  id?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  className,
  align = "center",
  fontSize = "base",
  variant = "normal",
  colorscheme = "", // Corrected prop name
  tags = "p",
  id,
}) => {
  const typographyAlign = (align: string) => {
    switch (align) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      case "justify":
        return "text-justify";
      default:
        return "text-center"; // Added return statement
    }
  };

  const typographyFontSize = (fontSize: string) => {
    switch (fontSize) {
      case "base":
        return "text-base";
      case "sm":
        return "text-sm";
      case "md":
        return "text-[18px]";
      case "lg":
        return "text-[25px]";
      case "xl":
        return "text-[32px]";
      case "2xl":
        return "text-[44px]";
      case "3xl":
        return "text-[50px]";
      case "4xl":
        return "text-[64px]";
      default:
        return "text-base";
    }
  };

  const typographyVariant = (variant: string) => {
    switch (variant) {
      case "normal":
        return "font-normal";
      case "bold":
        return "font-bold";
      case "semibold":
        return "font-semibold";
      case "extrabold":
        return "font-extrabold";
      case "2-extrabold":
        return "font-black";
      default:
        return "font-normal";
    }
  };

  const typographyColorScheme = (color: string) => {
    switch (color) {
      case "primary":
        return "text-[#7B2CBF]";
      case "secondary":
        return "text-[#455445]";
      case "white":
        return "text-white";
      default:
        return "text-[#000000]";
    }
  };

  const typographyAlignStyles = typographyAlign(align);
  const typographyFontSizeStyles = typographyFontSize(fontSize);
  const typographyVariantStyles = typographyVariant(variant);
  const typographyColorStyles = typographyColorScheme(colorscheme);

  return (
    <>
      {tags === "h1" ? (
        <h1
          className={`${typographyColorStyles} ${typographyVariantStyles} ${typographyFontSizeStyles} ${typographyAlignStyles} ${className}`}
        >
          {children}
        </h1>
      ) : tags === "h4" ? (
        <h4
          className={`${typographyColorStyles} ${typographyVariantStyles} ${typographyFontSizeStyles} ${typographyAlignStyles} ${className}`}
        >
          {children}
        </h4>
      ) : (
        <p
          className={`${typographyColorStyles} ${typographyVariantStyles} ${typographyFontSizeStyles} ${typographyAlignStyles} ${className}`}
          id={id}
        >
          {children}
        </p>
      )}
    </>
  );
};

export { Typography };
