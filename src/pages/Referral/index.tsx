import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { TextField } from '@mui/material'
import Button from '../../components/Button'
import { FaTimes } from 'react-icons/fa'
import { v4 as uuid } from 'uuid';
import Modal from '../../components/Modal'
import Divider from '../../components/Divider'
import Links from '../../components/Links';
import { sendInvites } from '../../components/api/routes';
import { AuthContext } from '../../contexts/authContextApi';
import { ToastContainer, toast } from 'react-toastify';
import { Notifier } from '../../components/Notifier'
import { useNavigate } from 'react-router-dom';
import { ErrorHandler } from '../../helpers/Errorhandler';
import Validator from '../../utils/validator'

function Referral() {
    const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [invitees, setInvitees] = useState<any>([]);
    const [modal, showModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [addBtnDisabled, setAddBtnDisabled] = useState(false)

    useEffect(()=>{
        if(invitees.length > 0){
            setBtnDisabled(false)
        }else{
            setBtnDisabled(true)
        }
    },[invitees])

    const handleClose=()=>showModal(false)

    const addInvitee=()=>{
        if(name && email){
            setInvitees((prev: any)=>{
                var checkEmail = prev.find((invite: any)=> invite.email == email.trim())
                if(checkEmail){
                    setName('')
                    setEmail('')
                    return [...prev]
                }else{
                    return [...prev, { id: uuid(), name: name.trim(), email: email.trim() }]
                }
            })
            setName('')
            setEmail('')
        }else{
            setMessage('both fields are required')
            setTimeout(()=>{
                setMessage('')
            },2500)
        }
    }

    const removeItem=(id: string)=>{
        var filtered = invitees.filter((invitee: any) => invitee.id !== id)
        setInvitees(filtered)
    }

    const sendReferral=async()=>{
        setLoading(true)
        try{
            const res = await sendInvites(userDetails.fullname, invitees);
            if(res.status == 200){
                setLoading(false)
                setName('')
                setEmail('')
                setInvitees([])
                showModal(true);
                setAddBtnDisabled(true)
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
        if(email.length > 5){
            if(email.length > 5 && !Validator.validateEmail(email)){
                setAddBtnDisabled(true)
                setMessage('enter a valid email address');
            }else{
                setMessage('');
                setAddBtnDisabled(false)
            }
        }else{
            setAddBtnDisabled(true)
        }
        
    }, [email])

  return (
      <>
      <Navbar />
      
      <div className={styles.container}>
          <div className={styles.main}>
                <div className={styles.referral_form}>
                    <h3 style={{color: '#002C3D'}}>Earn 500 points for every individual referral and 1,500 points for Business referrals.</h3>
                    {/* <div></div> */}
                    <div className={styles.form}>
                        {invitees.length > 0 && (
                            <p style={{margin: 0, fontSize: '15px', fontWeight: 'bold'}}>Send Invite To</p>
                        )}
                        <div style={{width: '100%', marginTop: '15px'}}>
                            {invitees.map((invitee: any)=>(
                                <div style={{display: 'flex', width: '100%', marginBottom: '10px', padding: 0, flexWrap: 'wrap', wordBreak: 'break-all', paddingBottom: '0px', alignItems: 'center', justifyContent: 'space-between'}} key={invitee.id}>
                                    <p style={{margin: 0}}>{invitee.email}</p>
                                    <p style={{margin: '0px', cursor: 'pointer', fontStyle: 'italic', color: '#00AFF5'}} onClick={()=>removeItem(invitee.id)}>remove</p>
                                </div>
                            ))} 
                        </div>
                      
                        <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <div style={{width: '48%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <p>Invitee's Name</p>
                                    <TextField placeholder="who you're inviting" value={name} onChange={e=>setName(e.target.value)} style={{width: '100%'}} />
                                </div>

                                <div style={{width: '48%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <p>Email</p>
                                    <TextField placeholder='their email' value={email} onChange={e=>setEmail(e.target.value)} style={{width: '100%'}} />
                                </div>
                        </div>
                        {message ? (
                            <span style={{color: 'tomato', fontSize: '13px', marginTop: '5px'}}>{message}</span>
                        ):null}
                        {!addBtnDisabled && (
                            <p onClick={()=>addInvitee()} style={{color: '#00668F', cursor: 'pointer'}}>+ Add Invitee</p>
                        )}
                        <div style={{marginTop: '10px'}}>
                            <Button loading={loading} onClick={()=>sendReferral()} disabled={btnDisabled || loading} bgColor='#00AFF5' height='60px' width="266px" text="INVITE" iconUri='/arrow-right.png' />
                        </div>
                    </div>
                    {/* <div style={{marginTop: '50px', marginBottom: '50px', width: '100%'}}> */}
                        <Divider />
                    {/* </div> */}
                    {/* <div className={styles.summary_text}>
                            <p>By signing up, you have already secured 1,000 free tokens from Poket to get you started. You will gain 500 points for every individual referral and 1,500 points for Business referrals</p>
                    </div> */}
                    <Links />
                </div>
          </div>
      </div>
      <Footer />
      <Modal modal={modal} showModal={showModal}>
        <div style={{height: '100%', userSelect: 'none', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <img src="/plane.png" style={{width: '60%'}} alt="plane" />
                <h3 style={{color: 'white', textAlign: 'center'}}>Your Invitation was sent seccesfully!</h3>
                <Button onClick={()=>handleClose()} bgColor='#00AFF5' height='60px' width="266px" text="Send new Referral" iconUri='/arrow-right.png' />
                <span style={{color: 'white', marginTop: '30px'}} onClick={handleClose}>CLOSE</span>
            </div>
        </div>
      </Modal>
      </>
  )
}

export default Referral