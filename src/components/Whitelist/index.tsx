import React, { useState, useContext } from "react";
import styles from "./styles.module.css";
import Modal from "../Modal";
import { GeneralContext } from "../../contexts/generalContextApi";
import { AuthContext } from '../../contexts/authContextApi'
import { ToastContainer } from "react-toastify";
import Button from "../../components/Button";
import TextField from '@mui/material/TextField';
import { Container } from "../ProfileModal/AccountProfile/Personal";
import MenuItem from '@mui/material/MenuItem';
import { WhitelistAccount } from '../../components/api/routes'
import { Notifier } from '../../components/Notifier';
import { ErrorHandler } from '../../helpers/Errorhandler';
import { useNavigate } from 'react-router-dom'


const tokenRange = [
  {value: '5,000 - 25,000'},
  {value: '25,000 - 5,0000'},
  {value: '50,000 - 100,000'},
  {value: '100,000 - 500,000'},
  {value: '500,000 - 1,000,000'},
  {value: '1,000,000+'},
]

const paymentMethods = [
  { value: 'Credit/Debit Cards' },
  { value: 'Check'},
  { value: 'ACH transfer' },
  { value: 'Stablecoins'},
  { value: 'Other'}
]

const purchaseTypes = [
  { value: 'For a business, fund or others' },
  { value: 'Personal' },
  { value: 'Private' },
]

function Whitelist() {
  const navigate = useNavigate();
  const { whitelist, showWhitelist, showProfile } = useContext(GeneralContext);
  const { setAuth, userDetails, setUserDetails } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);

  const [tokenAmount, setTokenAmount] = useState<string>(tokenRange[0].value);
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0].value);
  const [purchaseType, setPurchaseType] = useState<string>(purchaseTypes[0].value);

  const isProfileSet = true;

  const applyForWhitelist=async()=>{
    try{
      setLoading(true)
      const res = await WhitelistAccount(tokenAmount, paymentMethod, purchaseType);
      if(res.status == 200){
        showWhitelist(false)
        setLoading(false)
        setUserDetails(res.user);
        Notifier('Thanks for applying for our whitelisting!', 'success')
      }else{
        setLoading(false)
        Notifier(res.message || 'Something went wrong, please try again.', 'error')
      }
    }catch(err){
      setLoading(false)
      ErrorHandler(err, navigate, setAuth)
    }
  }

  return (
    <>
      
      <Modal modal={whitelist} showModal={showWhitelist} backdropClose>
            <main className={styles.container}>
              <div className={styles.header}>
                <p>Get Whitelisted</p>
              </div>
              <div className={styles.main}>
                {!userDetails?.isProfileSet? (
                  <>    
                  <p>
                    You must setup your poket profile before your account can be
                    whitelisted.
                  </p>
                  <div onClick={()=>{showWhitelist(false); showProfile(true)}} className={styles.box}>
                    <p>Build a profile</p>
                    <img src="/icons/action_arr_right.png" />
                  </div>
                  </>
                ):(
                  <>
                  <Container>
                    <p style={{ color: '#64748B', fontSize: '14px' }}>How much Tokens would you like to buy?</p>
                    <TextField
                      id="has-account"
                      select
                      style={{width: '100%'}}
                      // label="Native select"
                      value={tokenAmount}
                      onChange={e=>setTokenAmount(e.target.value)}
                      variant="outlined"
                    >
                      {tokenRange.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Container>

                  <Container>
                    <p style={{ color: '#64748B', fontSize: '14px' }}>Preffered payment method</p>
                    <TextField
                      id="has-account"
                      select
                      style={{width: '100%'}}
                      // label="Native select"
                      value={paymentMethod}
                      onChange={e=>setPaymentMethod(e.target.value)}
                      variant="outlined"
                    >
                      {paymentMethods.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Container>

                  <Container>
                    <p style={{ color: '#64748B', fontSize: '14px' }}>Are you purchasing privately? </p>
                    <TextField
                      id="has-account"
                      select
                      style={{width: '100%'}}
                      // label="Native select"
                      value={purchaseType}
                      onChange={e=>setPurchaseType(e.target.value)}
                      variant="outlined"
                    >
                      {purchaseTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Container>
                  </>
                
                )}
                <br />
                <Button
                  onClick={()=>applyForWhitelist()}
                  loading={loading}
                  bgColor="#0099D6"
                  disabled={!userDetails?.isProfileSet? true : loading}
                  text="Apply for whitelisting"
                  width="100%"
                  height="58px"
                  textSize="14px"
                />
              </div>
            </main>
      </Modal>
    </>
  );
}

export default Whitelist;
