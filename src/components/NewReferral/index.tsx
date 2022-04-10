import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import { AuthContext } from "../../contexts/authContextApi";
import { ToastContainer } from "react-toastify";
import styles from "./styles.module.css";
import { GeneralContext } from "../../contexts/generalContextApi";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { TextField } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import Divider from "../Divider";
import Links from "../../components/Links";
import { sendInvites } from "../../components/api/routes";
import { Notifier } from "../../components/Notifier";
import { useNavigate } from "react-router-dom";
import { ErrorHandler } from "../../helpers/Errorhandler";
import Validator from "../../utils/validator";
import { HiOutlineTrash } from 'react-icons/hi'
import { Icon } from "@iconify/react";


function NewReferral() {
  const { newReferral, showNewReferral, GetReferrals } = useContext(GeneralContext);
  const { auth, setAuth, userDetails, setUserDetails }: any =
    useContext(AuthContext);
  const [selectedAccount, setSelectedAccount] = useState("personal");

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [invitees, setInvitees] = useState<any>([]);
  const [modal, showModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [addBtnDisabled, setAddBtnDisabled] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (invitees.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [invitees]);

  const handleClose = () => showModal(false);

  const addInvitee = () => {
    if (name && email) {
      setInvitees((prev: any) => {
        var checkEmail = prev.find(
          (invite: any) => invite.email == email.trim()
        );
        if (checkEmail) {
          setName("");
          setEmail("");
          return [...prev];
        } else {
          return [
            ...prev,
            { id: uuid(), name: name.trim(), email: email.trim() },
          ];
        }
      });
      setName("");
      setEmail("");
    } else {
      setMessage("both fields are required");
      setTimeout(() => {
        setMessage("");
      }, 2500);
    }
  };

  const removeItem = (id: string) => {
    var filtered = invitees.filter((invitee: any) => invitee.id !== id);
    setInvitees(filtered);
  };

  const sendReferral = async () => {
    setLoading(true);
    try {
      const res = await sendInvites(userDetails.email, invitees);
      if (res.status == 200) {
        GetReferrals(userDetails?.email, navigate, setAuth);
        setLoading(false);
        setName("");
        setEmail("");
        setInvitees([]);
        setStep(1)
        setAddBtnDisabled(true);
      } else {
        setLoading(false);
        Notifier(res.message, "error");
      }
    } catch (err) {
      setLoading(false);
      ErrorHandler(err, navigate, setAuth);
    }
  };

  useEffect(() => {
    if (email.length > 5) {
      if (email.length > 5 && !Validator.validateEmail(email)) {
        setAddBtnDisabled(true);
        setMessage("enter a valid email address");
      } else {
        setMessage("");
        setAddBtnDisabled(false);
      }
    } else {
      setAddBtnDisabled(true);
    }
  }, [email]);

  return (
    <>
      
      <Modal modal={newReferral} showModal={showNewReferral} backdropClose>
        <>
        {
          step == 0 && (
          <main className={styles.container}>
          <div className={styles.header}>
            <h2>New Referral</h2>
            <span style={{cursor: 'pointer'}} onClick={()=>showNewReferral(false)}>
              <Icon icon="clarity:times-line" height={25} width={25} />
            </span>
          </div>
          <div className={styles.main}>
            <p
              style={{
                color: "#64748B",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              You earn <span style={{ color: "#0099D6" }}>10,000 points</span>{" "}
              for every individual referral and{" "}
              <span style={{ color: "#0099D6" }}>20,000 points</span> for
              Business referrals
            </p>
            <div className={styles.referral_form}>
              <div className={styles.form}>
                <Links />
                {/* {invitees.length > 0 && (
                  <p
                    style={{ margin: 0, marginTop: '10px', fontSize: "13px", color: '#64748B', fontWeight: "bold" }}
                  >
                    Send Invite To
                  </p>
                )} */}
                <div style={{ width: "100%", marginTop: "15px" }}>
                  {invitees.map((invitee: any) => (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        marginBottom: "10px",
                        padding: 0,
                        flexWrap: "wrap",
                        wordBreak: "break-all",
                        paddingBottom: "0px",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                      key={invitee.id}
                    >
                      <div>
                        <p style={{ margin: 0, fontSize: "14px", color: '#94A3B8' }}>{invitee.name.length > 30? invitee.name.substring(0,27)+'...' : invitee.name}</p>
                        <p style={{ margin: 0, fontSize: "14px", color: '#94A3B8' }}>{invitee.email.length > 30? invitee.email.substring(0,27)+'...' : invitee.email}</p>
                      </div>
                      <span style={{cursor: 'pointer'}} onClick={() => removeItem(invitee.id)}>
                        <HiOutlineTrash color="#94A3B8" />
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <p>Name</p>
                    <TextField
                      placeholder="Invitee’s name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <p>Email address</p>
                    <TextField
                      placeholder="Invitee’s email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                {message ? (
                  <span
                    style={{
                      color: "tomato",
                      fontSize: "13px",
                      marginTop: "5px",
                    }}
                  >
                    {message}
                  </span>
                ) : null}
                {!addBtnDisabled && (
                  <p
                    onClick={() => addInvitee()}
                    style={{
                      color: '#4576C2',
                      fontSize: "14px",
                      cursor: "pointer",
                      textAlign: 'center'
                    }}
                  >
                    + Add new referral
                  </p>
                )}
                <div style={{ marginTop: "30px", width: "100%" }}>
                  <Button
                    loading={loading}
                    onClick={() => sendReferral()}
                    disabled={btnDisabled || loading}
                    bgColor="#00AFF5"
                    height="60px"
                    width="100%"
                    text="Send Invitation"
                    iconUri="/arrow-right.png"
                  />
                </div>
              </div>
            </div>
          </div>
          </main>
          )
        }
        {step == 1 && (
          <main className={styles.feed_back}>
            <div className={styles.main}>
              <h2 style={{ fontSize: '15px', textAlign: 'center' }}>Your Invitation was sent succesfully!</h2>
              <div style={{ marginTop: "30px", width: "100%" }}>
                <Button
                  onClick={() => {setStep(0); showNewReferral(false)}}
                  bgColor="#00AFF5"
                  height="60px"
                  width="100%"
                  text="Okay"
                />
              </div>
            </div>
          </main>
        )}
        </>
      </Modal>
    </>
  );
}

export default NewReferral;
