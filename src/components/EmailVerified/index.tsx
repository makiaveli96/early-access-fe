import React, { useContext } from 'react';
import { GeneralContext } from '../../contexts/generalContextApi'
import Button from '../Button';
import Modal from '../Modal';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'

function VerifyEmail() {

  const navigate = useNavigate()
  const { emailVerified, showEmailVerified } = useContext(GeneralContext);

  return (
    <Modal modal={emailVerified} showModal={showEmailVerified} backdropClose runOnClose={()=>navigate('/home')}>
      <main className={styles.container}>
        <div className={styles.main}>
          <img src="/box_animation.gif" width="220px" height="220px" />
          <h2 style={{fontSize: '16px'}}>Congratulations!</h2>
          <p style={{fontSize: '16px'}}>
            You gained <span style={{color: '#0099D6'}}>10,000 reward points</span> for verifying your email address.
          </p>
          <Button onClick={()=>{showEmailVerified(false); navigate('/home')}} bgColor="#0099D6" text="Continue" width='100%' height='58px' />
        </div>
      </main>
    </Modal>
  )
}

export default VerifyEmail