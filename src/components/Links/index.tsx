import React, { useContext } from 'react';
import styles from './styles.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AuthContext } from '../../contexts/authContextApi';
import { Notifier } from '../../components/Notifier'
import SocialMedia from '../SocialMedia';
import { landingPageDomain } from '../../utils/urls';
import { track } from '../../utils/EventTracker'

export default function Links(){
    
    const { userDetails } = useContext(AuthContext) 
    const refMessage = `I just joined Poket Early Access. With Poket, you can send and receive money around the world in cash, stablecoin and crypto at the best rates. Check it out: ${landingPageDomain}?ref=${userDetails?.referralID}`

    // const refMessage = `Hi, have you tried Poket Early Access? With Poket, you can send or receive money anywhere, across currencies and at the best fees. Check it out www.poket.finance/ref=${userDetails.referralID}` 
    // const refMessage = `Hi! Have you tried Poket? Poket allows me send money anywhere across currencies at the best fees. Check it out www.poket.finance/ref=${userDetails.referralID}`
    
    const linkCopied=()=>{
        Notifier('Referral link copied!', 'success');
        track('copied referral link', { userId: userDetails?._id, email: userDetails?.email }, true)
    }

    return(
        <div className={styles.main}>
            <button className={styles.copy_link_btn}>
                <CopyToClipboard text={refMessage}
                    onCopy={() => linkCopied()}>
                        <span style={{marginRight: '20px', fontSize: '14px'}}>
                            Copy referral link
                        </span>
                </CopyToClipboard>
                <img src="/icons/copy.png" alt="copy" />
            </button>
            <div className={styles.social}>
                <SocialMedia style={{ height: '36px', width: '36px' }} type="referral" refMessage={refMessage} />
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