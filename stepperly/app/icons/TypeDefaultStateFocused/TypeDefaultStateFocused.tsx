/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: any;
}

export const TypeDefaultStateFocused = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="11.25" stroke="#B7B7B7" strokeWidth="1.5" />
      <path
        d="M11 15.6667L14.5714 19L21 13"
        stroke="#B7B7B7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <rect height="30" rx="15" stroke="#E0154E" strokeWidth="2" width="30" x="1" y="1" />
    </svg>
  );
};