import React from 'react';
import Button from '../Button';
import styles from './styles.module.css';

function HomeNavbar() {
  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <img src="/poket-logo.png" style={{ width: '110px', height: '30px' }} alt="logo" />
            <div className={styles.nav__items}>
                <span>Join early access</span>
                <span>
                  <Button text="LOG IN" bgColor='#00AFF5' width='174px' height='52px' textColor='white' />
                </span>
            </div>
        </div>
    </div>
  )
}

export default HomeNavbar