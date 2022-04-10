import React, { useState, useContext, useEffect } from "react";
import { CircularProgress, TextField } from "@mui/material";
import {
  ConfirmEmailToken,
  CreatePassword as _CreatePassword,
} from "../../components/api/routes";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContextApi";
import { ToastContainer } from "react-toastify";
import Countries from "../../utils/countries-states";
import styles from "./styles.module.css";
import { ErrorHandler } from "../../helpers/Errorhandler";
import HomeNavbar from "../../components/HomeNavbar";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import { Icon } from "@iconify/react";
import { Notifier } from "../../components/Notifier";

function Notification() {
  return (
    <div className={styles.notification}>
      <span style={{ fontSize: "14px" }}>
        Your email address was verified successfully!
      </span>
    </div>
  );
}

function CreatePassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [token, setToken] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth, setUserDetails }: any = useContext(AuthContext);
  const [verificationNotfi, showVerificationNotif] = useState(false);
  const [isToken, setIsToken] = useState(true);

  function displayVerificationNotif() {
    showVerificationNotif(true);
    setTimeout(() => {
      showVerificationNotif(false);
    }, 3000);
  }

  async function ValidateEmailToken() {
    if (searchParams.get("token")) {
      const res = await ConfirmEmailToken(searchParams.get("token"));
      setToken(searchParams.get("token"));
      if (res.status == 200) {
        setEmail(res.data.email);
        setType(res.data.accountType);
        // displayVerificationNotif();
        console.log(res, " token res");
        setIsToken(true);
      } else {
        setIsToken(false);
      }
    } else {
      setIsToken(false);
    }
  }

  const createPassword = async () => {
    if (password == password2) {
      setLoading(true);
      const res = await _CreatePassword(email, type, password);
      if (res.status == 200) {
        setLoading(false);
        setAuth(true);
        setUserDetails(res.user);
        localStorage.setItem("_EA_TOKEN", res.token);
        navigate("/home");
      } else {
        setLoading(false);
        Notifier(res.message, "error");
      }
    } else {
      Notifier("Password mismatch, check your password and try again", "warn");
    }
  };

  useEffect(() => {
    ValidateEmailToken();
  }, []);

  useEffect(() => {
    if (password.length > 5 && password2.length > 5) {
      if (password == password2) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    } else {
      setBtnDisabled(true);
    }
  }, [password, password2]);

  return (
    <>
      {isToken ? (
        <>
          <ToastContainer />
          <HomeNavbar />
          <div className={styles.container}>
            <div className={styles.form}>
              {verificationNotfi && <Notification />}
              <h1>Create your password.</h1>
              <div style={{ width: "100%" }}>
                <p
                  style={{
                    marginBottom: "6px",
                    color: "#002C3D",
                    fontWeight: "500",
                  }}
                >
                  Password
                </p>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", backgroundColor: "white" }}
                  type="password"
                  placeholder="Create a password for your account"
                />
              </div>
              <div style={{ width: "100%" }}>
                <p
                  style={{
                    marginBottom: "6px",
                    color: "#002C3D",
                    fontWeight: "500",
                  }}
                >
                  Confirm password
                </p>
                <TextField
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  style={{ width: "100%", backgroundColor: "white" }}
                  type="password"
                  placeholder="Re-enter password"
                />
              </div>
              <p style={{ fontSize: "13px", color: "red" }}>{msg}</p>
              <br/>
              <Button
                disabled={btnDisabled ? true : loading}
                onClick={() => createPassword()}
                width="100%"
                height="60px"
                loading={loading}
                bgColor="#00AFF5"
                textColor="white"
                text="SIGN IN"
                // iconUri="/arrow-right.png"
              />
              {/* <img src="/pic-grouped.png" style={{width: '250px', marginTop: '20px'}} /> */}
              {/* <p style={{color: '#002C3D'}}>Stay up to date with new products, features and launch dates. Receive 500 points for every individual referral and 1,500 points for Business referrals.</p> */}
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon icon="bxs:error" color="#00aff5" height="100" />
          <p style={{ color: "#002C3D", fontSize: "20px", fontWeight: "400" }}>
            Invalid or Expired token.{" "}
            <span
              onClick={() => navigate("/")}
              style={{ color: "#00aff5", cursor: "pointer" }}
            >
              Home
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default CreatePassword;
