import React, { useState, useContext, useEffect } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { createAccess, SignIn } from "../../components/api/routes";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContextApi";
import { ToastContainer } from "react-toastify";
import Countries from "../../utils/countries-states";
import styles from "./styles.module.css";
import { ErrorHandler } from "../../helpers/Errorhandler";
import HomeNavbar from "../../components/HomeNavbar";
import Button from "../../components/Button";
import { Icon } from "@iconify/react";
import Validator from '../../utils/validator'
import { Notifier } from "../../components/Notifier";
import { useMediaQuery } from 'react-responsive'
import { Container } from "../../components/ProfileModal/AccountProfile/Personal";
import Divider from "../../components/Divider";
import { FiEyeOff, FiEye } from 'react-icons/fi'
import InputField from "../../components/InputField";
import { GeneralContext } from "../../contexts/generalContextApi";
import CreatePasswordModal from '../../components/CreatePass'
import ResetPassword from "../../components/ResetPassword";
import { landingPageDomain } from "../../utils/urls";
import { track } from "../../utils/EventTracker";

export function Center({ children }){
  return(
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>{children}</div>
  )
}

function Signin() {


  const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");
    const [action, setAction] = useState("create_password");
    const [msg, setMsg] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const { auth, setAuth, setUserDetails }: any = useContext(AuthContext);
    const { showCreatePass, showResetPassword }: any = useContext(GeneralContext)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [btnDisabled2, setBtnDisabled2] = useState(false);
    const [type1, setType1] = useState('password');
    const [type2, setType2] = useState('password');
  
    
  
    const [signInOption, setSignInOption] = useState("personal");
  
    const signInOptions = [
      { key: 1, label: "personal" },
      { key: 2, label: "business" },
    ];
  
    const getPass = async () => {
      setLoading(true);
      try {
        const res = await createAccess(email, type, action);
        if (res.status == 200) {
          setLoading(false);
          if (res.message == "Email address is not registered yet") {
            setMsg(res.message);
            return setTimeout(() => {
              setMsg("");
            }, 2000);
          }
          setStep(1);
          setPassword(res.password);
          setAction("sign_in");
        } else {
          setLoading(false);
          setMsg(res.message);
          setTimeout(() => {
            setMsg("");
          }, 2000);
        }
      } catch (err) {
        setLoading(false);
        ErrorHandler(err, navigate, setAuth);
      }
    };
  
    const signin = async () => {
      setLoading(true);
      try {
        const res = await SignIn(email, signInOption, password);
        if (res.status == 200) {
          track('successful login', { userId: res.user._id, accountType: res.user.account, email })
          setLoading(false);
          setAuth(true);
          setUserDetails(res.user);
          localStorage.setItem("_EA_TOKEN", res.token);
          navigate("/home");
        } else {
          track('failed login attempt', { email })
          setLoading(false);
          setMsg(res.message);
          setTimeout(() => {
            setMsg("");
          }, 2000);
        }
      } catch (err) {
        track('failed login attempt', { email })
        setLoading(false);
        ErrorHandler(err, navigate, setAuth, showCreatePass);
      }
    };
  
   useEffect(()=>{
    if(email.length > 5){
      if(email.length > 5 && !Validator.validateEmail(email)){
          setBtnDisabled(true)
          // Notifier('enter a valid email address', 'warning');
        }else{
            // Notifier('enter a valid email address', 'warning');
            setBtnDisabled(false)
        }
    }else{
      setBtnDisabled(true)
    }
   },[email])
  
   useEffect(()=>{
    if(password){
      setBtnDisabled2(false)
    }else{
      setBtnDisabled2(true)
    }
   },[password])

  return (
    <>
      <ToastContainer />
      <HomeNavbar />
      <main className={styles.container}>
        <main className={styles.main}>
          <div className={styles.hero_image} >
            <img src ="/lady-w-phone2.png" />
          </div>
          <div className={styles.form_container}>
            <div className={styles.form}>
              <h1>Got early access? <br/>Sign in.</h1>
              <Container>
                <p style={{color: '#57584E', fontSize: '14px', marginBottom: '4px'}}>Email Address</p>
                {/* <TextField
                  value={email}
                  style={{ width: "100%", backgroundColor: "white" }}
                  type="email"
                  placeholder="What is your email address?"
                  onChange={(e) => setEmail(e.target.value)}

                /> */}
                <InputField value={email} inputType='text' onChange={e=>setEmail(e.target.value)} placeholder="What's your email address" />

              </Container>

              <Container> 
                <p style={{color: '#57584E', fontSize: '14px', marginBottom: '4px'}}>Password</p>
                <InputField value={password} inputFieldType="password" inputType={type1} setInputType={setType1} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" />
                {/* <input className={styles.textfield} placeholder="Enter your password" value={password} type={type1} onChange={e=>setPassword(e.target.value)} /> */}

                {/* <TextField
                  value={password}
                  autoComplete="new-password"
                  type="password"
                  style={{ width: "100%", backgroundColor: "white" }}
                  placeholder="Enter your password" 
                  onChange={(e) => setPassword(e.target.value)}
                /> */}
              </Container>
            
              <Container styles={{marginTop: '20px'}}>
                <Button
                  onClick={()=>signin()}
                  width="100%"
                  height="55px"
                  disabled={btnDisabled2? true : loading}
                  loading={loading}
                  bgColor="#00AFF5"
                  textColor="white" 
                  text="SIGN IN"
                  iconUri="/arrow-right.png"
                />
              </Container>
              <Center>
                <Divider width="85%" marginBottom="20px" marginTop='20px' />
              </Center>
              <Center>
                <p onClick={()=>showResetPassword(true)} style={{fontSize: '15px', margin: 0, color: '#00AFF5', cursor: 'pointer'}}>Forgot password?</p>
                <br />
                <p style={{fontSize: '15px', margin: 0, textAlign: 'center'}}>Haven’t joined Poket Early Access? <a href={`${landingPageDomain}/#earlyaccess`} style={{color: '#00AFF5', textDecoration: 'none'}}>Sign Up</a></p>
                {/* <p style={{fontSize: '15px', margin: 0}}>Haven’t joined Poket Early Access? <a href="http://localhost/poket-website/#form" style={{color: 'orange', textDecoration: 'none'}}>Sign Up</a></p> */}
              </Center>
            </div>
          </div>
        </main>
      </main>
      <CreatePasswordModal />
      <ResetPassword />
    </>
    
  )
}

export default Signin