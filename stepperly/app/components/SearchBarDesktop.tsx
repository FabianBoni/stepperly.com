import PropTypes from "prop-types";
import React from "react";
import closeIcon2 from "./close-icon-2.svg";
import closeIcon from "./close-icon.svg";
import image from "./image.svg";
import indicator from "./indicator.svg";
import searchButton2 from "./search-button-2.svg";
import searchButton from "./search-button.svg";

interface Props {
  label: string;
  input: string;
  state: "typing" | "active" | "default";
  className: any;
}

export const SearchBarDesktop = ({
  label = "What’s your goal?",
  input = "Input",
  state,
  className,
}: Props): JSX.Element => {
  return (
    <div
      className={`w-[734px] flex items-center shadow-[0px_12px_28px_#0000001a,0px_4px_8px_#00000003] p-2 rounded-[120px] bg-[#ffffff] relative ${
        ["active", "typing"].includes(state) ? "justify-between" : ""
      } ${className}`}
    >
      {["active", "typing"].includes(state) && (
        <div className="inline-flex items-center flex-[0_0_auto] relative">
          <img className="w-12 h-12 relative" alt="Search button" src={state === "active" ? searchButton2 : image} />
          <div className="inline-flex items-center flex-[0_0_auto] relative">
            <div className="[font-family:'Inter-Medium',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-xl text-black font-medium leading-[normal] whitespace-nowrap relative">
              {input}
            </div>
            {state === "typing" && (
              <img className="relative w-0.5 h-[22px] mr-[-1.00px]" alt="Indicator" src={indicator} />
            )}
          </div>
        </div>
      )}

      <img
        className="w-12 h-12 relative"
        alt="Close icon"
        src={state === "active" ? closeIcon : state === "default" ? searchButton : closeIcon2}
      />
      {state === "default" && (
        <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-gray-400 text-xl tracking-[0] leading-[normal] whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );
};

SearchBarDesktop.propTypes = {
  label: PropTypes.string,
  input: PropTypes.string,
  state: PropTypes.oneOf(["typing", "active", "default"]),
};