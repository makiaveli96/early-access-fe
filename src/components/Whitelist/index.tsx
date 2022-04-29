// import React, { useState, useContext } from "react";
// import styles from "./styles.module.css";
// import Modal from "../Modal";
// import { GeneralContext } from "../../contexts/generalContextApi";
// import { AuthContext } from '../../contexts/authContextApi'
// import { ToastContainer } from "react-toastify";
// import Button from "../../components/Button";
// import TextField from '@mui/material/TextField';
// import { Container } from "../ProfileModal/AccountProfile/Personal";
// import MenuItem from '@mui/material/MenuItem';
// import { WhitelistAccount } from '../../components/api/routes'
// import { Notifier } from '../../components/Notifier';
// import { ErrorHandler } from '../../helpers/Errorhandler';
// import { useNavigate } from 'react-router-dom'


// const tokenRange = [
//   {value: '5,000 - 25,000'},
//   {value: '25,000 - 50,000'},
//   {value: '50,000 - 100,000'},
//   {value: '100,000 - 500,000'},
//   {value: '500,000 - 1,000,000'},
//   {value: '1,000,000+'},
// ]

// const paymentMethods = [
//   { value: 'Credit/Debit Cards' },
//   { value: 'ACH transfer' },
//   { value: 'Cryptocurrency'},
// ]

// const purchaseTypes = [
//   { value: 'For a business, fund or others' },
//   { value: 'Personal' },
//   { value: 'Private' },
// ]

// function Whitelist() {
//   const navigate = useNavigate();
//   const { whitelist, showWhitelist, showProfile } = useContext(GeneralContext);
//   const { setAuth, userDetails, setUserDetails } = useContext(AuthContext)
//   const [loading, setLoading] = useState(false);

//   const [tokenAmount, setTokenAmount] = useState<string>(tokenRange[0].value);
//   const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0].value);
//   const [purchaseType, setPurchaseType] = useState<string>(purchaseTypes[0].value);

//   const isProfileSet = true;

//   const applyForWhitelist=async()=>{
//     try{
//       setLoading(true)
//       const res = await WhitelistAccount(tokenAmount, paymentMethod, purchaseType);
//       if(res.status == 200){
//         showWhitelist(false)
//         setLoading(false)
//         setUserDetails(res.user);
//         Notifier('Thanks for applying for our whitelisting!', 'success')
//       }else{
//         setLoading(false)
//         Notifier(res.message || 'Something went wrong, please try again.', 'error')
//       }
//     }catch(err){
//       setLoading(false)
//       ErrorHandler(err, navigate, setAuth)
//     }
//   }

//   return (
//     <>
      
//       <Modal modal={whitelist} showModal={showWhitelist} backdropClose>
//             <main className={styles.container}>
//               <div className={styles.header}>
//                 <p>Get Whitelisted</p>
//               </div>
//               <div className={styles.main}>
//                 {!userDetails?.isProfileSet? (
//                   <>    
//                   <p>
//                     You must setup your poket profile before your account can be
//                     whitelisted.
//                   </p>
//                   <div onClick={()=>{showWhitelist(false); showProfile(true)}} className={styles.box}>
//                     <p>Build a profile</p>
//                     <img src="/icons/action_arr_right.png" />
//                   </div>
//                   </>
//                 ):(
//                   <>
//                   <Container>
//                     <p style={{ color: '#64748B', fontSize: '14px' }}>How much Tokens would you like to buy?</p>
//                     <TextField
//                       id="has-account"
//                       select
//                       style={{width: '100%'}}
//                       // label="Native select"
//                       value={tokenAmount}
//                       onChange={e=>setTokenAmount(e.target.value)}
//                       variant="outlined"
//                     >
//                       {tokenRange.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                           {option.value}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Container>

//                   <Container>
//                     <p style={{ color: '#64748B', fontSize: '14px' }}>Preffered payment method</p>
//                     <TextField
//                       id="has-account"
//                       select
//                       style={{width: '100%'}}
//                       // label="Native select"
//                       value={paymentMethod}
//                       onChange={e=>setPaymentMethod(e.target.value)}
//                       variant="outlined"
//                     >
//                       {paymentMethods.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                           {option.value}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Container>

