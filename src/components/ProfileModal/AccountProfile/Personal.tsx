import React, { useState, useContext, useEffect } from 'react';
import styles from '../styles.module.css'
import TextField from '@mui/material/TextField';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import Countries from '../../../utils/countries-states';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { GeneralContext } from '../../../contexts/generalContextApi';
import Button from '../../Button';
import { sendVerificationCode, verifyCode, saveAcccountDetails } from '../../../components/api/routes'
import { AuthContext } from '../../../contexts/authContextApi';
import { Notifier } from '../../../components/Notifier';
import { ErrorHandler } from '../../../helpers/Errorhandler';
import { useNavigate } from 'react-router-dom';
import ModalProgress from '../../ModalProgress';


export function Container({ children, styles }: { children: any, styles?: any }){
  return(
    <div style={{width: '100%', ...styles}}>{children}</div>
  )
}

function PersonalProfile() {

  // const { userDetails } = useContext(GeneralContext)
  const navigate = useNavigate()
  const { auth, setAuth, userDetails, setUserDetails } = useContext(AuthContext) 
  const {
    showProfile,
    showUploadImage,
    showPhoneModal
  }: any = useContext(GeneralContext)
  const [userCountry, setUserCountry] = useState(userDetails?.contry)
  const [userState, setUserState] = useState(userDetails?.state)
  const [countryOfResidence, setCountryOfResidence] = useState<any | null>(null);
  const [state, setState] = useState<any | null>(null);
  const [city, setCity] = useState(userDetails?.city)
  const [address, setAddress] = useState(userDetails?.address)
  const [states, setStates] = useState<any>([]);
  const [saving, setSaving] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false)


  useEffect(()=>{
    if(userDetails?.countryOfResidence){
      const findCountry = Countries.find(country => country.name == userDetails?.countryOfResidence)
      if(findCountry){
        setCountryOfResidence(findCountry)
        setStates(findCountry.states)
      }
    }
  },[])

  useEffect(()=>{
    if(userDetails?.state && states.length > 0){
      const findState = states.find(state => state.name == userDetails?.state)
      if(findState){
        console.log(findState, ' stat found')
        setState(findState)
      }
    }
  },[states])

  useEffect(()=>{
    setUserCountry(countryOfResidence?.name)
    setUserState(state?.name)
  },[countryOfResidence, state])

  const preData = { country: userDetails?.countryOfResidence, state: userDetails?.state, city: userDetails?.city, address: userDetails?.address};
  const newData = { country: countryOfResidence?.name, state: state?.name, city, address };

  useEffect(()=>{
    if(JSON.stringify(preData) === JSON.stringify(newData)){
      setBtnDisabled(true)
    }else{
      setBtnDisabled(false)
    }
  },[newData])

  const SaveInfo=async()=>{
    let data = {  
      countryOfResidence: userCountry,
      state: userState,
      address,
      city,
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

  return (
    <main className={styles.account_profile}>
      <div className={styles.body}>
        <div className={styles.col}>
          <span onClick={()=>{showProfile(false); showUploadImage(true);}} style={{ cursor: 'pointer' }}>
            {userDetails?.profilePhoto? (
              <img src={userDetails?.profilePhoto} style={{borderRadius: '50%', height: '110px', width: '110px'}} />
            ):(
              <img src="/icons/no-image.png" style={{borderRadius: '50%'}} />
            )}
          </span>
          <p style={{marginBottom: '10px', fontSize: '12.5px', color: '#64748B'}}>Profile details</p>
          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Email</p>
            <TextField
              id="outlined-lname"
              disabled={true}
              style={{width: '100%'}}
              value={userDetails?.email}
            />
          </Container>

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>First name</p>
            <TextField
              id="outlined-lname"
              disabled={true}
              style={{width: '100%'}}
              value={userDetails?.firstName}
            />
          </Container>

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Last name</p>
            <TextField
              id="outlined-lname"
              disabled={true}
              autoComplete='new-password'
              style={{width: '100%'}}
              value={userDetails?.lastName}
            />
          </Container>

          {/* <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Date of Birth</p>
            <TextField
              id="outlined-lname"
              disabled={true}
              autoComplete='new-password'
              style={{width: '100%'}}
              value={userDetails?.dateOfBirth}
            />
          </Container> */}

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Phone number</p>
            <PhoneInput
              specialLabel=''
              inputStyle={{width: '100%'}}
              country={'us'}
              value={userDetails?.phone}
            />
            {userDetails?.isPhoneVerified? (
              <p style={{color: '#16A34A', fontSize: '12px'}}>Verified</p>
            ):(
              <p onClick={()=>showPhoneModal(true)} style={{color: '#0099D6', cursor: 'pointer', fontSize: '12px'}}>Verify number</p>
            )}
          </Container>
        </div>

        <div className={styles.col}>
          <p style={{marginBottom: '10px', fontSize: '12.5px', color: '#64748B'}}>Other details</p>
          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Country of citizenship</p>
            <TextField
              id="outlined-lname"
              disabled={true}
              autoComplete='new-password'
              value={userDetails?.countryOfCitizenship}
              style={{width: '100%'}}
            />
          </Container>

          <Container>
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
          </Container>

          <Container>
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
          </Container>

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>City</p>
            <TextField
              id="outlined-lname"
              // label="Name"
              placeholder='city'
              autoComplete='new-password'
              style={{width: '100%'}}
              value={city}
              onChange={e=>setCity(e.target.value)}
            />
          </Container>

          <Container>
            <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Address</p>
            <TextField
              id="outlined-lname"
              // label="Name"
              placeholder='address'
              autoComplete='new-password'
              style={{width: '100%'}}
              value={address}
              onChange={e=>setAddress(e.target.value)}
            />
          </Container>

        
        </div>
      </div>
      <div className={styles.footer}>
        <Button onClick={()=>showProfile(false)} textColor="#57584E" bgColor='transparent' height="48px" width="160px" style={{border: '1px solid grey'}} text="Close" />
        <Button onClick={()=>SaveInfo()} loading={saving} disabled={btnDisabled? true : saving} bgColor='#0099D6' height="48px" width="160px"  text="Save" />
      </div>
    </main>
  )
}

export default PersonalProfile