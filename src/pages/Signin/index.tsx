import React, { useState, useContext } from 'react';
import { CircularProgress, TextField } from '@mui/material';
import { createAccess } from '../../components/api/routes'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContextApi';
import { ToastContainer } from 'react-toastify'
import Countries from '../../utils/countries-states';
import styles from './styles.module.css'
import { ErrorHandler } from '../../helpers/Errorhandler';


function Signin() {

    const navigate =  useNavigate()
    const [email, setEmail] = useState('')
    const [type, setType] = useState('')
    const [action, setAction] = useState('create_password');
    const [msg, setMsg] = useState('')
    const [password, setPassword] = useState('')
    const [step, stetStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const { auth, setAuth, setUserDetails }: any = useContext(AuthContext);

    const getPass=async()=>{
        setLoading(true)
        try{
            const res = await createAccess(email, type, action)
            if(res.status == 200){
                setLoading(false)
                stetStep(1);
                setPassword(res.password)
                setAction('sign_in')
            }else{
                setLoading(false)
                setMsg(res.message);
                setTimeout(()=>{
                    setMsg('');
                }, 2000)
            }
            console.log(res)
        }catch(err){
            setLoading(false)
            ErrorHandler(err, navigate, setAuth)
        }
    }

    const signin=async()=>{
        setLoading(true);
        try{
            const res = await createAccess(email, type, action, password)
            if(res.status == 200){
                setLoading(false)
                setAuth(true);
                setUserDetails(res.user)
                navigate('/home')
            }else{
                setLoading(false);
                setMsg(res.message);
                setTimeout(()=>{
                    setMsg('');
                }, 2000)
            }
            console.log(res)
            localStorage.setItem('_EA_TOKEN', res.token)
        }catch(err){
            setLoading(false);
            ErrorHandler(err, navigate, setAuth)
        }
    }

  return (
      <>
      <ToastContainer />
      <div style={{width: '100vw', height: '100vh', backgroundColor: 'rgba(230, 247, 254)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {step == 0 && (
            <div className={styles.main}>
                <h3 style={{color: '#00AFF5'}}>Get Password</h3>
                <TextField value={email} style={{width: '100%'}} placeholder="email" onChange={e=>setEmail(e.target.value)} />
                <TextField value={type} style={{width: '100%', marginTop: 10}} placeholder="type" onChange={e=>setType(e.target.value)} />
                {/* <TextField value={action} placeholder="action" onChange={e=>setAction(e.target.value)} /> */}
                <p style={{fontSize: '13px', color: 'red'}}>{msg}</p>
                <button className={styles.button} onClick={()=>getPass()}>
                   Get Passsword
                   {loading && (
                        <span style={{marginLeft: '10px'}}>
                            <CircularProgress style={{ color: 'white' }} size={25} />
                        </span>
                   )}
                </button>
            </div>
          )}
       
        {step == 1 && (
            <div className={styles.main}>
                <h3 style={{color: '#00AFF5'}}>Signin</h3>
                <TextField value={email} style={{width: '100%'}} placeholder="email" onChange={e=>setEmail(e.target.value)} />
                <TextField value={type} style={{width: '100%', marginTop: 10}} placeholder="type" onChange={e=>setType(e.target.value)} />
                {/* <TextField value={action} placeholder="action" onChange={e=>setAction(e.target.value)} /> */}
                <TextField value={password} style={{width: '100%', marginTop: 10}} placeholder="password" onChange={e=>setPassword(e.target.value)} />
                <p style={{fontSize: '13px', color: 'red'}}>{msg}</p>
                <button className={styles.button} onClick={()=>signin()}>
                    Signin
                    {loading && (
                        <span style={{marginLeft: '10px'}}>
                            <CircularProgress style={{ color: 'white' }} size={25} />
                        </span>
                    )}
                </button>
            </div>
        )}
    </div>
    </>
  )
}

export default Signin