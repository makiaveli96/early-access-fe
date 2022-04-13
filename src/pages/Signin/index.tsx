// import React, { useState, useContext, useEffect } from "react";
// import { CircularProgress, TextField } from "@mui/material";
// import { createAccess, SignIn } from "../../components/api/routes";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/authContextApi";
// import { ToastContainer } from "react-toastify";
// import Countries from "../../utils/countries-states";
// import styles from "./styles.module.css";
// import { ErrorHandler } from "../../helpers/Errorhandler";
// import HomeNavbar from "../../components/HomeNavbar";
// import Button from "../../components/Button";
// import { Icon } from "@iconify/react";
// import Validator from '../../utils/validator'
// import { Notifier } from "../../components/Notifier";
// import { useMediaQuery } from 'react-responsive'

// function Signin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [type, setType] = useState("");
//   const [action, setAction] = useState("create_password");
//   const [msg, setMsg] = useState("");
//   const [password, setPassword] = useState("");
//   const [step, setStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const { auth, setAuth, setUserDetails }: any = useContext(AuthContext);
//   const [btnDisabled, setBtnDisabled] = useState(false)
//   const [btnDisabled2, setBtnDisabled2] = useState(false);

  

//   const [signInOption, setSignInOption] = useState("personal");

//   const signInOptions = [
//     { key: 1, label: "personal" },
//     { key: 2, label: "business" },
//   ];

//   const getPass = async () => {
//     setLoading(true);
//     try {
//       const res = await createAccess(email, type, action);
//       if (res.status == 200) {
//         setLoading(false);
//         if (res.message == "Email address is not registered yet") {
//           setMsg(res.message);
//           return setTimeout(() => {
//             setMsg("");
//           }, 2000);
//         }
//         setStep(1);
//         setPassword(res.password);
//         setAction("sign_in");
//       } else {
//         setLoading(false);
//         setMsg(res.message);
//         setTimeout(() => {
//           setMsg("");
//         }, 2000);
//       }
//       console.log(res);
//     } catch (err) {
//       setLoading(false);
//       ErrorHandler(err, navigate, setAuth);
//     }
//   };

//   const signin = async () => {
//     setLoading(true);
//     try {
//       const res = await SignIn(email, signInOption, password);
//       console.log(res)
//       if (res.status == 200) {
//         setLoading(false);
//         setAuth(true);
//         setUserDetails(res.user);
//         localStorage.setItem("_EA_TOKEN", res.token);
//         navigate("/home");
//       } else {
//         setLoading(false);
//         setMsg(res.message);
//         setTimeout(() => {
//           setMsg("");
//         }, 2000);
//       }
//     } catch (err) {
//       setLoading(false);
//       ErrorHandler(err, navigate, setAuth);
//     }
//   };

//  useEffect(()=>{
//   if(email.length > 5){
//     if(email.length > 5 && !Validator.validateEmail(email)){
//         setBtnDisabled(true)
//         // Notifier('enter a valid email address', 'warning');
//       }else{
//           // Notifier('enter a valid email address', 'warning');
//           setBtnDisabled(false)
//       }
//   }else{
//     setBtnDisabled(true)
//   }
//  },[email])

//  useEffect(()=>{
//   if(password){
//     setBtnDisabled2(false)
//   }else{
//     setBtnDisabled2(true)
//   }
//  },[password])

//   return (
//     <>
//       <HomeNavbar />
//       
//       <div className={styles.container}>
//         <div className={styles.container_child}>
//           <div className={styles.col1}>
//             <div style={{ width: "500px" }}>
//               <h1 className={styles.mainText}>
//                 Borderless Banking for Multinationals
//               </h1>
//               <p style={{ color: "#002C3D", fontSize: "18px" }}>
//                 Make payments across borders and across currencies in cash,
//                 stablecoins and crypto.{" "}
//               </p>
//             </div>
//           </div>
//           <img src="/custom_divider.png" className={styles.divider} />

