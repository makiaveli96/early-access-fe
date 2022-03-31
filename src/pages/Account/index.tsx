//eslint-disable-next-line
import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer';
import styles from './styles.module.css';
import Divider from '../../components/Divider';
import TextField from '@mui/material/TextField';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import Button from '../../components/Button';
import countryList from '../../utils/countries';
import { sendVerificationCode, verifyCode, saveAcccountDetails } from '../../components/api/routes'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Modal from '../../components/Modal';
import Box from '@mui/material/Box';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContextApi';
import { Notifier } from '../../components/Notifier';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Countries from '../../utils/countries-states';
import { ErrorHandler } from '../../helpers/Errorhandler';

function Account() {

  const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const filter = createFilterOptions<any>();
  const [states, setStates] = useState<any>([])
  const [modal, showModal] = useState(false)
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');
  const [name, setName] = useState(userDetails.fullname);
  const [email, setEmail] = useState(userDetails.email)
  const [username, setUsername] = useState(userDetails.username || '')
  const [ phone, setPhone ] = useState(userDetails.phone || '');
  const [address, setAddress] = useState(userDetails.address)
  const [country, setCountry] = useState<any | null>(Countries[0])
  const [state, setState] = useState<any | null>(null)
  const [userCountry, setUserCountry] = useState(userDetails?.contry)
  const [userState, setUserState] = useState(userDetails?.state)
  const [postalCode, setPostalCode] = useState(userDetails.postalCode)
  const [verificationCode, setVerificationCode] = useState('');
  const [verifyCodeBtn, setVerifyCodeBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true)
  const [verifyBtn, setVerifyBtn] = useState(false)

  useEffect(()=>{
      if(userDetails?.country){
        const findCountry = Countries.find(country => country.name == userDetails?.country)
        if(findCountry){
            setCountry(findCountry)
            setStates(findCountry.states)
        }
      }
      if(userDetails?.state && states.length > 0){
        const findState = states.find(state => state.name == userDetails?.state)
        if(findState){
            setState(findState)
        }
      }
  },[])

  useEffect(()=>{
    setUserCountry(country?.name)
    setUserState(state?.name)
  },[country, state])

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    width: 446,
    maxWidth: '85%',
    bgcolor: 'background.paper',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '5px',
    textAlign: 'center',
    paddingBottom: '20px'
  };

  const sendCode=()=>{
      if(phone.length > 5){
            setMessage('a verification code will be sent to this phone number');
          (async()=>{
            const res = await sendVerificationCode(phone)
            if(res.status == 200){
                Notifier(res.message, 'success')
                showModal(true)
            }else{
                Notifier(res.message, 'error')
            }
          })()
      }else{
          setMessageColor('red');
          setMessage('enter a valid mobile number')
          setTimeout(()=>{
            setMessage('')
            setMessageColor('black');
          }, 3000)
      }
  }

  const verifyPhoneCode=async()=>{
    const res = await verifyCode(verificationCode)
    if(res.status == 200){
        showModal(false)
        setUserDetails(res.user);
        Notifier(res.message, 'success')
    }else{
        setVerificationCode('')
        Notifier(res.message, 'error')
    }
    console.log(res)
  }
  const saveAccountDetails=async()=>{
    try{
        setLoading(true);
        const res = await saveAcccountDetails(name, username, address, userCountry, userState, postalCode)
        if(res.status == 200){
            setLoading(false)
            setUserDetails(res.user)
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

  useEffect(()=>{
    if(verificationCode.length == 6){
        setVerifyCodeBtn(false)
    }else{
        setVerifyCodeBtn(true)
    }
  }, [verificationCode]);

  useEffect(()=>{
      if(
          name.length > 2 && 
          username.length > 3 &&
          address.length > 5 && 
          userCountry && 
          userState
        ){
            setSaveBtnDisabled(false)
        }else{
            setSaveBtnDisabled(true)
        }
  }, [name, username, address, userCountry, userState])

  useEffect(()=>{
    if(phone.length > 5){
        setVerifyBtn(true)
    }else{
        setVerifyBtn(false)
    }
  }, [phone]);

  useEffect(()=>{
    if(states.length > 0){
        setState(states[0])
        console.log(states[0]["name"], " first state")
    }
  },[states])

  return (
    <>
        <Navbar />
        <ToastContainer />
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.col1}>
                    <div className={styles.input_box}>
                        <p style={{marginBottom: '10px', color: '#64748B'}}>Name</p>
                        <TextField 
                            value={name} 
                            onChange={e=>setName(e.target.value)} 
                            style={{backgroundColor: 'white', width: '100%'}} 
                        />
                    </div>
                    <div className={styles.input_box}>
                        <p style={{marginBottom: '10px', color: '#64748B'}}>Email</p>
                        <TextField 
                            value={email} 
                            disabled 
                            onChange={e=>setEmail(e.target.value)} 
                            style={{backgroundColor: 'white', width: '100%'}} 
                        />
                    </div>
                    <div className={styles.input_box}>
                        <p style={{marginBottom: '10px', color: '#64748B'}}>Username</p>
                        <TextField 
                            value={username} 
                            onChange={e=>setUsername(e.target.value)} 
                            style={{backgroundColor: 'white', width: '100%'}} 
                        />
                    </div>
                    <div className={styles.input_box}>
                        <p style={{marginBottom: '10px', color: '#64748B'}}>Phone number</p>
                        <PhoneInput
                            specialLabel=''
                            inputStyle={{width: '100%'}}
                            country={'us'}
                            value={phone}
                            disabled={userDetails.isPhoneVerified}
                            onChange={phone=>setPhone(phone)}
                        />
                        {<>
                            {verifyBtn && (
                                <>
                                {!userDetails.isPhoneVerified && (
                                    <>
                                        <span style={{fontSize: '12px', color: messageColor}}>{message}</span>
                                        <div style={{marginTop: '30px'}}>
                                            <Button onClick={()=>sendCode()} bgColor='#00AFF5' text="VERIFY NUMBER" width="100%" height="60px" />
                                        </div>
                                    </>
                                )}
                                </>
                            )}
                        </>}
                       
                        
                    </div>
                </div>

                <div className={styles.col2}>
                    <div className={styles.input_box}>
                        <p style={{marginBottom: '10px', color: '#64748B'}}>Address</p>
                        <TextField value={address} onChange={e=>setAddress(e.target.value)} style={{backgroundColor: 'white', width: '100%'}} />
                    </div>

                    {/* COUNTRIES */}
                    <div className={styles.input_box}>
                        <p  style={{marginBottom: '10px', color: '#64748B'}}>Country of Residence</p>
                        <Autocomplete
                            value={country}
                            style={{width: '100%'}}
                            onChange={(event, newValue) => {
                                if (typeof newValue["name"] === 'string') {
                                    setCountry(newValue);
                                    setStates(newValue.states)
                                    console.log(newValue, ' new val 1')
                                } else if (newValue && newValue.inputValue) {
                                    console.log(newValue, ' new val 2')
                                    // Create a new value from the user input
                                    // setCountry(newValue);

                                } else {
                                    console.log(newValue, ' new val 3')
                                    setCountry(newValue);
                                    setStates(newValue.states)
                                }
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="country-selector"
                            options={Countries}
                            getOptionLabel={(option) => {
                                if (typeof option.name === 'string') {
                                    return option.name;
                                }
                                if (option.inputValue) {
                                    return option.inputValue;
                                }
                                return option.name;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.name}</li>}
                            sx={{ width: 300 }}
                            freeSolo
                            renderInput={(params) => (
                                <TextField placeholder='select a country'
                                    autoComplete='new-password'
                                {...params} />
                            )}
                        />
                    </div>

                    {/* STATES IN COUTNRY */}
                    <div className={styles.input_box}>
                        <p  style={{marginBottom: '10px', color: '#64748B'}}>States</p>
                        <Autocomplete
                            value={state}
                            style={{width: '100%'}}
                            onChange={(event, newValue) => {
                                if (typeof newValue?.name === 'string') {
                                    setState(newValue);
                                    console.log(newValue, ' new state val 1')
                                } else if (newValue && newValue.inputValue) {
                                    console.log(newValue, ' new state val 2')
                                    // Create a new value from the user input
                                    // setCountry(newValue);

                                } else {
                                    console.log(newValue, ' new state val 3')
                                    setState(newValue);
                                }
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="state-selector"
                            options={states}
                            getOptionLabel={(option) => {
                            if (typeof option?.name === 'string') {
                                return option.name;
                            }
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            return option.name;
                            }}
                            renderOption={(props, option) => <li {...props}>{option?.name}</li>}
                            sx={{ width: 300 }}
                            freeSolo
                            renderInput={(params) => (
                            <TextField 
                                autoComplete='new-password'
                                placeholder='select state' 
                                {...params} 
                            />
                            )}
                        />
                    </div>
                    <div className={styles.input_box}>
                        <p style={{marginBottom: '10px', color: '#64748B'}}>Postal Code</p>
                        <TextField value={postalCode} onChange={e=>setPostalCode(e.target.value)} style={{backgroundColor: 'white', width: '100%'}} />
                    </div>
                    <div className={styles.input_box}>
                        <Button loading={loading} disabled={saveBtnDisabled || loading} onClick={()=>saveAccountDetails()} style={{marginTop: '30px'}} bgColor='#00AFF5' text="SAVE" width="100%" height="60px" />
                    </div>
                </div>
            </div>
            {!userDetails.isWhitelisted && (
                <div className={styles.main2}>
                    <div className={styles.col1} style={{textAlign: 'left'}}>
                        <p><span style={{fontSize: '20px', fontWeight: 'bold'}}>Token Presale Whitelist</span><br/> To qualify for our upcoming Token presale event, your account must be whitelisted. <span style={{fontWeight: '600'}}>Read more about the presale event and account whitelisting <a style={{color: '#00AFF5', textDecoration: 'none'}} href="">here</a>.</span></p>
                    </div>
                    <div className={styles.col2}>
                        <Button onClick={()=>navigate('/account/whitelist')} style={{marginTop: '30px'}} bgColor='#00668F' text="GET WHITELISTED" width="100%" height="60px" />
                    </div>
                </div>
            )}
            
        </div>
        <Footer />
        <Modal modal={modal} showModal={showModal}>
            <Box sx={style}>
                <span onClick={()=>showModal(false)} style={{backgroundColor: '#F8FAFC', cursor: 'pointer', marginRight: '-20px', marginTop: '-20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', width: '40px', borderRadius: '50%', alignSelf: 'flex-end'}}>
                    <FaTimes size={25} color="#0099D6" />
                </span>
                <div style={{ maxWidth: '60%' }}>
                    <p style={{color: '#002C3D'}}>Enter the verification code sent to <b>+{phone}</b></p>
                </div>
                <TextField value={verificationCode} onChange={e=>setVerificationCode(e.target.value)} style={{textAlign: 'center'}} inputMode='numeric' type="number" placeholder="verification code" />
                <Button disabled={verifyCodeBtn} onClick={()=>verifyPhoneCode()} style={{marginTop: '30px'}} bgColor='#00668F' text="VERIFY CODE" width="50%" height="60px" />
            </Box>
        </Modal>
    </>
  )
}

export default Account