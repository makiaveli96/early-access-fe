import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import { AuthContext } from '../../contexts/authContextApi';
import { ToastContainer } from "react-toastify";
import Personal from './personal';
import Business from './business';
import AccountProfile from './AccountProfile'
import styles from './styles.module.css'
import { GeneralContext } from "../../contexts/generalContextApi";

function ProfileModal({ modal, showModal }) {
  const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);
  const [selectedAccount, setSelectedAccount] = useState('personal');
  const isProfileSet = true

  return (
    <>
    
    <Modal modal={modal} showModal={showModal}>
      {!userDetails.isProfileSet? (
        <div className={styles.container}>
          {userDetails.account == 'personal'? (
            <Personal />
          ):(
            <Business />
          )}
        </div>
      ):(
        <div className={styles.account_profile}>
          <AccountProfile />
        </div>
      )}
      
    </Modal>
    </>
  );
}

export default ProfileModal;
