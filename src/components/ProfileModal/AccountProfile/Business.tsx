import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles.module.css'
import TextField from '@mui/material/TextField';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import Countries from '../../../utils/countries-states';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '../../Button';
import { AuthContext } from '../../../contexts/authContextApi';
import { sendVerificationCode, verifyCode, saveAcccountDetails } from '../../../components/api/routes'
import { Notifier } from '../../../components/Notifier';
import { ErrorHandler } from '../../../helpers/Errorhandler';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { Icon } from '@iconify/react';
import MenuItem from '@mui/material/MenuItem';
import { GeneralContext } from '../../../contexts/generalContextApi';


export function Container({ children, styles }: { children: any, styles?: any }){
  return(
    <div style={{width: '100%', ...styles}}>{children}</div>
  )
}


const employeeRange = [
  {label: 'Less than 10'},
  {label: '10 - 20 Employees'},
  {label: '20 - 50 Employees'},
  {label: '50 - 100 Employees'},
  {label: '100 - 500 Employees'},
  {label: '500+ Employees'},
]

function BusinessProfile() {
  const navigate = useNavigate()
  const {
    showProfile,
    showUploadImage,
    showPhoneModal
  }: any = useContext(GeneralContext)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const { setAuth, userDetails, setUserDetails } = useContext(AuthContext)
  const [countryOfResidence, setCountryOfResidence] = useState<any | null>(Countries[0]);
  const [state, setState] = useState<any | null>(null);
  const [states, setStates] = useState<any>([]);
  const [saving, setSaving] = useState(false);
  const [city, setCity] = useState(userDetails?.city)
  const [address, setAddress] = useState(userDetails?.address);
  const [taxNo, setTaxNo] = useState(userDetails?.taxIdNumber);
  const [numberOfEmployees, setNumberOfEmployees] = useState(employeeRange[0].label)


  const SaveInfo=async()=>{
    let data = {  
      address,
      city,
      taxIdNumber: taxNo
    }
    try{
      setSaving(true);
      const res = await saveAcccountDetails(data)
      if(res.status == 200){
        setSaving(false)
        setUserDetails(res.user)
        Notifier(res.message, 'success')
        // showProfile(false)
      }else{
        setSaving(false)
        Notifier(res.message, 'error')
      }
    }catch(err){
      setSaving(false)
      ErrorHandler(err, navigate, setAuth)
    }
  }

  const preData = { city: userDetails?.city, address: userDetails?.address, taxNo: userDetails?.taxIdNumber, numberOfEmployees: userDetails?.numberOfEmployees};
  const newData = { city, address, taxNo, numberOfEmployees };

  useEffect(()=>{
    if(JSON.stringify(preData) === JSON.stringify(newData)){
      setBtnDisabled(true)
    }else{
      setBtnDisabled(false)
    }
  },[newData])

  return (
    <>
      <div className={styles.body}>
        <div className={styles.col}>
          <span onClick={()=>{showProfile(false); showUploadImage(true);}} style={{ cursor: 'pointer' }}>
            {userDetails?.profilePhoto? (
              <img src={userDetails?.profilePhoto} style={{borderRadius: '50%', height: '110px', width: '110px'}} />
            ):(
              <Icon icon="ion:business-sharp" color="#00668F" height="80px" width= '70px' />
            )}
          </span>
          <p style={{marginBottom: '10px', fontSize: '12.5px', color: '#64748B'}}>Business details</p>
          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Business name</p>
            <TextField
              id="outlined-lname"
              disabled={true}
              style={{width: '100%'}}
              value={userDetails?.businessName}
            />
          </Container>

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Country of Operation</p>
            <TextField
              id="outlined-lname"
              disabled={true}
              value={userDetails?.countryOfOperation}
              autoComplete='new-password'
              style={{width: '100%'}}
            />
          </Container>

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>State</p>
            <TextField
              id="outlined-lname"
              // label="Name"
              placeholder='Doe'
              disabled={true}
              autoComplete='new-password'
              style={{width: '100%'}}
              value={userDetails?.state}
              // onChange={e=>setLastName(e.target.value)}
            />
          </Container>

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>City</p>
            <TextField
              id="outlined-lname"
              // label="Name"
              placeholder='Doe'
              autoComplete='new-password'
              style={{width: '100%'}}
              value={city}
              onChange={e=>setCity(e.target.value)}
            />
          </Container>

         
        </div>

        <div className={styles.col}>
          <p style={{marginBottom: '10px', fontSize: '12.5px', color: '#64748B'}}>Other details</p>
          

          {/* <Container>
            <p  style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Country of Residence</p>
            <Autocomplete
              value={countryOfResidence}
              style={{width: '100%'}}
              onChange={(event, newValue) => {
                if (typeof newValue["name"] === 'string') {
                  setCountryOfResidence(newValue);
                  setStates(newValue.states)
                } else if (newValue && newValue.inputValue) {

                } else {
                  setCountryOfResidence(newValue);
                  setStates(newValue.states)
                }
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="country-selector"
              options={Countries}
              getOptionLabel={(option) => {
                if (typeof option.name === 'string') {
                    return option.name;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option.name;
              }}
              renderOption={(props, option) => <li {...props}>{option.name}</li>}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField 
                  placeholder='select a country'
                  autoComplete='new-password'
                  {...params} 
                />
              )}
            />
          </Container> */}

          {/* <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>State</p>
            <Autocomplete
              value={state}
              style={{width: '100%'}}
              onChange={(event, newValue) => {
                if (typeof newValue?.name === 'string') {
                  setState(newValue);
                  console.log(newValue, ' new state val 1')
                } else if (newValue && newValue.inputValue) {
                  console.log(newValue, ' new state val 2')
                  // Create a new value from the user input
                  // setCountry(newValue);

                } else {
                  console.log(newValue, ' new state val 3')
                  setState(newValue);
                }
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="state-selector"
              options={states}
              getOptionLabel={(option) => {
                if (typeof option.name === 'string') {
                    return option.name;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option?.name || '';
              }}
              renderOption={(props, option) => <li {...props}>{option?.name}</li>}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField 
                  autoComplete='new-password'
                  placeholder='select state' 
                  {...params} 
                />
              )}
            />
          </Container> */}

         

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Address</p>
            <TextField
              id="outlined-lname"
              // label="Name"
              placeholder='Doe'
              autoComplete='new-password'
              style={{width: '100%'}}
              value={address}
              onChange={e=>setAddress(e.target.value)}
            />
          </Container>

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Phone number</p>
            <PhoneInput
              specialLabel=''
              inputStyle={{width: '100%'}}
              country={'us'}
              value={userDetails?.phone}
              disabled={true}
            />
            {userDetails?.isPhoneVerified? (
              <p style={{color: '#16A34A', fontSize: '12px'}}>Verified</p>
            ):(
              <p onClick={()=>showPhoneModal(true)} style={{color: '#0099D6', cursor: 'pointer', fontSize: '12px'}}>Verify number</p>
            )}
          </Container>

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Number of Employees</p>
            <TextField
              id="has-account"
              select
              style={{width: '100%'}}
              // label="Native select"
              value={numberOfEmployees}
              onChange={e=>setNumberOfEmployees(e.target.value)}
              variant="outlined"
            >
              {employeeRange.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Container>

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Tax Identification Number</p>
            <TextField
              id="outlined-lname"
              autoComplete='new-password'
              style={{width: '100%'}}
              value={taxNo}
              onChange={e=>setTaxNo(e.target.value)}
            />
          </Container>
        </div>
      </div>
      <div className={styles.footer}>
        <Button onClick={()=>showProfile(false)} textColor="#57584E" bgColor='transparent' height="48px" width="160px" style={{border: '1px solid grey'}} text="Close" />
        <Button onClick={()=>SaveInfo()} loading={saving} disabled={btnDisabled? true : saving} bgColor='#0099D6' height="48px" width="160px"  text="Save" />
      </div>
    </>
  )
}

export default BusinessProfile