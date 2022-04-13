import React, { useEffect, useState, useContext } from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css'
import HomeNavbar from "../../components/HomeNavbar";
import { useSearchParams, useNavigate, Navigate } from "react-router-dom";
import { ConfirmAccount, ConfirmEmailToken } from '../../components/api/routes'
import { AuthContext } from '../../contexts/authContextApi';

function NewEmail() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(false);
  const { setAuth, setUserDetails } = useContext(AuthContext)

  useEffect(()=>{
    (async ()=>{
      if (searchParams.get("token")) {
        const res = await ConfirmEmailToken(searchParams.get("token"), 'verify_email');
        if(res.status == 200){
          setTokenValid(true)
          setAuth(true)
          setUserDetails(res.user);
          localStorage.setItem("_EA_TOKEN", res.token);
        }else{
          setTokenValid(false)
        }
      }else{
        setTokenValid(false)
      }
    })()
  },[])

  return (
    <>
    <HomeNavbar />
    <main className={styles.container}>
      {tokenValid? (
      <Navigate to="/home?email_verified=true" />
      ):(
        <h2>Invalid or Expired Token</h2>
      )}
     
    </main>
    </>
  )
}

export default NewEmail