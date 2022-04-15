import React, { useContext } from 'react';
import { GeneralContext } from '../../contexts/generalContextApi'
import Button from '../Button';
import Modal from '../Modal';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'

function WhitelistSuccess() {

  const navigate = useNavigate()
  const { whitelistSuccess, showWhitelistSuccess } = useContext(GeneralContext);

  return (
    <Modal modal={whitelistSuccess} showModal={showWhitelistSuccess} backdropClose>
      <main className={styles.container}>
        <div className={styles.main}>
          <img src="/check_mark.gif" width="220px" height="220px" />
          <h2 style={{fontSize: '16px'}}>Congratulations!</h2>
          <p style={{fontSize: '16px', lineHeight: '24px'}}>
            Your application has been received. We will keep you up to date on our upcoming Token presale event.
          </p>
          <Button onClick={()=>{showWhitelistSuccess(false)}} bgColor="#0099D6" text="Continue" width='100%' height='58px' />
        </div>
      </main>
    </Modal>
  )
}

export default WhitelistSuccess