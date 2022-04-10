import React, { useContext } from 'react';
import styles from './styles.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AuthContext } from '../../contexts/authContextApi';
import { Notifier } from '../../components/Notifier'
import SocialMedia from '../SocialMedia';

export default function Links(){

    // "Hi! Have you tried Poket? Poket allows me send money anywhere across currencies at the best fees. Check it out linktopoket.com/thisisjustasamplehsjek=01"
    const { userDetails } = useContext(AuthContext)
    return(
        <div className={styles.main}>
            <button className={styles.copy_link_btn}>
                <CopyToClipboard text={`http://localhost/poket-website?ref=${userDetails?.referralID}#form`}
                    onCopy={() => Notifier('Referral link copied!', 'success')}>
                        <span style={{marginRight: '20px', fontSize: '14px'}}>
                            Copy referral link
                        </span>
                </CopyToClipboard>
                <img src="/icons/copy.png" alt="copy" />
            </button>
            <div className={styles.social}>
                <SocialMedia style={{ height: '36px', width: '36px' }} />
                {/* <a href="https://mobile.facebook.com/gradientfi" target="_blank">
                    <img src="/facebook_lg.png" alt="facebook" style={{height: '36px', width: '36px'}} />
                </a>
                <img src="/linkedin_lg.png" alt="linkedin" style={{height: '36px', width: '36px'}} />
                <a href="https://twitter.com/PoketFinance" target="_blank">
                    <img src="/twitter_lg.png" alt="twitter" style={{height: '36px', width: '36px'}}/>
                </a> */}
            </div>
        </div>
        
    )
}