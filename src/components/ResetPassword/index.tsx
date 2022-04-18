import React, { useState, useContext, useEffect } from 'react'
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
import { sendVerificationCode, verifyCode, saveAcccountDetails, resetPassword as resetPasswordAPI } from '../../components/api/routes'
import { Notifier } from '../Notifier';
import { ErrorHandler } from '../../helpers/Errorhandler';
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material';
import Validator from '../../utils/validator';


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

function ResetPassword() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { resetPassword, showResetPassword } = useContext(GeneralContext);
  const { setAuth, setUserDetails } = useContext(AuthContext)
  const [verified, setVerified] = useState(false)
  const [step, setStep] = useState(0)
  const [ phone, setPhone ] = useState('');
  const [otpCode, setOtpCode] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [email, setEmail] = useState('')

  useEffect(()=>{
    if(Validator.validateEmail(email)){
      setBtnDisabled(false)
    }else{
      setBtnDisabled(true)
    }
  },[email])

const sendLink=async()=>{
  try{
    setLoading(true)
    const res = await resetPasswordAPI(email)
    if(res.status == 200){
        setLoading(false)
        setStep(1)
        showResetPassword(true)
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
    <Modal modal={resetPassword} showModal={showResetPassword} backdropClose>
      {step == 0? (
        <main className={styles.container}>
          <div className={styles.main}>
            <ModalHeader text="Enter your email address" closeModal={()=>showResetPassword(false)} />
            <Container>
              <p style={{color: '#64748B', fontSize: '15px'}}>Email address</p>
              <TextField value={email} style={{width: '100%'}} onChange={e=>setEmail(e.target.value)} placeholder="joe@example.com" helperText="A reset link will be sent to this email address" />
            </Container>
            <footer className={styles.footer}>
              <Button onClick={()=>showResetPassword(false)} bgColor='transparent' width="45%" text='Close' height='58px' textColor="black" style={{border: '1px solid #CBD5E1'}} />
              <Button loading={loading} disabled={btnDisabled? true : loading} onClick={()=>sendLink()} bgColor='#0099D6' width="45%" text='Send' height='58px' />
            </footer>
          </div>
        </main>
      ):(
        <main className={styles.container}>
          <div className={styles.main}>
            <img src="/verify_email_img.gif" width="60%" />
            <p style={{textAlign: 'center', lineHeight: '24px', fontSize: '16px'}}> <b>Reset link sent!</b><br/>
              A reset link has been sent to your email address
            </p>
          <Button onClick={()=>showResetPassword(false)} bgColor='#0099D6' width="100%" text='Continue' height='58px' />
          </div>
        </main>
      )}
    </Modal>
  )
}

export default ResetPassword