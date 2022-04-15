import React, { useState, useContext } from 'react'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import styles from './styles.module.css';
import Modal from '../Modal'
import Button from '../Button';
import { Icon } from "@iconify/react";
import { GeneralContext } from '../../contexts/generalContextApi';
import { AuthContext } from '../../contexts/authContextApi';
import OtpInput from "../../components/OtpInput";
import { Container } from '../ProfileModal/AccountProfile/Personal';
import { sendVerificationCode, verifyCode, saveAcccountDetails } from '../../components/api/routes'
import { Notifier } from '../Notifier';
import { ErrorHandler } from '../../helpers/Errorhandler';
import { useNavigate } from 'react-router-dom'


export function ModalHeader({ text, closeModal }:{text: string, closeModal: ()=>void}){
  return(
    <div className={styles.header}>
      <p style={{fontWeight: '700', fontSize: '17px'}}>{text}</p>
      <span onClick={()=>closeModal()}>
        <Icon icon="clarity:times-line" height={25} width={25} />
      </span>
    </div>
  )
}

function Verifynubmer() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { phoneModal, showPhoneModal } = useContext(GeneralContext);
  const { setAuth, setUserDetails } = useContext(AuthContext)
  const [verified, setVerified] = useState(false)
  const [step, setStep] = useState(0)
  const [ phone, setPhone ] = useState('');
  const [otpCode, setOtpCode] = useState('')

  const handleOtpCode = (e) => {
    // const re = /^[0-9\b]+$/;
    // if (e.target.value === "" || re.test(e.target.value)) {
      setOtpCode(e.target.value);
    // }
  };

  
  const sendCode=()=>{
    if(phone.length > 5){
        (async()=>{
          const res = await sendVerificationCode(phone)
          if(res.status == 200){
              Notifier(res.message, 'success')
              setStep(1)
          }else{
              Notifier(res.message, 'error')
          }
        })()
    }else{
       Notifier('Enter a valid phone nubmer', 'warning')
    }
}

const verifyPhoneCode=async()=>{
  try{
    setLoading(true)
    const res = await verifyCode(otpCode)
    if(res.status == 200){
        setLoading(false)
        setVerified(true)
        setUserDetails(res.user);
        Notifier(res.message, 'success')
    }else{
        setLoading(false)
        Notifier(res.message, 'error')
    }
  }catch(err){
    setLoading(false)
    ErrorHandler(err, navigate, setAuth)
  }
 
}

  return (
    <Modal modal={phoneModal} showModal={showPhoneModal} backdropClose>
      {!verified? (
        <main className={styles.container}>
          <div className={styles.main}>
            <ModalHeader text="Add a phone number" closeModal={()=>showPhoneModal(false)} />
            {step == 0 && (
            <Container>
              <p style={{fontSize: '14px', color: '#57584E', marginBottom: '5px'}}>Phone number</p>
              <PhoneInput
                specialLabel=''
                inputStyle={{width: '100%'}}
                country={'us'}
                value={phone}
                onChange={phone=>setPhone(phone)}
              />
              <p style={{fontSize: '12px', color: '#64748B'}}>you will recieve a verification code to verify this phone number.</p>
            </Container>
            )}
            {step == 1 && (
              <Container>
                <p style={{color: '#64748B', fontSize: '15px'}}>Enter the OTP Verification code we sent to your phone.</p>
                <OtpInput value={otpCode} onChange={handleOtpCode} func={setOtpCode} />
              </Container>
            )}     
            <footer className={styles.footer}>
              <Button onClick={()=>showPhoneModal(false)} bgColor='transparent' width="45%" text='Close' height='58px' textColor="black" style={{border: '1px solid #CBD5E1'}} />
              {step == 0? (
                <Button onClick={()=>sendCode()} bgColor='#0099D6' width="45%" text='Next' height='58px' />
              ):(
                <Button loading={loading} disabled={loading} onClick={()=>verifyPhoneCode()} bgColor='#0099D6' width="45%" text='Verify' height='58px' />
              )}
            </footer>
          </div>
        </main>
      ):(
        <main className={styles.container}>
          <div className={styles.main}>
            <img src="/box_animation.gif" width="60%" />
            <p style={{textAlign: 'center', lineHeight: '24px', fontSize: '16px'}}> <b>Congratulations!</b><br/>
              You gained <span style={{color: '#0099D6'}}>10,000 reward points</span> for verifying your phone number.</p>
          <Button onClick={()=>showPhoneModal(false)} bgColor='#0099D6' width="100%" text='Continue' height='58px' />
          </div>
        </main>
      )}
    
    </Modal>
  )
}

export default Verifynubmer