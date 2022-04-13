import React, { useContext } from 'react';
import { GeneralContext } from '../../contexts/generalContextApi';
import styles from './styles.module.css';
import Modal from '../Modal'
import Button from '../Button';
import { Notifier } from '../Notifier';

function Verifyemail() {
  
  const { verifyEmail, showVerifyEmail } = useContext(GeneralContext)
  
  const resendVerificationLink=()=>{
    Notifier('Verification link sent!', 'success');
    showVerifyEmail(false)
  }


  return (
    <Modal modal={verifyEmail} showModal={showVerifyEmail} backdropClose>
    <main className={styles.container}>
      <div className={styles.main}>
      <img src="/verify_email_img.gif" width="60%"  />
      <p>We sent you a verification email to the email address your provided. Please click on the link in the email to verify your email address</p>
      <Button onClick={()=>resendVerificationLink()} bgColor="#0099D6" text="Resend Verification Link" width='90%' height="58px" />
      </div>
    </main>
    </Modal>
  )
}

export default Verifyemail