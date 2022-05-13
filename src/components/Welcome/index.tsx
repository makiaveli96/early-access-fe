import React, { useContext } from 'react';
import { GeneralContext } from '../../contexts/generalContextApi'
import Button from '../Button';
import Modal from '../Modal';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContextApi'

function WelcomeModal() {

  const navigate = useNavigate()
  const { userDetails }: any = useContext(AuthContext)
  const { welcomeModal, showWelcomeModal } = useContext(GeneralContext);

  return (
    <Modal modal={welcomeModal} showModal={showWelcomeModal} backdropClose>
      <main className={styles.container}>
        <div className={styles.main}>
          <img src="/box_animation.gif" width="220px" height="220px" />
          <p style={{ fontSize: "16px", lineHeight: "24px" }}>
              Congratulations on joining our Early Access, you have received{" "}
              <span style={{ color: "#00AFF5" }}>{userDetails?.account == 'personal'? '10,000':'25,000'} points</span> from Poket
              to get you started!
            </p>
          <Button onClick={()=>{showWelcomeModal(false)}} bgColor="#0099D6" text="Continue" width='100%' height='58px' />
        </div>
      </main>
    </Modal>
  )
}

export default WelcomeModal