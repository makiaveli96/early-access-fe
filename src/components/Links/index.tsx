import React from 'react';
import styles from './styles.module.css';

export default function Links(){

    // "Hi! Have you tried Poket? Poket allows me send money anywhere across currencies at the best fees. Check it out linktopoket.com/thisisjustasamplehsjek=01"

    return(
        <div className={styles.main}>
            <button className={styles.copy_link_btn}>
                <span style={{marginRight: '20px', fontSize: '15px'}}>
                    COPY LINK
                </span>
                <img src="/copy_icon.png" alt="copy" />
            </button>
            <div className={styles.social}>
                <a href="https://mobile.facebook.com/gradientfi" target="_blank">
                    <img src="/facebook_lg.png" alt="facebook" />
                </a>
                <img src="/linkedin_lg.png" alt="linkedin" />
                <a href="https://twitter.com/PoketFinance" target="_blank">
                    <img src="/twitter_lg.png" alt="twitter" />
                </a>
            </div>
        </div>
        
    )
}