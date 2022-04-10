import React, { useContext } from 'react';
import styles from './styles.module.css'
import styled from 'styled-components';
import { AuthContext } from '../../contexts/authContextApi';
import { formatCurrency } from '../../utils/formatCurrency';

function PointBalance() {

  const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);

  const totalEarnablePoints = 1000000;
  function getPercentage(){
    const percent = (userDetails?.referralPoints/totalEarnablePoints) * 100;
    console.log(percent, ' percent')
    return percent
  }

  return (
      <div className={styles.main}>
        <div style={{height: '10px', width: '100%', backgroundColor: '#00668F', borderRadius: '5px'}}>
            <div style={{height: '10px', width: `${getPercentage()}%`, backgroundColor: '#F57A00', borderRadius: '5px'}} />
        </div>
        <div style={{display: 'flex', width: '100%', marginTop: '15px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{color: '#002C3D', fontSize: '13px', marginBottom: '5px'}}>
                Earned
            </span>
            <span style={{color: '#002C3D', fontSize: '13px', marginBottom: '5px'}}>
                Points Left
            </span>
        </div>
        <div style={{display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontWeight: 'lighter', fontSize: '15px', color: '#002C3D',}}>
                {formatCurrency(userDetails?.referralPoints)} points
            </span>
            <span style={{fontWeight: 'lighter', fontSize: '15px', color: '#002C3D',}}>
                {formatCurrency((totalEarnablePoints - userDetails?.referralPoints).toString())} points
            </span>
        </div>
      </div>
  )
}

export default PointBalance