//                   <Container>
//                     <p style={{ color: '#64748B', fontSize: '14px' }}>Are you purchasing privately? </p>
//                     <TextField
//                       id="has-account"
//                       select
//                       style={{width: '100%'}}
//                       // label="Native select"
//                       value={purchaseType}
//                       onChange={e=>setPurchaseType(e.target.value)}
//                       variant="outlined"
//                     >
//                       {purchaseTypes.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                           {option.value}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Container>
//                   </>
                
//                 )}
//                 <br />
//                 <Button
//                   onClick={()=>applyForWhitelist()}
//                   loading={loading}
//                   bgColor="#0099D6"
//                   disabled={!userDetails?.isProfileSet? true : loading}
//                   text="Apply for whitelisting"
//                   width="100%"
//                   height="58px"
//                   textSize="14px"
//                 />
//               </div>
//             </main>
//       </Modal>
//     </>
//   );
// }

// export default Whitelist;

import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import styles from "./styles.module.css";
import { Icon } from "@iconify/react";
import { GeneralContext } from "../../contexts/generalContextApi";
import Button from "../../components/Button";
import TextField from "@mui/material/TextField";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { BsArrowLeft } from "react-icons/bs";
import Countries from "../../utils/countries-states";
import { AuthContext } from "../../contexts/authContextApi";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import Chip from "@mui/material/Chip";
import Currencies from "../../utils/currencies";
import Cryptocurrencies from "../../utils/crypto-currencies";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Notifier } from "../Notifier";
import { ToastContainer } from "react-toastify";
import { format, parseISO } from "date-fns";
import {
  sendVerificationCode,
  verifyCode,
  WhitelistAccount,
  saveAcccountDetails,
} from "../../components/api/routes";
import { ErrorHandler } from "../../helpers/Errorhandler";
import { useNavigate } from "react-router-dom";
import ModalProgress from "../ModalProgress";
import OtpInput from "../../components/OtpInput";
import ChipSelectorInput from "../ChipSelectorInput";
import { Container } from "../ProfileModal/AccountProfile/Personal";
import { track } from "../../utils/EventTracker";


const ageRanges = [
  { label: "18-25 years old" },
  { label: "25-35 years old" },
  { label: "35-45 years old" },
  { label: "45-55 years old" },
  { label: "45-55 years old" },
  { label: "55-65 years old" },
  { label: "Above 65 years old" },
];


const tokenRange = [
  {value: '5,000 - 25,000'},
  {value: '25,000 - 50,000'},
  {value: '50,000 - 100,000'},
  {value: '100,000 - 500,000'},
  {value: '500,000 - 1,000,000'},
  {value: '1,000,000+'},
]

const paymentMethods = [
  { value: 'Credit/Debit Cards' },
  { value: 'ACH transfer' },
  { value: 'Cryptocurrency'},
]

const purchaseTypes = [
  { value: 'For a business, fund or others' },
  { value: 'Personal' },
]

