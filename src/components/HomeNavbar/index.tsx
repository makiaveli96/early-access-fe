import React,{ useState } from 'react';
import { landingPageDomain } from '../../utils/urls';
import Button from '../Button';
import styles from './styles.module.css';

function HomeNavbar() {

  const [menuH, setMenuH] = useState(0);
  const [menuItems, setMenuItems] = useState('none');

  const toggleMenu=()=>{
    if(menuH == 0){
      setMenuH(170);
      setMenuItems('flex')
    }else{
      setMenuH(0);
      setMenuItems('none')
    }
  }

  return (
    <main className={styles.navbar}>
        <div className={styles.main}>
            <a href={`${landingPageDomain}`}><img src="/poket-logo.png" style={{ width: '98px', height: '24px' }} alt="logo" /></a>
            <div className={styles.nav__items}>
              <a href={`${landingPageDomain}/#info`} target="_blank">About</a>
              <a href={`${landingPageDomain}/frequently-asked`} target="_blank">FAQs</a>
              <a href={`${landingPageDomain}/#earlyaccess`}>Join Early Access</a>
            </div>
           
            <span className={styles.toggler} onClick={()=>toggleMenu()}>
              <img src="/icons/hamburger.svg" />
            </span>
        </div>
        <div className={styles.menu} style={{height:`${menuH}px`}}>
          <div className={styles.menu__items} style={{display: menuItems}} >
            <a href={`${landingPageDomain}/#info`} target="_blank">About</a>
            <a href={`${landingPageDomain}/frequently-asked`} target="_blank">FAQs</a>
            <a href={`${landingPageDomain}/#earlyaccess`} style={{color: 'orange'}}>Join Early Access</a>
          </div> 
               
          </div>
    </main>
  )
}

export default HomeNavbar