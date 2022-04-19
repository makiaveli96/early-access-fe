import React, { useState, useContext } from 'react'
import styles from './styles.module.css';
import { MdMenu } from 'react-icons/md'
import { BiLogOut, BiUserCircle, BiCog } from "react-icons/bi";
import { FiBell, FiUser, FiUsers, FiMail } from 'react-icons/fi'
import { BsFlag } from 'react-icons/bs'
import { Icon } from '@iconify/react';
import { RiBitCoinFill, RiArrowRightSLine } from 'react-icons/ri';
import { GeneralContext } from "../../contexts/generalContextApi";
import { AuthContext } from '../../contexts/authContextApi';
import { CgShoppingBag } from 'react-icons/cg'
import { deletePassToken } from '../../components/api/routes';
import { Link, NavLink, useNavigate } from 'react-router-dom';


function Navbar() {

  const [drawer, showDrawer] = useState(-100);
  const [overlay, showOverlay] = useState('none');
  const {
    showProfile,
    showUploadImage,
    showReferrals,
    showWhitelist,
    joinCommunityRef,
    contactUsRef,
    showPresale,
    showVerifyEmail
  }: any = useContext(GeneralContext);
  const navigate = useNavigate();
  const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);

  function navClick(func: any){
    if(userDetails?.isEmailVerified){
      func(true)
    }else{
      showVerifyEmail(true)
    }
    showDrawer(-100); 
    showOverlay('none')
  }

  
  const logOut=async()=>{
    const res = await deletePassToken();
    if(res.status == 200){
      localStorage.removeItem('_EA_TOKEN');
      setAuth(false);
      setUserDetails(null)
      navigate('/')
    }
  }

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.col1}>
          <span className={styles.toggler}>
            <MdMenu color="#00668F" size="30" onClick={()=>{showDrawer(0); showOverlay('flex')}} />
          </span>
          <p className={styles.link}>Home <RiArrowRightSLine /> Dashboard</p>
        </div>
        {userDetails?.profilePhoto? (
          <img src={userDetails?.profilePhoto} style={{borderRadius: '50%', height: '40px', width: '40px'}} />
        ):(
          <img src="/icons/no-image.png" style={{height: '40px', width: '40px', borderRadius: '50%'}} />
        )}
        {/* <div className={styles.col2}>
          <span>
            <FiBell size={23} color="grey" />
          </span>
          <span>
            <BiUserCircle size={23} color="grey" />
          </span>
        </div> */}
      </div>

      {/* DRAWER */}
      <main className={styles.drawer} style={{zIndex:'2',overflowX:'scroll',transform:`translateX(${drawer}%)`}}>
        <div className={styles.drawer_body}>
        <span style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}} onClick={()=>{showDrawer(-100); showOverlay('none')}}>
          <Icon icon="clarity:times-line" height={35} width={35} />
        </span>
        <div className={styles.drawer_header}>
          <img src="/poket-logo.png" height="20px" style={{ marginRight: '3px'}} />
          <p style={{textTransform: 'capitalize', fontSize: '12px', color: '#0099D6'}}>{userDetails?.account} Account</p>
        </div>
          <div className={styles.drawer_items}>
            <p style={{ color: "#00668F", fontSize: "12px", marginLeft: "10px" }}>
              Early Access
            </p>
            <li onClick={()=>{navClick(showProfile)}}>
              <FiUser color="#002C3D" />
              <span>Profile</span>
            </li>
            <li onClick={()=>{navClick(showReferrals)}}>
              <FiUsers color="#002C3D" />
              <span>Referral</span>
            </li>
            <li onClick={()=>{joinCommunityRef.current.scrollIntoView({behavior: 'smooth'}); showDrawer(-100); showOverlay('none')}}>
              <Icon icon="fluent:people-community-24-regular" color="#002C3D" />
              <span>Community</span>
            </li>
            {userDetails?.isProfileSet && (
              <>
              {userDetails?.isWhitelisted ? (
              <li onClick={()=>{navClick(showPresale)}}>
                <CgShoppingBag color="#002C3D" />
                <span>Presale Event</span>
              </li>
              ):(
                <li onClick={()=>{navClick(showWhitelist)}}>
                  <BsFlag color="#002C3D" />
                  <span>Whitelist</span>
                </li>
              )}
              </>
            )}
            
            <li onClick={()=>{contactUsRef.current.scrollIntoView({behavior: 'smooth'}); showDrawer(-100); showOverlay('none')}}>
              {/* <img src="/icons/mail.png" /> */}
              <FiMail color="#002C3D"  />
              <span>Contact sales</span>
            </li>
          </div>

          <div className={styles.drawer_items}>
            <p style={{ color: "#00668F", fontSize: "12px", marginLeft: "10px" }}>
              Coming soon
            </p>
            <li style={{cursor: 'not-allowed', opacity: '.7'}}>
              {/* <img src="/icons/wallet.png" /> */}
              <Icon icon="la:wallet" color="#002C3D"  /> 
              <span>Wallets</span>
            </li>
            <li style={{cursor: 'not-allowed', opacity: '.7'}}>
              <img src="/icons/b_crypto.png" />
              <span>Payments</span>
            </li>
            <li style={{cursor: 'not-allowed', opacity: '.7'}}>
              <img src="/icons/swap.png" />
              <span>Swap</span>
            </li>
            <li style={{cursor: 'not-allowed', opacity: '.7'}}>
              <img src="/icons/send.png" />
              <span>Transfers</span>
            </li>
            <li style={{cursor: 'not-allowed', opacity: '.7'}}>
              <img src="/icons/google-play.png" />
              <span>Poket App</span>
              <span style={{border: '1px solid #09A4DA', padding: '3px', fontSize: '10px', color: '#09A4DA', borderRadius: '10px'}}>
                  BETA
              </span>
            </li>
            <li onClick={()=>logOut()}>
              <p>Sign out</p>
            </li>
          </div>
        </div>
        
      
      </main>
      <div className={styles.backmodal} onClick={()=>{showDrawer(-100); showOverlay('none')}} style={{zIndex: '1', transform:`translateX(${drawer}%)`}}></div>
    </>
    
  )
}

export default Navbar