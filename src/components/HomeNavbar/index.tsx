import React from 'react';
import { landingPageDomain } from '../../utils/urls';
import Button from '../Button';
import styles from './styles.module.css';

function HomeNavbar() {
  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <a href={`${landingPageDomain}`}><img src="/poket-logo.png" style={{ width: '98px', height: '24px' }} alt="logo" /></a>
            <div className={styles.nav__items}>
                <a href={`${landingPageDomain}/#earlyaccess`} style={{ textDecoration: 'none' }}>Join early access</a>
                {/* <span>
                  <Button text="LOG IN" bgColor='#00AFF5' width='174px' height='52px' textColor='white' />
                </span> */}
            </div>
        </div>
    </div>
  )
}

export default HomeNavbar