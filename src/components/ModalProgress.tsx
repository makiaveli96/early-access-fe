import React from "react";

function ModalProgress({
  current,
  length,
  style,
  setStep
}: {
  current: number;
  length: number;
  setStep?: any;
  style?: any;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", width: "auto" }}>
      {Array.from(Array(length)).map((x, index) => (
        <div
          onClick={()=>index <= current? setStep(index) : null }
          style={{
            width: "16px",
            height: "16px",
            marginRight: "7px",
            cursor: index <= current? 'pointer' : 'default',
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
