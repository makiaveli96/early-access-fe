//eslint-disable-next-line
import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer';
import styles from './styles.module.css';
import Divider from '../../components/Divider';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import CountryInput from '../../components/CountryInput';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import countryList from '../../utils/countries'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from '@mui/material/MenuItem';
import { format, parseISO } from 'date-fns';
import Modal from '../../components/Modal';
import Box from '@mui/material/Box';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { WhitelistAccount } from '../../components/api/routes'
import { ErrorHandler } from '../../helpers/Errorhandler';
import { AuthContext } from '../../contexts/authContextApi';
import { ToastContainer } from 'react-toastify';
import Countries from '../../utils/countries-states';

export default function Whitelist() {

  const navigate = useNavigate()

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 446,
    maxWidth: '85%',
    bgcolor: 'background.paper',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '5px',
    textAlign: 'center'
  };

  const amounts = [
    {value: '500'},
    {value: '1500'},
    {value: '3500'},
    {value: '5000+'},
  ]

  const paymentMethods = [
    { value: 'Credit/Debit Cards' },
    { value: 'Check'},
    { value: 'ACH transfer' },
    { value: 'Stablecoins'},
    { value: 'Other'}
  ]

  const purchaseTypes = [
    { value: 'For a business, fund or others' },
    { value: 'Personal' },
    { value: 'Private' },
  ]

  const [states, setStates] = useState<any>([])
  const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);
  const [newUserDetails, setNewUserDetails] = useState<any>({})
  const [btnLoading, setBtnLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [stage, setStage] = useState(0)
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly any[]>([]);
  const loading = open && options.length === 0;
  const filter = createFilterOptions<any>();
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const [userCountry, setUserCountry] = useState(userDetails?.contry)
  const [userState, setUserState] = useState(userDetails?.state)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState<any | null>(new Date());

  const [address, setAddress] = useState(userDetails?.address);
  const [country, setCountry] = useState<any | null>(Countries[0]);
  const [state, setState] = useState(userDetails?.state);
  const [postalCode, setPostalCode] = useState(userDetails?.postalCode)

  const [amount, setAmount] = useState<string>(amounts[0].value);
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0].value);
  const [purchaseType, setPurchaseType] = useState<string>(purchaseTypes[0].value)

  useEffect(()=>{
    if(userDetails?.country){
      const findCountry = Countries.find(country => country.name == userDetails?.country)
      if(findCountry){
          setCountry(findCountry)
          setStates(findCountry.states)
      }
    }
    if(userDetails?.state && states.length > 0){
      const findState = states.find(state => state.name == userDetails?.state)
      if(findState){
          setState(findState)
      }
    }
  },[])

  useEffect(()=>{
    setUserCountry(country?.name)
    setUserState(state?.name)
  },[country, state])
  

  const next=async()=>{
    if(stage < 2){
      switch(stage){
        case 0:
          if(!firstName || !lastName){
            setMessage('All fields are required');
            setTimeout(()=>{
              setMessage('')
            },3500)
          }else{
            setMessage('')
            setStage(stage + 1)
          }
          break;
        case 1:
          if(!address || !country || !state){
            setMessage('All fields are required');
            setTimeout(()=>{
              setMessage('')
            },3500)
          }else{
            setMessage('')
            setStage(stage + 1)
          }
          break;
      }
    }else{
      // navigate('/home?whitelisted=true')
      setBtnLoading(true)
      // try{
      //   const response = await WhitelistAccount( 
      //     firstName,
      //     lastName,
      //     dob,
      //     address,
      //     userCountry,
      //     userState,
      //     postalCode,
      //     amount,
      //     paymentMethod,
      //     purchaseType
      //   )
      //   if(response.status == 200){
      //     setBtnLoading(false)
      //     setOpenModal(true);
      //     setNewUserDetails(response.user)
      //   }
      // }catch(err){
      //   setBtnLoading(false)
      //   ErrorHandler(err, navigate, setAuth)
      // }
   
    }
  }
  const prev=()=>{
    if(stage > 0){
      setStage(stage - 1)
    }
  }

 
  const handleDateChange = (newValue: Date | null) => {
    setDob(newValue);
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange=(e: any)=>{
    setFirstName(e.target.value)
  }

  const Name = (
    <div style={{width: '100%'}}>
      <p style={{color: '#64748B', lineHeight: '30px'}}>Please make sure your name matches the details on your ID Documents</p>
      <div>
        <p style={{marginBottom: '10px', color: '#64748B'}}>First Name</p>
        <TextField
          id="outlined-fname"
          // label="Name"
          autoComplete='new-password'
          placeholder='Jonh'
          style={{width: '100%'}}
          value={firstName}
          onChange={e=>setFirstName(e.target.value)}
        />
      </div>

      <div>
        <p style={{marginBottom: '10px', color: '#64748B'}}>Last Name</p>
        <TextField
          id="outlined-lname"
          // label="Name"
          placeholder='Doe'
          autoComplete='new-password'
          style={{width: '100%'}}
          value={lastName}
          onChange={e=>setLastName(e.target.value)}
        />
      </div>

      <div>
        <p style={{marginBottom: '10px', color: '#64748B'}}>Date of Birth</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          inputFormat="MM/dd/yyyy"
          value={dob}
          onChange={handleDateChange}
          renderInput={(params) => <TextField style={{width: '100%'}} {...params} />}
        />
        </LocalizationProvider>
        
      </div>
    </div>
  )

  const AddressInfo = (
    <div style={{width: '100%'}}>
      <div>
        <p style={{marginBottom: '10px', color: '#64748B'}}>Address*</p>
        <TextField
          id="outlined-address"
          placeholder='add an address'
          // label="Name"
          autoComplete='new-password'
          style={{width: '100%'}}
          value={address}
          onChange={e=>setAddress(e.target.value)}
        />
      </div>

      <div>
        <p  style={{marginBottom: '10px', color: '#64748B'}}>Country of Residence*</p>
        <Autocomplete
          value={country}
          style={{width: '100%'}}
          onChange={(event, newValue) => {
            if (typeof newValue["name"] === 'string') {
                setCountry(newValue);
                setStates(newValue.states)
                console.log(newValue, ' new val 1')
            } else if (newValue && newValue.inputValue) {
                console.log(newValue, ' new val 2')
                // Create a new value from the user input
                // setCountry(newValue);

            } else {
                console.log(newValue, ' new val 3')
                setCountry(newValue);
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
              <TextField placeholder='select a country'
                  autoComplete='new-password'
              {...params} />
          )}
        />
      </div>
      <div>
        <p style={{marginBottom: '10px', color: '#64748B'}}>State*</p>
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
      </div>

      <div>
        <p style={{marginBottom: '10px', color: '#64748B'}}>Postal Code</p>
        <TextField
          id="outlined-code"
          placeholder="enter postal code"
          autoComplete='new-password'
          // label="Name"
          style={{width: '100%'}}
          value={postalCode}
          onChange={e=>setPostalCode(e.target.value)}
        />
      </div>
    </div>
  )

  const Amount=(
    <div style={{width: '100%'}}>
      <div>
        <p style={{marginBottom: '10px', color: '#64748B'}}>How much Tokens would you like to buy?</p>
        <TextField
          id="outlined-select-amount"
          select
          style={{width: '100%'}}
          value={amount}
          onChange={e=>setAmount(e.target.value)}
        >
          {amounts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div>
        <p style={{marginBottom: '10px', color: '#64748B'}}>Preferred payment method</p>
        <TextField
          id="outlined-select-payment"
          select
          style={{width: '100%'}}
          value={paymentMethod}
          onChange={e=>setPaymentMethod(e.target.value)}
        >
          {paymentMethods.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div>
        <p style={{marginBottom: '10px', color: '#64748B'}}>Are you purchasing privately?</p>
        <TextField
          id="outlined-select-payment"
          select
          style={{width: '100%'}}
          value={purchaseType}
          onChange={e=>setPurchaseType(e.target.value)}
        >
          {purchaseTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>

      
    </div>
  )

  const CurrentForm=()=>{
    switch(stage){
      case 0:
        return Name;
      case 1:
        return AddressInfo;
      case 2:
        return Amount
    }
  }
  

  return (
      <>
        <Navbar />
        
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.summary_text}>
                  <h2 style={{color: '#00668F', fontWeight: 'bold'}}>Token Presale Whitelist</h2>
                  <p style={{color: '#00668F'}}>To qualify for our upcoming PKT Token presale event, your <br/>account must be whitelisted. <span style={{fontWeight: '600'}}>Read more about the presale event and account whitelisting <span style={{color: '#00AFF5'}}>here</span></span>.</p>
                </div>
                <Divider width='25%' />
              <div className={styles.form}>
                {CurrentForm()}
                <span style={{fontSize: '13px', marginTop: '7px', alignSelf: 'flex-start', color: 'tomato'}}>{message}</span>
                <div style={{marginTop: '30px', width: '100%'}}>
                  <Button onClick={()=>next()} loading={btnLoading} disabled={btnLoading} text='NEXT' bgColor='#00AFF5' height='60px' width="100%" />
                  {stage > 0 && (
                    <Button onClick={()=>prev()} text='PREVIOUS' textColor='#00AFF5' bgColor='transparent' height='60px' width="100%" />
                  )}
                </div>
              </div>
                
            </div>
        </div>
        <Footer />
        <Modal modal={openModal} showModal={setOpenModal} backdropClose={false}>
          <Box sx={style}>
            <span onClick={()=>{setOpenModal(false); setUserDetails(newUserDetails); navigate('/home')}} style={{backgroundColor: '#F8FAFC', cursor: 'pointer', marginRight: '-20px', marginTop: '-20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', width: '40px', borderRadius: '50%', alignSelf: 'flex-end'}}>
              <FaTimes size={25} color="#0099D6" />
            </span>
            <div style={{width: '70%'}}>
              <p style={{fontSize: '16px', fontWeight: 'bold'}}>Congratulations! <br/>Your account has been whitelisted for our pre-sale event!</p>
            </div>
          <img src="/sally-4.png" style={{width: '90%'}} alt="giftimage" />
        </Box>
        </Modal>
      </>
  )
}
