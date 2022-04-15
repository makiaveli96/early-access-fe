import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import { AuthContext } from '../../contexts/authContextApi';
import { ToastContainer } from "react-toastify";
import Personal from './personal';
import Business from './business';
import AccountProfile from './AccountProfile'
import { GeneralContext } from "../../contexts/generalContextApi";

function ProfileModal({ modal, showModal }) {
  const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);
  const [selectedAccount, setSelectedAccount] = useState('personal');
  const isProfileSet = true

  return (
    <>
    
    <Modal modal={modal} showModal={showModal}>
      {!userDetails.isProfileSet? (
        <>
          {userDetails.account == 'personal'? (
            <Personal />
          ):(
            <Business />
          )}
        </>
      ):(
        <AccountProfile />
      )}
      
    </Modal>
    </>
  );
}

export default ProfileModal;
