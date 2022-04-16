import React, { useState } from 'react';
import styles from './styles.module.css'
import { FiEyeOff, FiEye } from 'react-icons/fi'


interface PropsI {
  value: any;
  onChange: any;
  placeholder?: string;
  inputFieldType?: string;
  inputType?: string,
  setInputType?: any,
  style?: any
}

export default function InputField({ value, onChange, placeholder, inputFieldType, inputType, setInputType, style }: PropsI){
  
  const [border, setBorder] = useState('1px solid #CBD5E1')

  return(
    <div className={styles.main} style={{border}} onMouseLeave={()=>setBorder('1px solid #CBD5E1')} onMouseOver={()=>setBorder('1px solid #0099D6')}>
      <input className={styles.input} value={value} onChange={onChange} type={inputType} style={{width: inputFieldType=="password"? '100%':'95%', ...style}} placeholder={placeholder} />
      {inputFieldType == 'password' && (
        <>
          {inputType == 'password'? (
            <span onClick={()=>setInputType('text')}>
              <FiEye color="#909090" />
            </span>
          ):(
            <span onClick={()=>setInputType('password')}>
              <FiEyeOff color="#909090" />
            </span>
          )}
        </>
      )}
    </div>
  )
}