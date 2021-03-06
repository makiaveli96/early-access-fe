import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal"; 
import styles from "./styles.module.css";
import { Icon } from "@iconify/react";
import { GeneralContext } from "../../contexts/generalContextApi";
import Button from '../../components/Button'
import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { BsArrowLeft } from 'react-icons/bs'
import Countries from '../../utils/countries-states';
import { AuthContext } from '../../contexts/authContextApi';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import Chip from '@mui/material/Chip';
import Currencies from '../../utils/currencies';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Notifier } from "../Notifier";
import { ToastContainer } from "react-toastify";
import { ErrorHandler } from "../../helpers/Errorhandler";
import { useNavigate } from 'react-router-dom'
import { sendVerificationCode, verifyCode, saveAcccountDetails } from '../../components/api/routes'
import ModalProgress from "../ModalProgress";
import OtpInput from '../../components/OtpInput'
import ChipSelectorInput from "../ChipSelectorInput";
import Cryptocurrencies from "../../utils/crypto-currencies";


const industries = [
  { label: 'Infomation Technology' },
  { label: 'Finance' },
  { label: 'Communications' },
  { label: 'Media' },
  { label: 'Other' },
]

const textBool = [
  {key: 0, label: 'Yes'},
  {key: 1, label: 'No'}
];

const employeeRange = [
  {label: 'less than 10'},
  {label: '10 - 20 Employees'},
  {label: '20 - 50 Employees'},
  {label: '50 - 100 Employees'},
  {label: '100 - 500 Employees'},
  {label: '500+ Employees'},
]

const numberRange = [
  {label: '1-5'},
  {label: '5 - 10'},
  {label: '10 - 50'},
  {label: '50+'},
]

const amountRange = [
  {label: 'Less than $1,000'},
  {label: '$1,000 - $5,000'},
  {label: '$5,000 - $10,000'},
  {label: '$10,000 - $50,000'},
  {label: '$50,000 - $100,000'},
  {label: '$100,000 - $500,000'},
  {label: '$500,000 - $1,000,000'},
  {label: '$1,000,000+'},
]

