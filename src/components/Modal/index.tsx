import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Slide, Grow, Modal as ReactModal } from '@mui/material';
import styles from './styles.module.css'
import { motion, AnimatePresence } from "framer-motion";

interface PropsI {
    modal: boolean;
    showModal: any;
    children: any;
    backdropClose?: boolean,
    runOnClose?: ()=>void
}


function RootModal({ modal, showModal, children, backdropClose, runOnClose }: PropsI) {
  

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
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Slide direction="up" in={modal} mountOnEnter unmountOnExit>
      {children}
      </Slide>
    </ReactModal>

  )
}

export default RootModal

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';
// import styles from './styles.module.css'
// import { useMediaQuery } from "react-responsive";


// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide timeout={2500} direction="up" ref={ref} {...props} />;
// });

// interface PropsI {
//     modal: boolean;
//     showModal: any;
//     children: any;
//     backdropClose?: boolean,
//     runOnClose?: ()=>void
// }

// export default function Modall({ modal, showModal, children, backdropClose, runOnClose }: PropsI) {

//   const [open, setOpen] = React.useState(false);
//   const isMobile = useMediaQuery({
//     query: "(min-width: 0px) and (max-width: 767px)",
//   });
//   const handleClickOpen = () => {
//     showModal(true);
//   };

//   const handleClose = () => {
//     showModal(false);
//   };

//   return (
//       <Dialog
//         maxWidth={false}
//         className={styles.modal}
//         open={modal}
//         TransitionComponent={Transition}
//         keepMounted
        
//         // PaperProps={{
//         //   style: {
//         //     width: '100%',
//         //     backgroundColor: 'transparent',
//         //     boxShadow: 'none',
//         //   },
//         // }}
//         PaperProps={{ sx: {width: isMobile? '100%':'auto',  maxHeight: isMobile? '70%':'500px', padding: 0, borderRadius: '10px' } }}
//         onClose={handleClose}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         {/* <div style={{width: '100%', height: '100%', margin: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50px'}}> */}
//       {/* <DialogContent 
//       style={{ borderRadius: '20px', padding: 0, width: '600px', backgroundColor: 'yellow' }}>
//         <div style={{width: '90%', height: '300px', }}>
//           gvhgv
//         </div>
//       </DialogContent> */}
//       {children}
//         {/* </div> */}
//       </Dialog>
//   );
// }
