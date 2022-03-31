import React from 'react'
import styles from './styles.module.css'

function Footer() {
  return (
    <div className={styles.footer_main}>
        <div className={styles.footer}>
            <div className={styles.col1}>
                <p style={{color: '#979797'}}>© Copyright 2021 GradientFI. All rights reserved.</p>
                <img src="/poket-logo.png" className={styles.logo} alt="logo" />
            </div>
            <div className={styles.col2}>
                <a href="https://mobile.facebook.com/gradientfi" target="_blank">
                  <img src="/facebook.png" alt="facebook" />
                </a>
                <img src="/linkedin.png" alt="linkedin" />
                <a href="https://twitter.com/PoketFinance" target="_blank">
                  <img src="/twitter.png" alt="twitter" />
                </a>
                <img src="/instagram.png" alt="instagram" />
            </div>
        </div>
    </div>
  )
}

export default Footer