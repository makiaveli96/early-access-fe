import React from "react";

function ModalProgress({
  current,
  length,
  style,
}: {
  current: number;
  length: number;
  style?: any;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", width: "auto" }}>
      {Array.from(Array(length)).map((x, index) => (
        <div
          style={{
            width: "16px",
            height: "16px",
            marginRight: "7px",
            ...style,
            backgroundColor: index <= current ? "#FFE0C2" : "#F1F5F9",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
}

export default ModalProgress;
