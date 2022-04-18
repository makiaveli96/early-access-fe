import React, { useContext } from 'react';
import { GeneralContext } from '../../contexts/generalContextApi'
import Button from '../Button';
import Modal from '../Modal';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'

function CreatePasswordModal() {

  const navigate = useNavigate()
  const { createPass, showCreatePass } = useContext(GeneralContext);

  return (
    <Modal modal={createPass} showModal={showCreatePass} backdropClose>
      <main className={styles.container}>
        <div className={styles.main}>
          <img src="/verify_email_img.gif" width="220px" height="220px" />
          <h2 style={{fontSize: '16px'}}>Email Sent!</h2>
          <p style={{fontSize: '16px'}}>
            Follow the link sent to your email address to create a password.
          </p>
          <Button onClick={()=>showCreatePass(false)} bgColor="#0099D6" text="Ok" width='100%' height='58px' />
        </div>
      </main>
    </Modal>
  )
}

export default CreatePasswordModal