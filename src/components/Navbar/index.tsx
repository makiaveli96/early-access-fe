// import React, { useState, useContext } from 'react';
// import styles from './styles.module.css'
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa'
// import { useMediaQuery } from 'react-responsive'
// import { deletePassToken } from '../../components/api/routes'
// import Button from '../Button';
// import { AuthContext } from '../../contexts/authContextApi';


// export default function Navbar(){

//     const navigate = useNavigate();
//     const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);

//     const [navItemDisplay, setNavItemDisplay] = useState('')
//     const [dropDown, setDropDown] = useState(-100)
//     const [height, setHeight] = useState('0px')
//     const navItems = [
//         { name: 'Home', link: 'home' },
//         { name: 'Referral', link: 'referral' },
//         { name: 'Account', link: 'account' },
//         { name: 'Log Out', link: 'logout' },
//     ]

//     const toggleDropDown=()=>{
//         if(height == '0px'){
//             setHeight('210px')
//         }else{
//             setHeight('0px')
//         }
//     }

//     const logOut=async()=>{
//         const res = await deletePassToken();
//         if(res.status == 200){
//             localStorage.removeItem('_EA_TOKEN');
//             setAuth(false);
//             setUserDetails(null)
//             navigate('/')
//         }
//     }


//     return(
//         <div className={styles.nav_main}>
//             <div className={styles.nav}>
//                 <img src="/poket-logo.png" style={{ width: '98px', height: '24px' }} alt="logo" />
//                 <span onClick={()=>toggleDropDown()} className={styles.bars}><FaBars size={25} color="#0099D6" /></span>
//                 <div style={{display: navItemDisplay}} className={styles.nav__items}>
//                     {navItems.map((item,i)=>(
//                         <NavLink
//                         className={styles.nav_item}
//                             style={({ isActive }) => {
//                                 if(isActive){
//                                     return {
//                                         paddingBottom: '7px',
//                                         textDecoration: 'none',
//                                         color: '#000000',
//                                         borderBottom: '4px solid #00AFF5'
//                                     }
//                                 }else{
//                                     return {
//                                         paddingBottom: '7px',
//                                         textDecoration: 'none',
//                                         color: 'grey',
//                                     }
//                                 }
//                             }}
//                             to={`/${item.link}`}
//                             onClick={()=>item.link == 'logout'? logOut() : null}
//                             key={i}
//                         >
//                             {item.name}
//                         </NavLink>
//                     ))}
//                     {!userDetails.isWhitelisted && (
//                         <button onClick={()=>navigate('/account/whitelist')} className={styles.get_whitelisted_btn1}>
//                             GET WHITELISTED
//                         </button>
//                     )}
                 
//                 </div>
//             </div>
//             {/* SIDE BAR */}
//             {/* <div className={styles.drop_down} style={{overflowX:'scroll',transform:`translateY(${dropDown}%)`}}> */}
//             <div className={styles.drop_down} style={{overflowX:'scroll', height: height}}>
//                 <div style={{width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
//                     {/* <span onClick={()=>setDropDown(-100)} style={{alignSelf: 'flex-end'}}><FaTimes /></span> */}
//                     {navItems.map((item,i)=>(
//                         <NavLink
//                         className={styles.nav_item}
//                             style={({ isActive }) => {
//                                 if(isActive){
//                                     return {
//                                         textDecoration: 'none',
//                                         color: 'lightgrey',
//                                     }
//                                 }else{
//                                     return {
//                                         textDecoration: 'none',
//                                         color: 'white',
//                                     }
//                                 }
//                             }}
//                             to={`/${item.link}`}
//                             onClick={()=>item.link == 'logout'? logOut() : null}
//                             key={i}
//                         >
//                             {item.name}
//                         </NavLink>
                       
//                     ))}
//                     {!userDetails.isWhitelisted && (
//                         <Button onClick={()=>navigate('/account/whitelist')} text="GET WHITELISTED" textColor='#00AFF5' bgColor='white' height="50px" width='50%' />
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

import React, { useState, useContext } from 'react'
import styles from './styles.module.css';
import { MdMenu } from 'react-icons/md'
import { BiLogOut, BiUserCircle, BiCog } from "react-icons/bi";
import { FiBell, FiUser, FiUsers, FiMail } from 'react-icons/fi'
import { BsFlag } from 'react-icons/bs'
import { Icon } from '@iconify/react';
import { RiBitCoinFill } from 'react-icons/ri';
import { GeneralContext } from "../../contexts/generalContextApi";
import { AuthContext } from '../../contexts/authContextApi';

function Navbar() {

  const [drawer, showDrawer] = useState(-100);
  const [overlay, showOverlay] = useState('none');
  const {
    showProfile,
    joinCommunityRef,
    contactUsRef
  }: any = useContext(GeneralContext);
  const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);


  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.col1}>
          <span className={styles.toggler}>
            <MdMenu color="#00668F" size="30" onClick={()=>{showDrawer(0); showOverlay('flex')}} />
          </span>
          <p>Home {'>'} dashboard</p>
        </div>
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
          <div className={styles.drawer_items}>
            <p style={{ color: "#00668F", fontSize: "12px", marginLeft: "10px" }}>
              Early Access
            </p>
            <li onClick={()=>{showProfile(true); showDrawer(-100); showOverlay('none')}}>
              <FiUser color="#002C3D" />
              <span>Profile</span>
            </li>
            <li>
              <FiUsers color="#002C3D" />
              <span>Referral</span>
            </li>
            <li onClick={()=>{joinCommunityRef.current.scrollIntoView({behavior: 'smooth'}); showDrawer(-100); showOverlay('none')}}>
              <Icon icon="fluent:people-community-24-regular" color="#002C3D" />
              <span>Community</span>
            </li>
            <li>
              {/* <img src="/icons/flag.png" /> */}
              <BsFlag color="#002C3D" />
              <span>Whitelist</span>
              {userDetails?.isWhitelisted && (
                <span>
                <Icon icon="bi:check-circle-fill" width="14px" height="14px" color="#0099D6" />
                </span>
              )}
            </li>
            <li onClick={()=>{contactUsRef.current.scrollIntoView({behavior: 'smooth'}); showDrawer(-100); showOverlay('none')}}>
              {/* <img src="/icons/mail.png" /> */}
              <FiMail color="#002C3D"  />
              <span>Contact sales</span>
            </li>
          </div>

          <div className={styles.drawer_items}>
            <p style={{ color: "#00668F", fontSize: "12px", marginLeft: "10px" }}>
              Comming soon
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
          </div>
        </div>
        
        <div className={styles.footer}>
          <li>
            <BiCog color="#00668F" />
            <span>Account</span>
          </li>
          <li>
            {/* <BiLogOut color="#00668F" /> */}
            <p>Sign out</p>
          </li>
        </div>
      </main>
      <div className={styles.backmodal} onClick={()=>{showDrawer(-100); showOverlay('none')}} style={{zIndex: '1', transform:`translateX(${drawer}%)`}}></div>
    </>
    
  )
}

export default Navbar