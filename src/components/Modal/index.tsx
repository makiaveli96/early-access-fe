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
    backdropClose?: boolean
}


function Modal({ modal, showModal, children, backdropClose }: PropsI) {

  const handleClose = () => {
    if(!backdropClose){
      return null
    }else{
      showModal(false)
    }
  }

  return (
    <ReactModal
        open={modal}
        style={{backgroundColor: 'rgba(0, 102, 143, 0.74)'}}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         {children}

       
      </ReactModal>
  )
}

export default Modal