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
  saveAcccountDetails,
} from "../../components/api/routes";
import { ErrorHandler } from "../../helpers/Errorhandler";
import { useNavigate } from "react-router-dom";
import ModalProgress from "../ModalProgress";
import OtpInput from "../../components/OtpInput";
import ChipSelectorInput from "../ChipSelectorInput";

function Perosonal() {
  const navigate = useNavigate();
  const { showProfile, showUploadImage }: any = useContext(GeneralContext);
  const { auth, setAuth, userDetails, setUserDetails }: any =
    useContext(AuthContext);
  const [selectedAccount, setSelectedAccount] = useState("personal");
  const [step, setStep] = useState(userDetails?.profileStep || 0);
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
  const [states, setStates] = useState<any>([]);
  const [userCountry, setUserCountry] = useState(userDetails?.contry);
  const [userState, setUserState] = useState(userDetails?.state);
  const [phone, setPhone] = useState("");

  const [otpCode, setOtpCode] = useState("");

  const [address, setAddress] = useState("");
  const [state, setState] = useState<any | null>(null);
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

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

  const Name = (
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <p style={{ color: "#64748B", fontSize: "15px", lineHeight: "30px" }}>
        Please make sure your name matches the details on your ID Documents
      </p>
      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          First Name
        </p>
        <TextField
          id="outlined-fname"
          // label="Name"
          autoComplete="new-password"
          placeholder="Jonh"
          helperText="please enter a valid firstname"
          style={{ width: "100%" }}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          Last Name
        </p>
        <TextField
          id="outlined-lname"
          // label="Name"
          placeholder="Doe"
          helperText="please enter a valid lastname"
          autoComplete="new-password"
          style={{ width: "100%" }}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#64748B" }}>
          Country of Citizenship*
        </p>
        <Autocomplete
          value={countryOfCitizenship}
          style={{ width: "100%" }}
          onChange={(event, newValue) => {
            if (typeof newValue["name"] === "string") {
              setCountryOfCitizenship(newValue);
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              // setCountry(newValue);
            } else {
              setCountryOfCitizenship(newValue);
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
    switch (step) {
      // case 0: return AccountType;
      case 0:
        return Name;
      // case 1:
        // return Country;
      // case 2: return VerifyNumber;
      // case 3: return Address;
      case 1:
        return Account;
      case 2:
        return NeededCurrencies;
      case 3:
        return NeededCrypto;
      case 4:
        return SupportedCountries;
    }
  };
  const Prev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  const Next = () => {
    switch (step) {
      case 0:
        if (!firstName || !lastName) {
          return Notifier("firstname and lastname are required", "warning");
        }
        SaveProfileStep({ firstName, lastName, countryOfCitizenship: countryOfCitizenship.name, });
        // setStep(step + 1);
        break;
      // case 1:
      //   // if(phone.length < 5){
      //   //   return Notifier('enter a valid phone number', 'warning');
      //   // }
      //   // setStep(step + 1);
      //   SaveProfileStep({
      //     countryOfResidence: countryOfResidence.name,
          
      //   });
      //   break;
      case 1:
        // if(address.length < 5 || !state || city.length < 4){
        //   return Notifier('all fields are required', 'warning');
        // }
        // SaveProfileStep({ address })
        SaveProfileStep({
          userHasValidBankAccount: userHasAccount,
          userHasCryptoWallet: userHasCryptoWallet,
          intendedUsageOfPoket: poketUseCase,
        });
        // setStep(step + 1);
        break;
      case 2:
        if (supportedCurrencies.length < 3) {
          return Notifier("select at least 3 currencies", "warning");
        }
        // setStep(step + 1);
        SaveProfileStep({ supportedCurrencies })
        break;
      case 3:
        if (supportedCrypto.length < 3) {
          return Notifier("select at least 3 cryptocurrencies", "warning");
        }
        // setStep(step + 1);
        SaveProfileStep({ supportedCrypto })

        break;
      case 4:
        if (supportedCountries.length < 3) {
          return Notifier("select at least 3 countries", "warning");
        }
        // setStep(step + 1);
        SaveProfileStep({ supportedCountries, referralPoints: userDetails?.referralPoints + 6000, isProfileSet: true })
        showProfile(false)
        showUploadImage(true)
        break;
    }
  };

  const verifyOtp = () => {
    setStep(step + 1);
  };

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

  return (
    <>
      <main className={styles.container}>
        <div style={{width: '80%'}}>
          <p style={{fontSize: '14px', fontWeight: 'bold', color: '#16A34A'}}>+1000 points</p>
        </div>
        <div className={styles.header}>
          {step > 0 && (
            <span style={{ cursor: "pointer" }} onClick={() => Prev()}>
              <BsArrowLeft size={25} />
            </span>
          )}
          <ModalProgress length={6} current={step} setStep={setStep} />
          <span
            onClick={() => showProfile(false)}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="clarity:times-line" height={25} width={25} />
          </span>
        </div>
        <div className={styles.main}>
          <p>Set up your profile</p>
          {RenderStage()}
          {/* {step !== 2 ? ( */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => showProfile(false)}
                text="Close"
                width="48%"
                textSize="14px"
                height="58px"
                textColor="black"
                bgColor="transparent"
                style={{ border: ".5px solid #CBD5E1" }}
              />
              {/* {step == 6 ? (
                <Button
                  loading={saving}
                  disabled={saving}
                  onClick={() => SaveInfo()}
                  text="Save"
                  textSize="14px"
                  width="48%"
                  height="58px"
                  bgColor="#0099D6"
                />
              ) : ( */}
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
              {/* )} */}
            </div>
          {/* ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => setStep(step + 1)}
                text="Skip"
                width="48%"
                textSize="14px"
                height="58px"
                textColor="black"
                bgColor="transparent"
                style={{ border: ".5px solid #CBD5E1" }}
              />
              <Button
                onClick={() => verifyOtp()}
                text="Verify"
                width="48%"
                height="58px"
                bgColor="#0099D6"
              />
            </div>
          )} */}
        </div>
      </main>
    </>
  );
}

export default Perosonal;
