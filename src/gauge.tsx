import React from "react";

export const Gauge = ({ maxValue, value, color }: { maxValue: number; value: number; color: string }) => {
  return (
    <div style={{ width: "600px", height: "100px", backgroundColor: "grey" }}>
      <div style={{ width: `${(value / maxValue) * 100}%`, height: "100px", backgroundColor: color }}></div>
    </div>
  );
};
