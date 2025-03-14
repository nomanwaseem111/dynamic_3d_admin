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
    <Link href={""} className={className}>
      <button
        {...props}
        className={`${buttonTextLowerCase} 
        ${
          !variant && "cursor-pointer flex leading-[24px] skew-x-[30deg]"
        }`}
      >
        {children}
        {icon && icon}
      </button>
    </Link>
  );
};

export default Button;
