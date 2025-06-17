import React from "react";
import { Button } from "@atomos_tech/genesis";



interface props {
  className: string;
}

const Spinner = ({ className }: props) => {
  return (
    <div
      className={`animate-spin border-[2.5px] border-secondary border-b-gray-400 ${className} rounded-[50%]`}
    ></div>
  );
};


interface SubmitButtonProps {
  name: string;
  startIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  intent?:
    | "success"
    | "error"
    | "default"
    | "warning"
    | "primary"
    | "primary-outlined"
    | "success-outlined"
    | "error-outlined"
    | "warning-outlined"
    | "default-outlined";
  endIcon?: React.ReactNode;
  variant?: string;
  className?: string;
  disabled?: boolean;
  width?: string;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const SubmitButton = ({
  name,
  startIcon,
  size = "md",
  className = "",
  disabled ,
  endIcon,
  loading ,
  onClick,
  type = "button",
  intent = "primary",
  width,
}: SubmitButtonProps) => {
  return loading ? (
    <Button
      type={type}
      size={size}
      className={`flex gap-2 items-center ${className} !opacity-80 !cursor-not-allowed`}
      disabled
      intent={intent}
      style={width ? { width } : undefined}
    >
      <Spinner className="w-[16px] h-[16px] border-[2px]" />
      Almost there...✨
    </Button>
  ) : (
    <Button
      type={type}
      size={size}
      className={className}
      disabled={disabled}
      onClick={onClick}
      intent={intent}
      style={width ? { width } : undefined}
    >
      {name}
    </Button>
  );
};

export default SubmitButton;