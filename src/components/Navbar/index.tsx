import React, { useState, useContext } from 'react';
import styles from './styles.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'
import { deletePassToken } from '../../components/api/routes'
import Button from '../Button';
import { AuthContext } from '../../contexts/authContextApi';


export default function Navbar(){

    const navigate = useNavigate();
    const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);

    const [navItemDisplay, setNavItemDisplay] = useState('')
    const [dropDown, setDropDown] = useState(-100)
    const [height, setHeight] = useState('0px')
    const navItems = [
        { name: 'Home', link: 'home' },
        { name: 'Referral', link: 'referral' },
        { name: 'Account', link: 'account' },
        { name: 'Log Out', link: 'logout' },
    ]

    const toggleDropDown=()=>{
        if(height == '0px'){
            setHeight('210px')
        }else{
            setHeight('0px')
        }
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


    return(
        <div className={styles.nav_main}>
            <div className={styles.nav}>
                <img src="/poket-logo.png" style={{ width: '98px', height: '24px' }} alt="logo" />
                <span onClick={()=>toggleDropDown()} className={styles.bars}><FaBars size={25} color="#0099D6" /></span>
                <div style={{display: navItemDisplay}} className={styles.nav__items}>
                    {navItems.map((item,i)=>(
                        <NavLink
                        className={styles.nav_item}
                            style={({ isActive }) => {
                                if(isActive){
                                    return {
                                        paddingBottom: '7px',
                                        textDecoration: 'none',
                                        color: '#000000',
                                        borderBottom: '4px solid #00AFF5'
                                    }
                                }else{
                                    return {
                                        paddingBottom: '7px',
                                        textDecoration: 'none',
                                        color: 'grey',
                                    }
                                }
                            }}
                            to={`/${item.link}`}
                            onClick={()=>item.link == 'logout'? logOut() : null}
                            key={i}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                    {!userDetails.isWhitelisted && (
                        <button onClick={()=>navigate('/account/whitelist')} className={styles.get_whitelisted_btn1}>
                            GET WHITELISTED
                        </button>
                    )}
                 
                </div>
            </div>
            {/* SIDE BAR */}
            {/* <div className={styles.drop_down} style={{overflowX:'scroll',transform:`translateY(${dropDown}%)`}}> */}
            <div className={styles.drop_down} style={{overflowX:'scroll', height: height}}>
                <div style={{width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {/* <span onClick={()=>setDropDown(-100)} style={{alignSelf: 'flex-end'}}><FaTimes /></span> */}
                    {navItems.map((item,i)=>(
                        <NavLink
                        className={styles.nav_item}
                            style={({ isActive }) => {
                                if(isActive){
                                    return {
                                        textDecoration: 'none',
                                        color: 'lightgrey',
                                    }
                                }else{
                                    return {
                                        textDecoration: 'none',
                                        color: 'white',
                                    }
                                }
                            }}
                            to={`/${item.link}`}
                            onClick={()=>item.link == 'logout'? logOut() : null}
                            key={i}
                        >
                            {item.name}
                        </NavLink>
                       
                    ))}
                    {!userDetails.isWhitelisted && (
                        <Button onClick={()=>navigate('/account/whitelist')} text="GET WHITELISTED" textColor='#00AFF5' bgColor='white' height="50px" width='50%' />
                    )}
                </div>
            </div>
        </div>
    )
}