import React from "react";
import css from "./Bar.module.css";

interface BarProps {
  value: number;
  index: number;
  isSelected: boolean;
  itemsLength: number;
  stepDuration: number;
}

const MARGIN = 2;

const getStyle = (
  value: number,
  index: number,
  itemsLength: number,
  stepDuration: number
) => {
  return {
    height: `${(value * 100) / itemsLength}%`,
    width: `calc(${100 / itemsLength}% - ${MARGIN}px)`,
    transform: `translateX(calc(${index * 100}% + ${
      index * MARGIN + MARGIN / 2
    }px))`,
    transition: `transform ${stepDuration}ms linear`,
  };
};

const getClass = (isSelected: boolean) => {
  const defaultClass = css.bar;
  const moving = isSelected ? css.isSelected : "";
  return `${defaultClass} ${moving}`;
};

const Bar: React.FC<BarProps> = ({
  value,
  index,
  isSelected,
  itemsLength,
  stepDuration,
}) => {
  return (
    <div
      style={getStyle(value, index, itemsLength, stepDuration)}
      className={getClass(isSelected)}
    />
  );
};

export default Bar;