function Perosonal() {
  const navigate = useNavigate();
  const { showProfile, showUploadImage, whitelist, showWhitelist, showWhitelistSuccess }: any = useContext(GeneralContext);
  const { auth, setAuth, userDetails, setUserDetails }: any =
    useContext(AuthContext);
  const [selectedAccount, setSelectedAccount] = useState("personal");
  const [step, setStep] = useState(userDetails?.whitelistStep || 0);
  const [saving, setSaving] = useState(false);

  const [firstName, setFirstName] = useState(userDetails?.firstName || "");
  const [lastName, setLastName] = useState(userDetails?.lastName || "");
  const [dob, setDob] = useState<any | null>(new Date());

  const [countryOfResidence, setCountryOfResidence] = useState<any | null>(
    Countries[0]
  );
  const [countryOfCitizenship, setCountryOfCitizenship] = useState<any | null>(
    Countries[0]
  );

  const [ageRange, setAgeRange] = useState(userDetails?.ageRange || ageRanges[0].label)

  const [tokenAmount, setTokenAmount] = useState<string>(tokenRange[0].value);
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0].value);
  const [purchaseType, setPurchaseType] = useState<string>(purchaseTypes[0].value);

  const [states, setStates] = useState<any>([]);
  const [userCountry, setUserCountry] = useState(userDetails?.contry);
  const [userState, setUserState] = useState(userDetails?.state);
  const [phone, setPhone] = useState("");

  const [otpCode, setOtpCode] = useState("");

  const [address, setAddress] = useState(userDetails?.address || "");
  const [state, setState] = useState<any | null>(null);
  const [city, setCity] = useState(userDetails?.city || "");
  const [postalCode, setPostalCode] = useState(userDetails?.postalCode || "");

  const [supportedCurrencies, setSupportedCurrencies] = useState(userDetails?.supportedCurrencies || []);
  const [supportedCrypto, setSupportedCrypto] = useState(userDetails?.supportedCrypto || []);
  const [supportedCountries, setSupportedCountries] = useState(userDetails?.supportedCountries || []);

  const [userHasAccount, setUserHasAccount] = useState("Yes");
  const [userHasCryptoWallet, setUserHasCryptoWallet] = useState("Yes");
  const [poketUseCase, setPoketUseCase] = useState("Private");


  const textBool = [
    { key: 0, label: "Yes" },
    { key: 1, label: "No" },
  ];

  const poketUseCases = [
    { label: "Private" },
    { label: "Company use" },
    { label: "Both" },
  ];

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

  const handleDateChange = (newValue: Date | null) => {
    setDob(newValue);
  };

  // useEffect(()=>{
  //   setUserCountry(country?.name)
  //   setUserState(state?.name)
  // },[country, state]);

  useEffect(() => {
    setStates(Countries[0].states);
  }, []);

  useEffect(()=>{
    if(userDetails?.countryOfResidence){
      const findCountry = Countries.find(country => country.name == userDetails?.countryOfResidence)
      if(findCountry){
        setCountryOfResidence(findCountry)
        setStates(findCountry.states)
      }
    }
    if(userDetails?.countryOfCitizenship){
      const findCountry = Countries.find(country => country.name == userDetails?.countryOfCitizenship)
      if(findCountry){
        setCountryOfCitizenship(findCountry)
      }
    }
  },[])

  const handleOtpCode = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setOtpCode(e.target.value);
    }
  };

  const AccountType = (
    <div className={styles.body}>
      <p style={{ color: "#64748B" }}>
        How do you want to use your Poket account?
      </p>
      {accountTypes.map((type, i) => (
        <div
          key={i}
          onClick={() => setSelectedAccount(type.label)}
          style={{
            height: "130px",
            display: "flex",
            cursor: "pointer",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "8px",
            marginBottom: "15px",
            width: "100%",
            border:
              type.label == selectedAccount
                ? "1px solid #FFF5EB"
                : "1px solid #64748B",
            backgroundColor:
              type.label == selectedAccount ? "#FFF5EB" : "white",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ textTransform: "capitalize", margin: 0 }}>
                {type.label}
              </p>
              {type.label == selectedAccount && (
                <span
                  style={{
                    backgroundColor: "#F57A00",
                    padding: "4px",
                    fontSize: "10px",
                    width: "70px",
                    textAlign: "center",
                    borderRadius: "4px",
                    color: "white",
                  }}
                >
                  selected
                </span>
              )}
            </div>
            <p style={{ margin: 0 }}>{type.info}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const AgeRange = (
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <p style={{ color: "#57584E", fontSize: "15px", marginBottom: '5px', lineHeight: "30px" }}>
        What is your age range?
      </p>
      <TextField
        id="has-account"
        select
        style={{ width: "100%" }}
        // label="Native select"
        value={ageRange}
        onChange={(e) => setAgeRange(e.target.value)}
        variant="outlined"
      >
        {ageRanges.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );

  const Country = (
    <div style={{ marginBottom: "20px" }}>
      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          Country of Residence*
        </p>
        <Autocomplete
          value={countryOfResidence}
          style={{ width: "100%" }}
          onChange={(event, newValue) => {
            if (typeof newValue["name"] === "string") {
              setCountryOfResidence(newValue);
              setStates(newValue.states);
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              // setCountry(newValue);
            } else {
              setCountryOfResidence(newValue);
              setStates(newValue.states);
            }
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="country-selector"
          options={Countries}
          getOptionLabel={(option) => {
            if (typeof option.name === "string") {
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
              placeholder="select a country"
              autoComplete="new-password"
              {...params}
            />
          )}
        />
      </div>

      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          Address*
        </p>
        <TextField
          id="outlined-address"
          placeholder="add an address"
          // label="Name"
          autoComplete="new-password"
          style={{ width: "100%" }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          State*
        </p>
        <Autocomplete
          value={state}
          style={{ width: "100%" }}
          onChange={(event, newValue) => {
            if (typeof newValue?.name === "string") {
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
            if (typeof option.name === "string") {
              return option.name;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option?.name || "";
          }}
          renderOption={(props, option) => <li {...props}>{option?.name}</li>}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField
              autoComplete="new-password"
              placeholder="select state"
              {...params}
            />
          )}
        />
      </div>

      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          City*
        </p>
        <TextField
          id="outlined-address"
          placeholder="enter city"
          // label="Name"
          autoComplete="new-password"
          style={{ width: "100%" }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          Postal Code
        </p>
        <TextField
          id="outlined-postal"
          placeholder="postal code(optional)"
          // label="Name"
          autoComplete="new-password"
          style={{ width: "100%" }}
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      {/* <p style={{marginBottom: '10px', fontSize: '14px', color: '#64748B'}}>Phone number</p>
        <PhoneInput
          specialLabel=''
          inputStyle={{width: '100%'}}
          country={'us'}
          value={phone}
          disabled={userDetails.isPhoneVerified}
          onChange={phone=>setPhone(phone)}
        />
        <p style={{fontSize: '12px'}}>you will receive an sms code to verify this number</p> */}
    </div>
  );

  const Amount = (
    <div style={{width: '100%'}}>
       <Container>
                    <p style={{ color: '#64748B', fontSize: '14px' }}>How much Tokens would you like to buy?</p>
                    <TextField
                      id="has-account"
                      select
                      style={{width: '100%'}}
                      // label="Native select"
                      value={tokenAmount}
                      onChange={e=>setTokenAmount(e.target.value)}
                      variant="outlined"
                    >
                      {tokenRange.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Container>

                  <Container>
                    <p style={{ color: '#64748B', fontSize: '14px' }}>Preferred payment method</p>
                    <TextField
                      id="has-account"
                      select
                      style={{width: '100%'}}
                      // label="Native select"
                      value={paymentMethod}
                      onChange={e=>setPaymentMethod(e.target.value)}
                      variant="outlined"
                    >
                      {paymentMethods.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Container>

                  <Container>
                    <p style={{ color: '#64748B', fontSize: '14px' }}>Are you purchasing privately? </p>
                    <TextField
                      id="has-account"
                      select
                      style={{width: '100%'}}
                      // label="Native select"
                      value={purchaseType}
                      onChange={e=>setPurchaseType(e.target.value)}
                      variant="outlined"
                    >
                      {purchaseTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Container>
    </div>
  )

  const VerifyNumber = (
    <div style={{ marginBottom: "20px" }}>
      <p style={{ fontSize: "15px", color: "#64748B" }}>
        Enter the OTP Verification code we sent to your phone.
      </p>
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
  );

  const Address = (
    <div style={{ marginBottom: "20px" }}>
      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          Address*
        </p>
        <TextField
          id="outlined-address"
          placeholder="add an address"
          // label="Name"
          autoComplete="new-password"
          style={{ width: "100%" }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          State*
        </p>
        <Autocomplete
          value={state}
          style={{ width: "100%" }}
          onChange={(event, newValue) => {
            if (typeof newValue?.name === "string") {
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
            if (typeof option.name === "string") {
              return option.name;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option?.name || "";
          }}
          renderOption={(props, option) => <li {...props}>{option?.name}</li>}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField
              autoComplete="new-password"
              placeholder="select state"
              {...params}
            />
          )}
        />
      </div>

      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          City*
        </p>
        <TextField
          id="outlined-address"
          placeholder="enter city"
          // label="Name"
          autoComplete="new-password"
          style={{ width: "100%" }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          Postal Code
        </p>
        <TextField
          id="outlined-postal"
          placeholder="postal code(optional)"
          // label="Name"
          autoComplete="new-password"
          style={{ width: "100%" }}
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
    </div>
  );
  const handleCurrency = (e, val) => {
    setSupportedCurrencies(val);
  };

  const NeededCurrencies = (
    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
      <p style={{ color: "#64748B", fontSize: "14px" }}>
        Which of these currencies do you need most often? Select up to 5
      </p>
      <ChipSelectorInput
        highlights={[
          { name: "United States Dollar" },
          { name: "Canadian Dollar" },
          { name: "European Euro" },
          { name: "Rwandan Franc" },
        ]}
        allItems={Currencies}
        selected={supportedCurrencies}
        setSelected={setSupportedCurrencies}
        placeholder="Add currency"
      />
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
    </div>
  );

  const NeededCrypto = (
    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
      <p style={{ color: "#64748B", fontSize: "14px" }}>
        Which of these Cryptocurrencies do you need most often? Select up to 5
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

  const handleCountry = (e, val) => {
    setSupportedCountries(val);
  };
  const SupportedCountries = (
    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
      <p style={{ color: "#64748B", fontSize: "14px" }}>
        Which of these countries do you mostly receive international transfers
        from?
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
          { name: "United States" },
          { name: "United Kingdom" },
          { name: "Nigeria" },
          { name: "Canada" },
        ]}
        allItems={Countries}
        selected={supportedCountries}
        setSelected={setSupportedCountries}
        placeholder="Add country"
      />
    </div>
  );

  const Account = (
    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
      <p style={{ color: "#64748B", fontSize: "14px" }}>
        Do you have a bank account?
      </p>
      <TextField
        id="has-account"
        select
        style={{ width: "100%" }}
        // label="Native select"
        value={userHasAccount}
        onChange={(e) => setUserHasAccount(e.target.value)}
        variant="outlined"
      >
        {textBool.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <p style={{ color: "#64748B", fontSize: "14px" }}>
        Do you have a crypto wallet?
      </p>
      <TextField
        id="has-account"
        select
        style={{ width: "100%" }}
        // label="Native select"
        value={userHasCryptoWallet}
        onChange={(e) => setUserHasCryptoWallet(e.target.value)}
        variant="outlined"
      >
        {textBool.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <p style={{ color: "#64748B", fontSize: "14px" }}>
        How do you intend to use poket?
      </p>
      <TextField
        id="has-account"
        select
        style={{ width: "100%" }}
        // label="Native select"
        value={poketUseCase}
        onChange={(e) => setPoketUseCase(e.target.value)}
        variant="outlined"
      >
        {poketUseCases.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );

  const RenderStage = () => {
    if(userDetails?.account == 'personal'){
      switch (step) {
        case 0:
          return AgeRange;
        case 1:
          return Country;
        case 2:
          return Amount;
      }
    }else{
      switch (step) {
        case 0:
          return Country;
        case 1:
          return Amount;
      }
    }
   
  };
  const Prev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  const Next = () => {
    if(userDetails?.account == 'personal'){
      switch (step) {
        case 0:
          SaveProfileStep({ ageRange });
          break;
        case 1:
          if(!state || address.length < 5 || !city){
            return Notifier('All fields are required', 'warning');
          }
          // setStep(step + 1);
          SaveProfileStep({
            countryOfResidence: countryOfResidence.name,
            state: state.name,
            address,
            city,
            postalCode
          });
          break;
      }
    }else{
      switch (step) {
        case 0:
          if(!state || address.length < 5 || !city){
            return Notifier('All fields are required', 'warning');
          }
          // setStep(step + 1);
          SaveProfileStep({
            countryOfResidence: countryOfResidence.name,
            state: state.name,
            address,
            city,
            postalCode
          });
          break;
      }
    }
    
  };

  const verifyOtp = () => {
    setStep(step + 1);
  };

  const SaveProfileStep = async (data) => {
    try {
      setSaving(true);
      const res = await saveAcccountDetails({...data, whitelistStep: step + 1});
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

  const SaveInfo = async () => {
    let data = {
      firstName,
      lastName,
      dateOfBirth: format(parseISO(dob.toISOString()), "dd LLL, yyyy"),
      countryOfResidence: countryOfResidence.name,
      countryOfCitizenship: countryOfCitizenship.name,
      phone,
      address,
      state: state.name,
      city,
      postalCode,
      supportedCurrencies,
      supportedCountries,
      userHasValidBankAccount: userHasAccount,
      userHasCryptoWallet: userHasCryptoWallet,
      intendedUsageOfPoket: poketUseCase,
      isProfileSet: true,
    };
    try {
      setSaving(true);
      const res = await saveAcccountDetails(data);
      if (res.status == 200) {
        setSaving(false);
        setUserDetails(res.user);
        Notifier(res.message, "success");
        // showProfile(false)
      } else {
        setSaving(false);
        Notifier(res.message, "error");
      }
    } catch (err) {
      setSaving(false);
      ErrorHandler(err, navigate, setAuth);
    }
  };

  const applyForWhitelist=async()=>{
    try{
      setSaving(true)
      track("applied for whitelisting", { userId: userDetails?._id, email: userDetails?.email, accountType: userDetails?.account })
      const res = await WhitelistAccount(tokenAmount, paymentMethod, purchaseType);
      if(res.status == 200){
        track("successful whitelist application", { userId: userDetails?._id, email: userDetails?.email, accountType: userDetails?.account })
        SaveProfileStep({
          referralPoints: userDetails?.referralPoints + 20000, 
        });
        showWhitelist(false)
        showWhitelistSuccess(true)
        setSaving(false)
        setUserDetails(res.user);
        Notifier('Thanks for applying for our whitelisting!', 'success')
      }else{
        track("failed whitelist application", { userId: userDetails?._id, email: userDetails?.email, accountType: userDetails?.account }, true)
        setSaving(false)
        Notifier(res.message || 'Something went wrong, please try again.', 'error')
      }
    }catch(err){
      track("failed whitelist application", { userId: userDetails?._id, email: userDetails?.email, accountType: userDetails?.account }, true)
      setSaving(false)
      ErrorHandler(err, navigate, setAuth)
    }
  }

  return (
    <>
    <Modal modal={whitelist} showModal={showWhitelist}>
      <main className={styles.container}>
        {step !== 2 && (
          <div style={{width: '80%'}}>
            <p style={{fontSize: '14px', fontWeight: 'bold', color: '#16A34A'}}>+10,000 points!</p>
          </div>
        )}
     
        <div className={styles.header}>
          {step > 0 && (
            <span style={{ cursor: "pointer" }} onClick={() => Prev()}>
              <BsArrowLeft size={25} />
            </span>
          )}
          <ModalProgress length={userDetails?.account == 'personal'? 3:2} current={step} setStep={setStep} />
          <span
            onClick={() => showWhitelist(false)}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="clarity:times-line" height={25} width={25} />
          </span>
        </div>
        <div className={styles.main}>
          <h3>Get Whitelisted</h3>
          <p style={{fontSize: '14px'}}>Learn more about our tokens, presale event and whitelisting your account <a style={{color: '#0099D6', textDecoration: 'none'}} href="">here</a>.</p>
          {RenderStage()}
          <>
            {userDetails?.account == 'personal'? (
                <>
              {/* // PERSONAL ACCCOUNT */}

                  {step !== 2 ? (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onClick={() => showWhitelist(false)}
                        text="Close"
                        width="48%"
                        textSize="14px"
                        height="58px"
                        textColor="black"
                        bgColor="transparent"
                        style={{ border: ".5px solid #CBD5E1" }}
                      />
                        <Button
                          loading={saving}
                          disabled={saving}
                          onClick={() => Next()}
                          text="Next"
                          width="48%"
                          textSize="14px"
                          height="58px"
                          bgColor="#0099D6"
                        />
                    </div>
                  ) : (
                      <Button
                        onClick={() => applyForWhitelist()}
                        loading={saving}
                        disabled={saving}
                        text="Apply for whitelisting"
                        width="100%"
                        height="58px"
                        bgColor="#0099D6"
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                      />
                  )}
                </>
            ):(
              // BUSINESS ACCCOUNT
              <>
                {step !== 1 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => showWhitelist(false)}
                text="Close"
                width="48%"
                textSize="14px"
                height="58px"
                textColor="black"
                bgColor="transparent"
                style={{ border: ".5px solid #CBD5E1" }}
              />
                <Button
                  loading={saving}
                  disabled={saving}
                  onClick={() => Next()}
                  text="Next"
                  width="48%"
                  textSize="14px"
                  height="58px"
                  bgColor="#0099D6"
                />
            </div>
          ) : (
              <Button
                onClick={() => applyForWhitelist()}
                loading={saving}
                disabled={saving}
                text="Apply for whitelisting"
                width="100%"
                height="58px"
                bgColor="#0099D6"
                style={{ marginTop: '20px', marginBottom: '20px' }}
              />
          )}
              </>
            )}
          </>
          
        </div>
      </main>
    </Modal>
    </>
  );
}

export default Perosonal;

