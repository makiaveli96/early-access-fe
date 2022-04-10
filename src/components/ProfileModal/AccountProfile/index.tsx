import React, { useContext } from 'react';
import Personal from './Personal'
import Business from './Business'
import { GeneralContext } from '../../../contexts/generalContextApi';
import { AuthContext } from '../../../contexts/authContextApi';

function AccountProfile() {

  const { userDetails } = useContext(AuthContext)

  return (
    <>
      {userDetails?.account == 'personal'? (
        <Personal />
      ):(
        <Business />
      )}
    </>
  )
}

export default AccountProfile