function Business() {
  const navigate = useNavigate()
  const { showProfile, showUploadImage }: any = useContext(GeneralContext);
  const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);
  const [selectedAccount, setSelectedAccount] = useState('personal');
  const [step, setStep] = useState(userDetails?.profileStep || 0);
  const [saving, setSaving] = useState(false)

  
  const [bizName, setBizName] = useState(userDetails?.businessName || '');
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState(industries[0].label)

  const [otpCode, setOtpCode] = useState('')
  
  const [countryOfOperation, setCountryOfOperation] = useState<any | null>(Countries[0]);
  const [states, setStates] = useState<any>([])
  const [userCountry, setUserCountry] = useState(userDetails?.contry)
  const [userState, setUserState] = useState(userDetails?.state);
  const [address, setAddress] = useState('');
  const [state, setState] = useState<any | null>(null);
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [isCompanyFullyRegistered, setIsCompanyFullyRegistered] = useState(userDetails?.isCompanyFullyRegistered || textBool[0].label);
  const [numberOfEmployees, setNumberOfEmployees] = useState(userDetails?.numberOfEmployees || employeeRange[0].label)
  const [taxNo, setTaxNo] = useState(userDetails?.taxIdNumber || '');
  const [countryRemittances, setCountryRemittances] = useState(userDetails?.countryRemittances || numberRange[0].label);
  const [monthlyRemittance, setMonthlyRemittance] = useState(userDetails?.monthlyRemittance || amountRange[1].label)

  const [supportedCurrencies, setSupportedCurrencies] = useState(userDetails?.supportedCurrencies || []);
  const [supportedCrypto, setSupportedCrypto] = useState(userDetails?.supportedCrypto || []);
  const [supportedCountries, setSupportedCountries] = useState(userDetails?.supportedCountries || []);

  const [userHasAccount, setUserHasAccount] = useState(userDetails?.userHasValidBankAccount || 'Yes');
  const [userHasCryptoWallet, setUserHasCryptoWallet] = useState(userDetails?.userHasCryptoWallet || 'Yes');
  const [poketUseCase, setPoketUseCase] = useState(userDetails?.intendedUsageOfPoket || 'Private')

  

  const poketUseCases = [
    {label: 'Private'},
    {label: 'Company use'},
    { label: "Both" },
  ]


  const accountTypes = [
    {
      label: "personal",
      info: "This is just dummy copy and should be replaced. This is just dummy copy and should be replaced.",
    },
    {
      label: "business",
      info: "This is just dummy copy and should be replaced. This is just dummy copy and should be replaced.",
    },
  ];

  
  // useEffect(()=>{
  //   setUserCountry(country?.name)
  //   setUserState(state?.name)
  // },[country, state]);
  useEffect(()=>{
    if(userDetails?.countryOfOperation){
      const findCountry = Countries.find(country => country.name == userDetails?.countryOfOperation)
      if(findCountry){
        setCountryOfOperation(findCountry)
      }
    }
  },[])

  useEffect(()=>{
    setStates(Countries[0].states)
  },[])

  const handleOtpCode=(e)=>{
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setOtpCode(e.target.value)
    }
  }


  const AccountType = (
    <div className={styles.body}>
      <p style={{ color: "#64748B" }}>
        How do you want to use your Poket account?
      </p>
      {accountTypes.map((type, i)=>(
        <div key={i} onClick={()=>setSelectedAccount(type.label)} style={{height: '130px', display: 'flex', cursor: 'pointer', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', marginBottom: '15px', width: '100%', border: type.label == selectedAccount? '1px solid #FFF5EB' : '1px solid #64748B', backgroundColor: type.label == selectedAccount? '#FFF5EB' : 'white'}}>
          <div style={{height: '100%', width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <p style={{textTransform: 'capitalize', margin: 0}}>{type.label}</p>
              {type.label == selectedAccount && (
                <span style={{backgroundColor: '#F57A00', padding: '4px', fontSize: '10px', width: '70px', textAlign: 'center', borderRadius: '4px', color: 'white'}}>selected</span>
              )}
            </div>
            <p style={{margin: 0}}>{type.info}</p>
          </div>
        </div>
      ))}
    </div>
  )

  const Name = (
    <div style={{width: '100%', marginBottom: '20px'}}>
      <p style={{color: '#64748B', lineHeight: '30px'}}>Please make sure your name matches the details on your ID Documents</p>
      <div>
        <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Business name</p>
        <TextField
          id="outlined-fname"
          // label="Name"
          autoComplete='new-password'
          placeholder='Jonh Doe INC'
          helperText="enter your registered business name"
          style={{width: '100%'}}
          value={bizName}
          onChange={e=>setBizName(e.target.value)}
        />
      </div>

      <div>
        <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Business email</p>
        <TextField
          id="outlined-lname"
          // label="Name"
          placeholder='johndoe@business.com'
          autoComplete='new-password'
          disabled={true}
          style={{width: '100%'}}
          value={userDetails?.email}
          onChange={e=>setEmail(e.target.value)}
        />
      </div>

      {/* <div>
        <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Phone number</p>
          <PhoneInput
            specialLabel=''
            inputStyle={{width: '100%'}}
            country={'us'}
            value={phone}
            disabled={userDetails.isPhoneVerified}
            onChange={phone=>setPhone(phone)}
          />
        <p style={{fontSize: '12px'}}>you will receive an sms code to verify this number</p>
      </div> */}

      <div>
        <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Industry</p>
        <TextField
          id="industries"
          select
          style={{width: '100%'}}
          // label="Native select"
          value={industry}
          onChange={e=>setIndustry(e.target.value)}
          variant="outlined"
        >
          {industries.map((option) => (
            <MenuItem key={option.label} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      
    </div>
  )

  const VerifyNumber=(
    <div style={{marginBottom: '20px'}}>
      <p style={{fontSize: '15px', color: '#64748B'}}>Enter the OTP Verification code we sent to your phone.</p>
      <OtpInput value={otpCode} onChange={handleOtpCode} />
      {/* <TextField
        id="outlined-lname"
        placeholder='123456'
        autoComplete='new-password'
        style={{width: '100%'}}
        value={otpCode}
        onChange={handleOtpCode}
      /> */}
    </div>
  )

  const Country=(
    <div style={{ marginBottom: '20px' }}>
      <div>
        <p  style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Country of operation*</p>
        <Autocomplete
          value={countryOfOperation}
          style={{width: '100%'}}
          onChange={(event, newValue) => {
            if (typeof newValue["name"] === 'string') {
                setCountryOfOperation(newValue);
                setStates(newValue.states)
            } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                // setCountry(newValue);

            } else {
                setCountryOfOperation(newValue);
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
        <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Address*</p>
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
        <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>State*</p>
        <Autocomplete
          value={state}
          style={{width: '100%'}}
          onChange={(event, newValue) => {
            if (typeof newValue?.name === 'string') {
              setState(newValue);
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              // setCountry(newValue);
            } else {
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
        <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>City*</p>
        <TextField
          id="outlined-address"
          placeholder='enter city'
          // label="Name"
          autoComplete='new-password'
          style={{width: '100%'}}
          value={city}
          onChange={e=>setCity(e.target.value)}
        />
      </div>

      <div>
        <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Postal Code</p>
        <TextField
          id="outlined-postal"
          placeholder='postal code(optional)'
          // label="Name"
          autoComplete='new-password'
          style={{width: '100%'}}
          value={postalCode}
          onChange={e=>setPostalCode(e.target.value)}
        />
      </div>

    </div>
  )

  const CompanyInfo=(
    <div style={{marginBottom: '20px'}}>
        <div>
        <p  style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Country of operation*</p>
        <Autocomplete
          value={countryOfOperation}
          style={{width: '100%'}}
          onChange={(event, newValue) => {
            if (typeof newValue["name"] === 'string') {
                setCountryOfOperation(newValue);
                setStates(newValue.states)
            } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                // setCountry(newValue);
            } else {
                setCountryOfOperation(newValue);
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
        <p style={{ color: '#64748B', fontSize: '14px' }}>Is your business registered in every country it operates in?</p>
          <TextField
            id="has-account"
            select
            style={{width: '100%'}}
            // label="Native select"
            value={isCompanyFullyRegistered}
            onChange={e=>setIsCompanyFullyRegistered(e.target.value)}
            variant="outlined"
          >
            {textBool.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      </div>

      <div>
        <p style={{ color: '#64748B', fontSize: '14px' }}>Number of employees</p>
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
      </div>

      <div>
        <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Tax Identification number</p>
        <TextField
          id="outlined-tex-no"
          placeholder='XXX-XX-XXXX.'
          // label="Name"
          autoComplete='new-password'
          style={{width: '100%'}}
          value={taxNo}
          onChange={e=>setTaxNo(e.target.value)}
        />
      </div>

      <div>
        <p style={{ color: '#64748B', fontSize: '14px' }}>How many countries do you send money to?</p>
          <TextField
            id="has-account"
            select
            style={{width: '100%'}}
            // label="Native select"
            value={countryRemittances}
            onChange={e=>setCountryRemittances(e.target.value)}
            variant="outlined"
          >
            {numberRange.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      </div>

      <div>
        <p style={{ color: '#64748B', fontSize: '14px' }}>How much remittance does your company make each month?</p>
          <TextField
            id="has-account"
            select
            style={{width: '100%'}}
            // label="Native select"
            value={monthlyRemittance}
            onChange={e=>setMonthlyRemittance(e.target.value)}
            variant="outlined"
          >
            {amountRange.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      </div>
    </div>
  )

  

  const handleCurrency=(e, val)=>{
    setSupportedCurrencies(val)
  }
  const NeededCurrencies=(
    <div style={{marginBottom: '20px', marginTop: '20px'}}>
      <p style={{color: '#64748B', fontSize: '14px'}}>Which of these currencies do you need most often? Select as many as possible</p>
      {/* <Autocomplete
        key={1}
        multiple
        id="tags-currencies"
        options={Currencies.map((option) => option.name)}
        defaultValue={supportedCurrencies}
        onChange={handleCurrency}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip key={index} variant="outlined" style={{backgroundColor: '#F2F2F2'}} label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            style={{backgroundColor: 'white', outline: 'none', minHeight: '50px'}}
            placeholder="Currencies"
          />
        )}
      /> */}
      <ChipSelectorInput 
        highlights={[
          { name: 'United States Dollar' },
          { name: 'Canadian Dollar' },
          { name: 'European Euro' },
          { name: 'Rwandan Franc' },
          { name: 'Bitcoin' },
          { name: "Ethereum" },
          { name: "Ethereum Classic" },
        ]} 
        allItems={[...Currencies, ...Cryptocurrencies]}
        selected={supportedCurrencies}
        setSelected={setSupportedCurrencies}
        placeholder="Add currency"
      />
    </div>
  )
  const handleCountry=(e, val)=>{
    setSupportedCountries(val)
  }

  const NeededCrypto = (
    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
      <p style={{ color: "#64748B", fontSize: "14px" }}>
        Which of these Cryptocurrencies do you need most often? Select as many as possible
      </p>
      <ChipSelectorInput
        highlights={[
          { name: "Bitcoin" },
          { name: "Ethereum" },
          { name: "Ethereum Classic" },
        ]}
        allItems={Cryptocurrencies}
        selected={supportedCrypto}
        setSelected={setSupportedCrypto}
        placeholder="Add currency"
      />
    </div>
  );

  const SupportedCountries=(
    <div style={{marginBottom: '20px', marginTop: '20px'}}>
      <p style={{color: '#64748B', fontSize: '14px'}}>
      Which of these countries do you receive payment from? Select as many as possible
      </p>
      {/* <Autocomplete
        key={2}
        multiple
        id="tags-countries"
        options={Countries.map((option) => option.name)}
        defaultValue={supportedCountries}
        onChange={handleCountry}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip key={index} variant="outlined" style={{backgroundColor: '#F2F2F2'}} label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            style={{backgroundColor: 'white', outline: 'none', minHeight: '50px'}}
            placeholder="Countries"
          />
        )}
      /> */}
      <ChipSelectorInput 
        highlights={[
          { name: 'United States' },
          { name: 'United Kingdom' },
          { name: 'Nigeria' },
          { name: 'Canada' }
        ]} 
        allItems={Countries}
        selected={supportedCountries}
        setSelected={setSupportedCountries}
        placeholder="Add country"
      />
    </div>
  )

  const Account=(
    <div style={{marginBottom: '20px', marginTop: '20px'}}>
      <p style={{ color: '#64748B', fontSize: '14px' }}>Does your business have a coperate bank account?</p>
      <TextField
        id="has-account"
        select
        style={{width: '100%'}}
        // label="Native select"
        value={userHasAccount}
        onChange={e=>setUserHasAccount(e.target.value)}
        variant="outlined"
      >
        {textBool.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <p style={{ color: '#64748B', fontSize: '14px' }}>Do you have a crypto wallet?</p>
      <TextField
        id="has-account"
        select
        style={{width: '100%'}}
        // label="Native select"
        value={userHasCryptoWallet}
        onChange={e=>setUserHasCryptoWallet(e.target.value)}
        variant="outlined"
      >
        {textBool.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <p style={{ color: '#64748B', fontSize: '14px' }}>How do you intend to use poket primarily?</p>
      <TextField
        id="has-account"
        select
        style={{width: '100%'}}
        // label="Native select"
        value={poketUseCase}
        onChange={e=>setPoketUseCase(e.target.value)}
        variant="outlined"
      >
        {poketUseCases.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )



  const RenderStage=()=>{
    switch(step){
      // case 0: return AccountType;
      case 0: return Name;
      // case 1: return VerifyNumber;
      // case 1: return Country;
      case 1: return CompanyInfo;
      case 2: return NeededCurrencies;
      case 3: return NeededCrypto;
      case 4: return SupportedCountries;
      case 5: return Account;
    }
  }
  const Prev=()=>{
    if(step > 0){
      setStep(step - 1)
    }
  }
  const Next=()=>{
    switch(step){
      case 0:
        if(bizName.length < 4){
          return Notifier('Business name cannot be less than 4 characters', 'warning');
        }
        SaveProfileStep({ businessName: bizName })
        break;
      case 1:
        if(!taxNo){
          return Notifier('tax id number is required', 'warning');
        }
        SaveProfileStep({ countryOfOperation: countryOfOperation.name, isCompanyFullyRegistered,
          numberOfEmployees,
          taxIdNumber: taxNo,
          countryRemittances,
          monthlyRemittance, })
        break;
      case 2:
        if(supportedCurrencies.length < 3){
          return Notifier('select at least 3 currencies', 'warning');
        }
        SaveProfileStep({ supportedCurrencies })
        break;
      case 3:
        if(supportedCrypto.length < 3){
          return Notifier('select at least 3 cryptocurrencies', 'warning');
        }
        SaveProfileStep({ supportedCrypto })
        break;
      case 4:
        if(supportedCountries.length < 3){
          return Notifier('select at least one countries', 'warning');
        }
        SaveProfileStep({ supportedCountries })
        break;
      case 5:
        SaveProfileStep({
          userHasValidBankAccount: userHasAccount,
          userHasCryptoWallet: userHasCryptoWallet,
          intendedUsageOfPoket: poketUseCase,
          referralPoints: userDetails?.referralPoints + 6000,
          lastStep: true,
          isProfileSet: true
        });
        showProfile(false)
        showUploadImage(true)
        break;
    } 
  }

  const verifyOtp=()=>{
    setStep(step + 1)
  }

  const SaveProfileStep = async (data) => {
    try {
      setSaving(true);
      const res = await saveAcccountDetails({...data, profileStep: step + 1});
      if (res.status == 200) {
        setSaving(false);
        setUserDetails(res.user);
        setStep(step + 1);
        // Notifier(res.message, 'success')
        // showProfile(false)
      } else {
        setSaving(false);
        // Notifier(res.message, 'error')
      }
    } catch (err) {
      setSaving(false);
      ErrorHandler(err, navigate, setAuth);
    }
  };
 
  const SaveInfo=async()=>{
    let data = {  
      businessName: bizName,
      phone,
      businessIndustry: industry,
      countryOfOperation: countryOfOperation.name,
      address,
      state: state.name,
      city,
      postalCode,
      supportedCurrencies,
      supportedCountries,
      isCompanyFullyRegistered,
      numberOfEmployees,
      taxIdNumber: taxNo,
      countryRemittances,
      monthlyRemittance,
      // userHasValidBankAccount: userHasAccount,
      // userHasCryptoWallet: userHasCryptoWallet,
      // intendedUsageOfPoket: poketUseCase,
      isProfileSet: true
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
    <>
      <main className={styles.container}>
        <div style={{width: '80%'}}>
          <p style={{fontSize: '14px', fontWeight: 'bold', color: '#16A34A'}}>+1000 points</p>
        </div>
        <div className={styles.header}>
          {step > 0 && (
            <span style={{cursor: 'pointer'}} onClick={()=>Prev()}>
              <BsArrowLeft size={25} />
            </span>
          )}
          <ModalProgress length={6} current={step} setStep={setStep}  />
          <span
            onClick={() => showProfile(false)}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="clarity:times-line" height={25} width={25} />
          </span>
        </div>
       
        <div className={styles.main}>
          <p>Build a business profile</p>
          {RenderStage()}
          <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Button onClick={()=>showProfile(false)} text="Close" width= '48%' textSize="14px" height="58px" textColor="black" bgColor='transparent' style={{border: '.5px solid #CBD5E1'}} />
            <Button loading={saving} disabled={saving} onClick={()=>Next()} text="Next" width= '48%' textSize="14px" height="58px" bgColor='#0099D6' />
          </div>
        </div>
      </main>
    </>
  );
}

export default Business;
