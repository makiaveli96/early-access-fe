import React, { useContext } from 'react';
import styles from './styles.module.css'
import styled from 'styled-components';
import { AuthContext } from '../../contexts/authContextApi';

function PointBalance() {

  const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);

  const totalEarnablePoints = 100000;
  function getPercentage(){
    const percent = (parseInt(userDetails.referralPoints)/totalEarnablePoints) * 100;
    console.log(percent, ' percent')
    return percent
  }

  return (
      <div className={styles.main}>
        <p style={{margin: 0, fontSize: '25px'}}>Current Points Balance</p>
        <span style={{fontSize: '45px', fontWeight: 'bold', paddingBottom: '20px'}}>{userDetails.referralPoints}<span style={{fontSize: '10px'}}>points</span></span>
        <div style={{height: '10px', width: '100%', backgroundColor: 'white', borderRadius: '5px'}}>
            <div style={{height: '10px', width: `${getPercentage()}%`, backgroundColor: '#FFE0C2', borderRadius: '5px'}} />
        </div>
        <div style={{display: 'flex', width: '100%', marginTop: '15px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <span>
                Earned
            </span>
            <span>
                Points Left
            </span>
        </div>
        <div style={{display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontWeight: 'lighter'}}>
                {userDetails.referralPoints} points
            </span>
            <span style={{fontWeight: 'lighter'}}>
                {totalEarnablePoints - parseInt(userDetails.referralPoints)} points
            </span>
        </div>
      </div>
  )
}

export default PointBalance