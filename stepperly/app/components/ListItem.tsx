import PropTypes from "prop-types";
import React from "react";
import { TypeCompletedStateDefault } from "../icons/TypeCompletedStateDefault";
import { TypeDefaultStateFocused } from "../icons/TypeDefaultStateFocused";

interface Props {
  text: string;
  state: "completed" | "default";
  className: any;
}

export const ListItem = ({ text = "Text", state, className }: Props): JSX.Element => {
  return (
    <div className={`w-[70px] flex items-start gap-3 relative ${className}`}>
      {state === "default" && <TypeCompletedStateDefault className="!relative !w-6 !h-6" color={""} />}

      {state === "completed" && <TypeDefaultStateFocused className="!relative !w-6 !h-6" />}

      <div className="flex items-start grow gap-2 flex-1 pt-px pb-0 px-0 relative">
        <div
          className={`[font-family:'Inter-Regular',Helvetica] mt-[-1.00px] tracking-[0] text-base flex-1 font-normal leading-[22.4px] relative ${
            state === "completed" ? "text-gray-300" : "text-black"
          } ${state === "completed" ? "line-through" : ""}`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  text: PropTypes.string,
  state: PropTypes.oneOf(["completed", "default"]),
};