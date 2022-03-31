import React, { useEffect, useContext, useState } from 'react'
import styles from './styles.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Divider from '../../components/Divider';
import Button from '../../components/Button';
import Countdown from '../../components/CountDown';
import PointBalance from '../../components/PointBalance';
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal';
import Box from '@mui/material/Box';
import { FaTimes } from 'react-icons/fa'
import Links from '../../components/Links';
import { AuthContext } from '../../contexts/authContextApi';
import { hasLoggedIn } from '../../components/api/routes';
import { format, parseISO } from 'date-fns';


function Home() {

    const navigate = useNavigate()
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);
    const [refs, setRefs] = useState([])
    const referrals: Array<{time: string, points: string}> = []

    useEffect(()=>{
        console.log(userDetails)
        if(!userDetails.hasLoggedIn){
            (async()=>{
                const res = await hasLoggedIn()
                if(res.status == 200){
                    setUserDetails(res.user)
                }
            })()
            handleOpen()
        }
        userDetails.businessReferrals.forEach(ref=>{
            referrals.push({ time: ref?.time, points: '+1500' })
        })
        userDetails.referrals.forEach(ref=>{
            referrals.push({ time: ref?.time, points: '+500' })
        })
        referrals.sort(function(a, b){
            return new Date(b.time).valueOf() - new Date(a.time).valueOf();
        });
        setRefs(referrals)
        console.log(referrals, ' refsss')

    },[])


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 446,
        maxWidth: '85%',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '5px',
        textAlign: 'center'
      };
    

  return (
      <>
      <Navbar />
       <div className={styles.home_main}>
            <div className={styles.home}>
                <div className={styles.home_col1}>
                    <h2 style={{color: '#00668F', textAlign: 'center'}}>Hi <span style={{textTransform: 'capitalize'}}>{userDetails?.fullname? userDetails?.fullname : ''}</span>, welcome to Poket!.</h2>
                    {!userDetails.isWhitelisted && (
                        <>
                            <div className={styles.col1_1}>
                                <p>By signing up, you have already secured 1,000 free tokens from Poket to get you started. You will gain 500 points for every individual referral and 1,500 points for Business referrals</p>
                            </div>
                            <div className={styles.col1_2}>
                                <Links />
                            </div>
                            <Divider />
                        </>
                    )}
                   
                    {!userDetails.isWhitelisted && (
                        <>
                        <div className={styles.col1_3}>
                            <div className={styles.col1_3__div1}>
                                <h2>Token Presale Whitelist</h2>
                                <p>To qualify for our upcoming Token presale event, your account must be whitelisted. <span style={{fontWeight: '600'}}>Learn more about our tokens, presale event and whitelisting your account <a href="" style={{color: '00AFF5', textDecoration: 'none'}}>here</a></span>.</p>
                            </div>
                            <div className={styles.col1_3__div2}>
                                <Button onClick={()=>navigate('/account/whitelist')} bgColor='#00AFF5' text="GET WHITELISTED" height='82px' width='240px' />
                            </div>
                        </div>
                        <Divider />
                        </>
                    )}
                   
                    <div className={styles.col1_4}>
                        <div className={styles.col1_4__div1}>
                            <h2>Countdown to Token presale event.</h2>
                            <div className={styles.col1_4__div2}>
                                <Countdown />
                                <Button bgColor='#00AFF5' text="BUY TOKENS"  disabled height='82px' width='240px' />
                            </div>
                        </div>
                    </div>
                    {userDetails.isWhitelisted && (
                        <div className={styles.whitelisted_container}>
                        {/* <div className={styles.col1_3}> */}
                                <h2>Token Presale Whitelist</h2>
                                <p>You are qualified for our upcoming Token presale event. <span style={{fontWeight: '600'}}>Learn more about our tokens, presale event and whitelisting your account <a href="" style={{color: '#00AFF5', textDecoration: 'none', fontWeight: '600'}}>here</a></span>.</p>
                        {/* </div> */}
                        </div>
                    )}
                    <br />
                    {userDetails.isWhitelisted && (
                        <>
                        <Divider width='90%' />
                            <div className={styles.col1_1}>
                                <p>By signing up, you have already secured 1,000 free tokens from Poket to get you started. You will gain 500 points for every individual referral and 1,500 points for Business referrals</p>
                            </div>
                            <div className={styles.col1_2}>
                                <Links />
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.home_col2}>
                    <Button onClick={()=>window.location.href = 'https://2et4vgvtfp0.typeform.com/to/PCynCzZi'} bgColor='#FFE0C2' height='60px' width="95%" text='TAKE THE QUESTIONAIRE' textColor='#002C3D' />
                    <PointBalance />
                    <div className={styles.activity}>
                        <span>Activity History</span>
                        {[...userDetails?.businessReferrals, ...userDetails?.referrals].length == 0 && (
                            <div style={{width: '100%'}}>
                                <p style={{textAlign: 'center', fontSize: '13px', color: '#B3BCCE'}}>No recent Activity</p>
                            </div>
                        )}
                        {refs.map((referral, i)=>(
                            <div style={{width: '100%'}} key={i}>
                            <Divider type="dashed" width="100%" />
                            <div className={styles.activity__item}>
                                <div>
                                    <p style={{color: '#231712', fontWeight: '600', margin: 0, fontSize: '18px'}}>Poket referal bonus</p>
                                    {referral?.time && (
                                        <p style={{color: '#B3BCCE', fontWeight: '600', margin: 0, fontSize: '15px'}}>{format(parseISO(referral?.time), 'LLL, dd, yyyy')}</p>
                                    )}
                                </div>
                                <Button bgColor='#16A34A' height='40px' width="131px" text={referral.points} textColor='white' />
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        <Modal modal={openModal} showModal={setOpenModal} backdropClose={false}>
          <Box sx={style}>
            <span onClick={()=>{setOpenModal(false); navigate('/home')}} style={{backgroundColor: '#F8FAFC', cursor: 'pointer', marginRight: '-20px', marginTop: '-20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', width: '40px', borderRadius: '50%', alignSelf: 'flex-end'}}>
              <FaTimes size={25} color="#0099D6" />
            </span>
            <div style={{width: '70%'}}>
              <p style={{fontSize: '16px'}}><b>Congratulations</b> for signing up for early access! You have received <b>+1000 points</b>! </p>
            </div>
          <img src="/sally-4.png" style={{width: '90%'}} alt="giftimage" />
        </Box>
        </Modal>
      </>
   
  )
}

export default Home