import React from 'react';
import OtpInput from 'react-otp-input';
import { useMediaQuery } from "react-responsive";

function Input({ value, onChange }) {

  const isMobile = useMediaQuery({
    query: "(min-width: 0px) and (max-width: 767px)",
  });


  return (
    <div style={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={6}
        separator={<span style={{padding: '4px'}} />}
        inputStyle={{
          width: isMobile? '30px' : '42px',
          height: isMobile? '30px' : '42px',
          borderRadius: '5px',
          border: '1px solid #57584E'
        }}
      />
    </div>
   
  )
}

export default Input