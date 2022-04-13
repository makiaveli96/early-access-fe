import React, { useEffect, useState, useContext } from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css'
import HomeNavbar from "../../components/HomeNavbar";
import { useSearchParams, useNavigate, Navigate } from "react-router-dom";
import { ConfirmAccount, ConfirmEmailToken } from '../../components/api/routes'
import { AuthContext } from '../../contexts/authContextApi';
import { Icon } from "@iconify/react";
import { CircularProgress } from '@mui/material';


function NewEmail() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(false);
  const [validatingToken, setValidatingToken] = useState(false)
  const { setAuth, setUserDetails } = useContext(AuthContext)

  useEffect(()=>{
    (async ()=>{
      if (searchParams.get("token")) {
        setValidatingToken(true)
        const res = await ConfirmEmailToken(searchParams.get("token"), 'verify_email');
        if(res.status == 200){
          setValidatingToken(false)
          setTokenValid(true)
          setAuth(true)
          setUserDetails(res.user);
          localStorage.setItem("_EA_TOKEN", res.token);
        }else{
          setValidatingToken(false)
          setTokenValid(false)
        }
      }else{
        setValidatingToken(false)
        setTokenValid(false)
      }
    })()
  },[])

  if(validatingToken){
    return(
      <div style={{height: '100vh', width: '100vw', display: 'flex', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress style={{color: '#0099D6'}} size={40} />
      </div>
    )
  }


  return (
    <>
    <HomeNavbar />
    <main className={styles.container}>
      {tokenValid? (
      <Navigate to="/home?email_verified=true" />
      ):(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
 <Icon icon="bxs:error" color="#00aff5" height="100" />
          <p style={{ color: "#002C3D", fontSize: "20px", fontWeight: "400" }}>
            Invalid or Expired token.{" "}
            <span
              onClick={() => navigate("/")}
              style={{ color: "#00aff5", cursor: "pointer" }}
            >
              Home
            </span>
          </p>
        </div>
      )}
     
    </main>
    </>
  )
}

export default NewEmail