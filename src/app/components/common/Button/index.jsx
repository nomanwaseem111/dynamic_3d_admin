import Link from "next/link";
import React from "react";

const Button = ({
  children,
  variant,
  className,
  icon,
  iconClassName,
  style,
  buttonTextLowerCase,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} 
        ${!variant && "cursor-pointer flex leading-[24px]"}`}
    >
      <span className="skew-x-[30deg]">{children}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
