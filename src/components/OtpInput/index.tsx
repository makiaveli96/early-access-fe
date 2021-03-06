import React from 'react';
// import OtpInput from 'react-otp-input';
import OTPInput from "otp-input-react";
import { useMediaQuery } from "react-responsive";

function Input({ value, onChange, func }:{value: string, onChange: (e)=>void, func?: any}) {

  const isMobile = useMediaQuery({
    query: "(min-width: 0px) and (max-width: 767px)",
  });


  return (
    <div style={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
      {/* <OtpInput
        value={value}
        onChange={e=>func(e.target.value)}
        numInputs={6}
        separator={<span style={{padding: '4px'}} />}
        inputStyle={{
          width: isMobile? '30px' : '42px',
          height: isMobile? '30px' : '42px', 
          borderRadius: '5px',
          border: '1px solid #57584E'
        }}
      /> */}
      <OTPInput value={value} onChange={func}
      inputStyles={{
        margin: '5px',
          width: isMobile? '30px' : '42px',
          height: isMobile? '30px' : '42px', 
          borderRadius: '5px',
          border: '1px solid #57584E'
        }} autoFocus OTPLength={6} otpType="number" disabled={false} />
    </div>
   
  )
}

export default Input