//           <div className={styles.col2}>
//             <div className={styles.form}>
//               <span className={styles.formHeaderText}>
//                 Got early access? <br />
//                 Sign in.
//               </span>
//               <img src="/pic-grouped.png" style={{ width: "250px" }} />
//               <p style={{ color: "#002C3D" }}>
//                 Stay up to date with new products, features and launch dates.
//                 Receive 500 points for every individual referral and 1,500
//                 points for Business referrals.
//               </p>
//               {step == 0 && (
//                 <>
//                   <div style={{ width: "100%", marginBottom: "20px" }}>
//                     <div
//                       style={{
//                         width: "100%",
//                         marginBottom: "20px",
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "60%",
//                           height: "45px",
//                           boxShadow: "inset -1px 2px 6px rgba(0, 0, 0, 0.06)",
//                           borderRadius: "50px",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "flex-start",
//                           backgroundColor: "white",
//                         }}
//                       >
//                         {signInOptions.map((option) => (
//                           <span
//                             onClick={() => setSignInOption(option.label)}
//                             style={
//                               option.label == signInOption
//                                 ? {
//                                     fontSize: "15px",
//                                     cursor: "pointer",
//                                     width: "50%",
//                                     height: "45px",
//                                     borderRadius: "50px",
//                                     backgroundColor: "#00AFF5",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     textAlign: "center",
//                                     color: "white",
//                                     textTransform: "capitalize",
//                                   }
//                                 : {
//                                     fontSize: "15px",
//                                     cursor: "pointer",
//                                     width: "50%",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     textAlign: "center",
//                                     textTransform: "capitalize",
//                                   }
//                             }
//                           >
//                             {option.label}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <p
//                       style={{
//                         marginBottom: "6px",
//                         color: "#002C3D",
//                         fontWeight: "500",
//                       }}
//                     >
//                       Email
//                     </p>
//                     <TextField
//                       value={email}
//                       style={{ width: "100%", backgroundColor: "white" }}
//                       type="email"
//                       placeholder="What is your email address?"
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   <Button
//                     disabled={btnDisabled}
//                     onClick={() => setStep(step + 1)}
//                     width="100%"
//                     height="60px"
//                     loading={loading}
//                     bgColor="#00AFF5"
//                     textColor="white"
//                     text="NEXT"
//                     iconUri="/arrow-right.png"
//                   />
//                 </>
//               )}
//               {step == 1 && (
//                 <>
//                   <div style={{backgroundColor: '#DCF3FF', display: 'flex', height: '60px', flexDirection: 'column', alignItems: 'center', width: '100%', borderRadius: '10px'}}>
//                     <div style={{width: '95%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
//                       <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
//                         <p style={{margin: 0, color: 'grey'}}>{email}</p>
//                         <span onClick={()=>setStep(0)} style={{fontSize: '15px', cursor: "pointer", color: '#0099D6'}}>change</span>
//                       </div>
//                       <p style={{fontSize: '12px', margin: 0}}>Signing in as {signInOption}</p>
//                     </div>
//                   </div>
//                   <div style={{ width: "100%", marginBottom: "20px" }}>
//                     <p
//                       style={{
//                         marginBottom: "6px",
//                         color: "#002C3D",
//                         fontWeight: "500",
//                       }}
//                     >
//                       Password
//                     </p>
//                     <TextField
//                       value={password}
//                       autoComplete="new-password"
//                       type="password"
//                       style={{ width: "100%", backgroundColor: "white" }}
//                       placeholder="Enter your password"
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                   <Button
//                     onClick={()=>signin()}
//                     width="100%"
//                     height="60px"
//                     disabled={btnDisabled2}
//                     loading={loading}
//                     bgColor="#00AFF5"
//                     textColor="white"
//                     text="LOG IN"
//                     iconUri="/arrow-right.png"
//                   />
//                 </>
//               )}

//               {/* <TextField value={action} placeholder="action" onChange={e=>setAction(e.target.value)} /> */}
//               <p style={{ fontSize: "13px", color: "red" }}>{msg}</p>
//               <p>
//                 Haven’t joined Poket Early Access?{" "}
//                 <span style={{ color: "orange" }}>Sign Up</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Signin;

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
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [btnDisabled2, setBtnDisabled2] = useState(false);
  
    
  
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
        console.log(res);
      } catch (err) {
        setLoading(false);
        ErrorHandler(err, navigate, setAuth);
      }
    };
  
    const signin = async () => {
      setLoading(true);
      try {
        const res = await SignIn(email, signInOption, password);
        console.log(res)
        if (res.status == 200) {
          setLoading(false);
          setAuth(true);
          setUserDetails(res.user);
          localStorage.setItem("_EA_TOKEN", res.token);
          navigate("/home");
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
        <div className={styles.form}>
          <h1>Got early access? <br/>Sign in.</h1>
          <div
            className={styles.switch}
          >
            <div
              style={{
                width: "90%",
                height: "45px",
                boxShadow: "inset -1px 2px 6px rgba(0, 0, 0, 0.06)",
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "white",
              }}
            >
              {signInOptions.map((option) => (
              <span
                  onClick={() => setSignInOption(option.label)}
                  style={
                    option.label == signInOption
                      ? {
                          fontSize: "15px",
                          cursor: "pointer",
                          width: "50%",
                          height: "45px",
                          borderRadius: "50px",
                          backgroundColor: "#00AFF5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          color: "white",
                          textTransform: "capitalize",
                        }
                      : {
                          fontSize: "15px",
                          cursor: "pointer",
                          width: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }
                  }
                >
                  {option.label}
                </span>
              ))}
            </div>
          </div>
          <Container>
            <p style={{color: '#57584E', fontSize: '14px'}}>Email Address</p>
            <TextField
              value={email}
              style={{ width: "100%", backgroundColor: "white" }}
              type="email"
              placeholder="What is your email address?"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Container>

          <Container>
            <p style={{color: '#57584E', fontSize: '14px'}}>Password</p>
            <TextField
              value={password}
              autoComplete="new-password"
              type="password"
              style={{ width: "100%", backgroundColor: "white" }}
              placeholder="Enter your password" 
              onChange={(e) => setPassword(e.target.value)}
            />
          </Container>
        
          <Container styles={{marginTop: '20px'}}>
            <Button
              onClick={()=>signin()}
              width="100%"
              height="60px"
              disabled={btnDisabled2}
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
            <p style={{fontSize: '15px', margin: 0}}>Haven’t joined Poket Early Access? <a href="https://poket-landing.herokuapp.com#form" style={{color: 'orange', textDecoration: 'none'}}>Sign Up</a></p>
            {/* <p style={{fontSize: '15px', margin: 0}}>Haven’t joined Poket Early Access? <a href="http://localhost/poket-website/#form" style={{color: 'orange', textDecoration: 'none'}}>Sign Up</a></p> */}
          </Center>
        </div>
      </main>
    </>
    
  )
}

export default Signin