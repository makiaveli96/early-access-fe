import React, { useContext, useState, useEffect } from "react";
import styles from "./styles.module.css";
import styled from "styled-components";
import { AuthContext } from "../../contexts/authContextApi";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdRefresh } from "react-icons/md";
import Divider from "../../components/Divider";
import { format, parseISO } from "date-fns";
import { getUserActivity } from '../../components/api/routes'
import { GeneralContext } from "../../contexts/generalContextApi";
import { ErrorHandler } from "../../helpers/Errorhandler";
import { BsArrowCounterclockwise } from 'react-icons/bs'

function PointBalance() {
  const { auth, setAuth, userDetails, setUserDetails }: any =
    useContext(AuthContext);
  const { _referrals } = useContext(GeneralContext)

  const totalEarnablePoints = 1000000;
  function getPercentage() {
    const percent = (userDetails?.referralPoints / totalEarnablePoints) * 100;
    return percent;
  }

  const [activity, setActivity] = useState("none");
  const [activityData, setActivityData] = useState([]);
  const [fetchingActivity, setFetchingActivity] = useState(false)
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [refs, setRefs] = useState([]);
  const referrals: Array<{ time: string; points: string }> = [];
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    border: "0px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 446,
    height: "auto",
    paddingTop: "30px",
    paddingBottom: "30px",
    maxWidth: "85%",
    bgcolor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    textAlign: "center",
  };

  useEffect(() => {
    // userDetails.businessReferrals.forEach((ref) => {
    //   referrals.push({ time: ref?.time, points: "+20000" });
    // });
    // userDetails.referrals.forEach((ref) => {
    //   referrals.push({ time: ref?.time, points: "+10000" });
    // });
    _referrals.sort(function (a, b) {
      return new Date(b.time).valueOf() - new Date(a.time).valueOf();
    });
    setRefs(_referrals);
  }, []);

  async function GetUserActivity(){
    try{
      setFetchingActivity(true)
      const res = await getUserActivity();
      if(res.status == 200){
        const _activity = res.activity
        _activity.sort(function (a, b) {
          return new Date(b.time).valueOf() - new Date(a.time).valueOf();
        });
        setActivityData(_activity)
        setFetchingActivity(false)
      }else{
        setFetchingActivity(false)
      }
    }catch(err){
      setFetchingActivity(false)
      ErrorHandler(err, navigate, setAuth)
    }
  }

  useEffect(()=>{
    GetUserActivity();
  },[])

  const toggleActivity = () => {
    if (activity == "none") {
      setActivity("flex");
    } else {
      setActivity("none");
    }
  };

  return (
    <div className={styles.main}>
      <div
        style={{
          height: "10px",
          width: "100%",
          backgroundColor: "#00668F",
        }}
      >
        <div
          style={{
            height: "10px",
            width: `${getPercentage()}%`,
            backgroundColor: "#F57A00",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "15px",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{ color: "#002C3D", fontSize: "11.5px", marginBottom: "5px", display: 'flex', alignItems: 'center' }}
        >
          Earned<div style={{height: '4px', width: '4px', marginLeft: '3px', backgroundColor: '#5CD1FF'}} />
        </span>
        <span
          style={{ color: "#002C3D", fontSize: "11.5px", marginBottom: "5px", display: 'flex', alignItems: 'center' }}
        >
          Points Left<div style={{height: '4px', width: '4px', marginLeft: '3px', backgroundColor: '#002C3D'}} />
        </span>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{ fontWeight: "lighter", fontSize: "13px", color: "#002C3D" }}
        >
          {formatCurrency(userDetails?.referralPoints)} pts
        </span>
        <span
          style={{ fontWeight: "lighter", fontSize: "13px", color: "#002C3D" }}
        >
          {formatCurrency(
            (totalEarnablePoints - userDetails?.referralPoints).toString()
          )}{" "}
          pts
        </span>
      </div>
      <div style={{display: 'flex', width: '100%', alignItems: 'center', marginTop: '10px', justifyContent: 'space-between'}}>
        <p
          onClick={() => toggleActivity()}
          style={{
            color: "#0099D6",
            cursor: "pointer",
            display: "flex",
            userSelect: "none",
            alignItems: "center",
            margin: 0,
            fontSize: '13.5px',
            fontWeight: "bold",
            marginTop: "15px",
            marginBottom: "10px",
          }}
        >
          See Activity
          {activity == "none" ? (
            <MdKeyboardArrowDown size={20} />
          ) : (
            <MdKeyboardArrowUp size={20} />
          )}
        </p>
        {activity == "none" ? (
          <span />
        ):(
          <MdRefresh size={22} title="refresh" color="#002C3D" className={fetchingActivity? styles.spin2 : ''} onClick={()=>GetUserActivity()} style={{cursor: 'pointer'}} />
        )}
      </div>
     
      <div style={{ display: activity }} className={styles.activity}>
        {activityData
          .length == 0 && (
          <div style={{ width: "100%", marginBottom: "10px" }}>
            <p
              style={{
                textAlign: "center",
                margin: 0,
                fontSize: "13px",
                color: "#B3BCCE",
              }}
            >
              No recent Activity
            </p>
          </div>
        )}
        {activityData.map((activity, i) => (
          // <>
                  <div style={{ width: "100%" }} key={i}>
                  <Divider type="dashed" width="100%" />
                  <div className={styles.activity__item}>
                    <div>
                      <p
                       title={activity.message}
                        style={{
                          color: "#231712",
                          margin: 0,
                          fontWeight: "400",
                          fontSize: "13px",
                        }}
                      >
                        {activity.message.length > 30? activity.message.substring(0,27)+'...':activity.message}
                      </p>
                      {activity?.time && (
                        <p
                          style={{
                            color: "#B3BCCE",
                            margin: 0,
                            fontSize: "12px",
                          }}
                        >
                          {format(parseISO(activity?.time), "LLL, dd, yyyy")}
                        </p>
                      )}
                    </div>
                    <span className={styles.activity_points}>
                      {activity.points}
                    </span>
                  </div>
                </div>
          
        ))}
      </div>
    </div>
  );
}

export default PointBalance;
