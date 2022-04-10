import React, { useContext, useState } from 'react';
import styles from './styles.module.css';
import Modal from '../Modal';
import { Icon } from "@iconify/react";
import { GeneralContext } from '../../contexts/generalContextApi'
import TextField from '@mui/material/TextField';
import Button from '../../components/Button'
import { Notifier } from '../Notifier';


interface PropsI {
  modal: boolean;
  showModal: any;
}

function SendInAppMessage() {

  const maxLength = 250
  const { contactForm, showContactForm } = useContext(GeneralContext);
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const sendMessage=()=>{
    if(subject.length > 5 && message.length > 5){
      Notifier('Message sent successfully', 'success');
      showContactForm(false)
    }else{
      Notifier('Enter a minumum of 5 characters', 'warning');
    }
  }

  return (
    <Modal modal={contactForm} showModal={showContactForm} backdropClose>
      <main className={styles.container}>
        <div className={styles.main}>
          <div className={styles.header}>
            <h2>Get in touch</h2>
            <span onClick={()=>showContactForm(false)} style={{cursor: 'pointer'}}>
              <Icon icon="clarity:times-line" height={25} width={25} />
            </span>
          </div>
          <p>Send us a message about any questions you might have or explore our <span style={{color: '#0099D6'}}>FAQs</span></p>
          <div className={styles.form}>
            {/* <input  /> */}
            <div style={{width: '100%'}}>
              <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Subject</p>
              <TextField
                id="outlined-lname"
                placeholder='e.g What is poket about?'
                helperText="What is your message about?"
                autoComplete='new-password'
                style={{width: '100%'}}
                value={subject}
                onChange={e=>setSubject(e.target.value)}
              />
            </div>

            <div style={{width: '100%'}}>
              <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Your message</p>
              <TextField
                id="outlined-lname"
                // label="Name"
                inputProps={{ maxLength }}
                margin="dense"
                placeholder='message body'
                autoComplete='new-password'
                multiline
                rows={6}
                helperText={message.length+'/'+maxLength}
                maxRows={10}
                style={{width: '100%'}}
                value={message}
                onChange={e=>setMessage(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={()=>sendMessage()} bgColor="#0099D6" text="Send Message" width="100%" height="58px" />
          <br />
          <Button onClick={()=>showContactForm(false)} bgColor="transparent" text="Cancel" textColor='black' width="60%" height="58px" style={{border: '.5px solid #CBD5E1'}} />
        </div>
      </main>
    </Modal>
  )
}

export default SendInAppMessage