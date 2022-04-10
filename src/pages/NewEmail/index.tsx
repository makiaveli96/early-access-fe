import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css'
import HomeNavbar from "../../components/HomeNavbar";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ConfirmAccount } from '../../components/api/routes'

function NewEmail() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [acountType, setAccountType] = useState('')

  useEffect(()=>{
    (async ()=>{
      if (searchParams.get("email") && searchParams.get("account_type")) {
        const res = await ConfirmAccount(searchParams.get("email"), searchParams.get("account_type"));
        if(res.status == 200){
          setEmail(searchParams.get("email"));
          setAccountType(searchParams.get("account_type"))
        }else{
          navigate('/')
        }
      }else{
        navigate('/')
      }
    })()
  },[])

  return (
    <>
    <HomeNavbar />
    <main className={styles.container}>
      <div className={styles.main}>
        <h1>Verify your email address</h1>
        <p>We sent you a verification email to the email address your provided. Please click on the link in the email to verify your email address</p>
        <Button width='212px' height='36px' bgColor="#16A34A" text="Resend Email" />
      </div>
    </main>
    </>
  )
}

export default NewEmail