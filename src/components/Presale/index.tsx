import React, { useContext } from 'react';
import styles from './styles.module.css'
import Modal from "../Modal";
import { GeneralContext } from "../../contexts/generalContextApi";
import { ModalHeader } from '../Verifynumber';
import Countdown from '../CountDown';
import Button from '../Button'
import { Container } from '../ProfileModal/AccountProfile/Personal';


function Presale() {

  const { presale, showPresale } = useContext(GeneralContext);

  return (
    <Modal modal={presale} showModal={showPresale} backdropClose>
      <main className={styles.container}>
        <div className={styles.main}>
          <ModalHeader text='Pre-sale Event' closeModal={()=>showPresale(false)} />
          <p>Congratulations, your account is Whitelisted!</p>
          <Countdown />
          <p style={{color: '#00668F', fontSize: '14px', textAlign: 'center'}}>Countdown to Token presale event.</p>
          <p style={{color: '#002C3D', fontSize: '14px', textAlign: 'center'}}>We will keep you up to date on our upcoming PKT Token presale event</p>
          <Container styles={{ display: 'flex', marginTop: '30px', flexDirection: 'column', alignItems: 'center'}}>
            <Button onClick={()=>showPresale(false)} text="Close" textColor='black' bgColor="transparent" width="160px" height="58px" style={{border: '1px solid #CBD5E1'}} />
          </Container>
        </div>
      </main>
    </Modal>
  )
}

export default Presale