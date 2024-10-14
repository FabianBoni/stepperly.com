import React from "react";

interface Props {
  color: string;
  className: any;
}

export const TypeCompletedStateDefault = ({ color = "#47D119", className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" fill={color} r="12" />
      <path
        d="M7 11.6667L10.5714 15L17 9"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};