import React from "react";

export const Gauge = ({ maxValue, value, color }: { maxValue: number; value: number; color: string }) => {
  return (
    <div style={{ width: "100%", height: "60px", backgroundColor: "grey", overflow: "hidden", borderRadius: 100 }}>
      <div style={{ width: `${(value / maxValue) * 100}%`, height: "100%", backgroundColor: color }}></div>
      <div style={{ position: "relative", top: "-55%" }}>
        {Math.round(value)} / {Math.round(maxValue)}
      </div>
    </div>
  );
};
