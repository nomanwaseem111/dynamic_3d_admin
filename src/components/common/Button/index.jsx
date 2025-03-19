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
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} 
        ${!variant && "cursor-pointer flex leading-[24px]"}`}
      onClick={onClick}
    >
      <span className="skew-x-[30deg]">
        {loading ? (
          <l-dot-spinner size="30" speed="0.9" color="white"></l-dot-spinner>
        ) : (
          children
        )}
      </span>
      {icon && icon}
    </button>
  );
};

export default Button;
