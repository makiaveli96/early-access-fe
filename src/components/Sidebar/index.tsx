import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { MdMenu } from 'react-icons/md'
import { BiLogOut, BiUserCircle, BiCog } from "react-icons/bi";
import { FiBell, FiUser, FiUsers, FiMail } from 'react-icons/fi'
import { BsFlag } from 'react-icons/bs'
import { Icon } from '@iconify/react';
import { RiBitCoinFill } from 'react-icons/ri'
import { GeneralContext } from "../../contexts/generalContextApi";
import { AuthContext } from '../../contexts/authContextApi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { deletePassToken } from '../../components/api/routes'

function Sidebar() {

  const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    showProfile,
    showUploadImage,
    showReferrals,
    showWhitelist,
    joinCommunityRef,
    contactUsRef
  }: any = useContext(GeneralContext)

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
    <aside className={styles.sidebar}>
      <div className={styles.body}>
        <div className={styles.header}>
            <p className={styles.header_text1}>Poket</p>
            <p className={styles.header_text2}>{userDetails?.account} Account</p>
        </div>
        <div className={styles.sidebar_items}>
          <p style={{ color: "#00668F", fontSize: "12px", marginLeft: "10px" }}>
            Early Access
          </p>
          <li onClick={()=>showProfile(true)}>
            <FiUser color="#002C3D" />
            <span>Profile</span>
          </li>
          <li onClick={()=>showReferrals(true)}>
            <FiUsers color="#002C3D" />
            <span>Referral</span>
          </li>
          <li onClick={()=>joinCommunityRef.current.scrollIntoView({behavior: 'smooth'})}>
            <Icon icon="fluent:people-community-24-regular" color="#002C3D" />
            <span>
              Community
            </span>
          </li>
          <li style={{cursor: userDetails?.isWhitelisted? 'not-allowed' : 'pointer'}} onClick={()=>userDetails?.isWhitelisted? null : showWhitelist(true)}>
            <BsFlag color="#002C3D" />
            <span>Whitelist</span>
            {userDetails?.isWhitelisted && (
              <span>
              <Icon icon="bi:check-circle-fill" width="14px" height="14px" color="#0099D6" />
              </span>
            )}
          </li>
          <li onClick={()=>contactUsRef.current.scrollIntoView({behavior: 'smooth'})}>
            <FiMail color="#002C3D"  />
            <span>Contact sales</span>
          </li>
        </div>

        <div className={styles.sidebar_items}>
          <p style={{ color: "#00668F", fontSize: "12px", marginLeft: "10px" }}>
            Comming soon
          </p>
          <li style={{cursor: 'not-allowed', opacity: '.7'}}>
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
        </div>
      </div>

      <div className={styles.footer}>
        <li>
          <img src="/icons/cog.png" />
          <span>Account</span>
        </li>
        <li onClick={()=>logOut()}>
          <p>Sign out</p>
        </li>
      </div>
    </aside>
  );
}

export default Sidebar;
