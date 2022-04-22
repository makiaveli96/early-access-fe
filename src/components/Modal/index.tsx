import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal as ReactModal } from '@mui/material';
import styles from './styles.module.css'

interface PropsI {
    modal: boolean;
    showModal: any;
    children: any;
    backdropClose?: boolean,
    runOnClose?: ()=>void
}


function Modal({ modal, showModal, children, backdropClose, runOnClose }: PropsI) {

  const handleClose = () => {
    if(!backdropClose){
      return null
    }else{
      showModal(false);
      runOnClose()
    }
  }

  return (
    <ReactModal
      open={modal}
      style={{backgroundColor: 'rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      BackdropProps={{
          timeout: 500,
      }}
    >
      {children}
    </ReactModal>
  )
}

export default Modal