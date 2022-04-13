import React, { useState, useContext, useEffect, useReducer, useRef } from "react";
import { AuthContext } from "../../contexts/authContextApi";
import { GeneralContext } from "../../contexts/generalContextApi";
import styles from "./styles.module.css";
import { Icon } from "@iconify/react";



function AccountProgress() {
  const { userDetails } = useContext(AuthContext);
  const { showWhitelist, showNewReferral, showProfile, showVerifyEmail, showPhoneModal } = useContext(GeneralContext)
  const [display, setDisplay] = useState('none')
  const [current, setCurrent] = useState(0)


  // const progress = []

  // useEffect(()=>{
  //   if(!userDetails?.isEmailVerified){
  //     progress.push({ value: 'Verify email address' })
  //   }
  //   if(!userDetails?.isProfileSet){
  //     progress.push({ value: 'Setup profile' })
  //   }
  //   if(!userDetails?.isReferralSent){
  //     progress.push({ value: 'Make a referral' })
  //   }
  //   if(!userDetails?.isPhoneVerified){
  //     progress.push({ value: 'Verify phone number' })
  //   }
  //   if(!userDetails?.isWhitelisted){
  //     progress.push({ value: 'Get whitelisted' })
  //   }
  // },[])

  const progress = [
    { value: 'Verify email address', val: userDetails?.isEmailVerified, action: showVerifyEmail},
    { value: 'Setup profile', val: userDetails?.isProfileSet, action: showProfile},
    { value: 'Make a referral', val: userDetails?.isReferralSent, action: showNewReferral},
    { value: 'Verify phone number', val: userDetails?.isPhoneVerified, action: showPhoneModal},
    { value: 'Get whitelisted', val: userDetails?.isWhitelisted, action: showWhitelist},
  ]
  const _progress = progress.sort(function(a,b){return b.val-a.val});
  console.log(_progress, ' progresss')

  const progressValues = [
    { val: userDetails?.isEmailVerified },
    { val: userDetails?.isProfileSet },
    { val: userDetails?.isReferralSent },
    { val: userDetails?.isPhoneVerified },
    { val: userDetails?.isWhitelisted },
  ]

  useEffect(()=>{
    for(var i = 0; i < _progress.length; i++){
      if(_progress[i].val !== true){
        setCurrent(i);
        break;
      }
    }
  },[userDetails])

  useEffect(()=>{
    const findActive = progress.find(item=>item.val == false);
    if(findActive){
      setDisplay('flex')
    }else{
      setDisplay('none')
    }
  },[userDetails])

  function getClickActionWithIndex(index){
    if(index == 0){
      showVerifyEmail(true)
    }
    if(index == 1){
      showProfile(true)
    }
    if(index == 2){
      showNewReferral(true)
    }
    if(index == 3){
      showPhoneModal(true)
    }
    if(index == 4){
      showWhitelist(true)
    }
  }

  function getScrollTo(ref){
    ref.current.scrollToView()
  }
  const ref: React.MutableRefObject<HTMLInputElement | undefined> = useRef()

  const Stages = ({ index, check, text, action }:{index: number, check: boolean, text: string, action: ()=>void}) => {
    
    if(current == index){
      console.log(ref, ' re--ference')
      // ref.current?.scrollIntoView()
      ref.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }

    return (
      <>
        {!check ? (
          <>
          {current == index ? (
            <>
            {/* {ref.current.scrollLeft = 20} */}
            {/* <main onClick={()=>{setCurrent(index); getClickActionWithIndex(index); }} style={{cursor: 'pointer'}} className={styles.main}> */}
            <main ref={ref} onClick={()=>{setCurrent(index); action();}} style={{cursor: 'pointer'}} className={styles.main}>
              <span className={styles.indicator_container}>
                <span className={styles.indicator__active}>
                  <span className={styles.indicator__child}></span>
                </span>
                <span className={styles.indicator_line} />
              </span>
              <p>{text}
              </p>
            </main>
            </>
          ):(
            <>
            <main className={styles.main}>
            <span className={styles.indicator_container}>
              <span className={styles.indicator} />
              <span className={styles.indicator_line} />
            </span>
            <p>
             {text}
            </p>
          </main>
          </>
          )}
           
          </>
        ) : (
          <>
            <main className={styles.main}>
              <span className={styles.indicator_container}>
                <span className={styles.indicator__done}>
                  <Icon
                    icon="bx:check"
                    width="30px"
                    height="30px"
                    color="white"
                  />
                </span>
                <span className={styles.indicator_line__done} />
              </span>
              <p>
              {text}
              </p>
            </main>
          </>
        )}
      </>
    );
  };

  const CreateProfile = () => {
    return (
      <main className={styles.main}>
        <span className={styles.indicator_container}>
          <span className={styles.indicator}>
            <span className={styles.indicator__child} />
          </span>
          <span className={styles.indicator_line}></span>
        </span>
        <p>
          Set up your <br />
          profile
        </p>
      </main>
    );
  };

  const MakeReferral = () => {
    return (
      <main className={styles.main}>
        <span className={styles.indicator_container}>
          <span className={styles.indicator}>
            <span className={styles.indicator__child}></span>
          </span>
          <span className={styles.indicator_line}></span>
        </span>
        <p>
          Make a referral <br />
          <span style={{ visibility: "hidden" }}>lorem</span>
        </p>
      </main>
    );
  };

  const VerifyPhone = () => {
    return (
      <main className={styles.main}>
        <span className={styles.indicator_container}>
          <span className={styles.indicator}>
            <span className={styles.indicator__child}></span>
          </span>
          <span className={styles.indicator_line}></span>
        </span>
        <p>
          Verify your <br />
          phone number
        </p>
      </main>
    );
  };

  const GetWhitelisted = () => {
    return (
      <main className={styles.main}>
        <span className={styles.indicator_container}>
          <span className={styles.indicator}>
            <span className={styles.indicator__child}></span>
          </span>
          <span className={styles.indicator_line}></span>
        </span>
        <p>
          Get <br />
          Whitelisted
        </p>
      </main>
    );
  };

  function RenderState(index) {}


  function getConditionWithIndex(index){
    const found = _progress.find((item, i)=>i == index)
    return found.val
    // if(index == 0){
    //   return userDetails?.isEmailVerified
    // }
    // if(index == 1){
    //   return userDetails?.isProfileSet
    // }
    // if(index == 2){
    //   return userDetails?.referralSent
    // }
    // if(index == 3){
    //   return userDetails?.isPhoneVerified
    // }
    // if(index == 4){
    //   return userDetails?.isWhitelisted
    // }
  }

  // const ref: React.MutableRefObject<HTMLInputElement | undefined> = useRef()
  // ref.current?.scrollIntoView()
  

  // useEffect(()=>{
  // })

  return (
    <div style={{display}} className={styles.parent_container}>
      <div className={styles.info}>
        <h3>Get the most out of your Early Access</h3>
        <p style={{fontSize: '15px', lineHeight: '22.5px', margin: 0}}>Complete these steps and earn up to <br /><span style={{color: '#0099D6'}}>100,000 reward points!</span></p>
      </div>
      <main className={styles.container}>
      {_progress.map((item, i)=>(
        // <div ref={ref}>
        <Stages index={i} check={getConditionWithIndex(i)} text={item.value} action={()=>item.action(true)} />
        // </div>
      ))}
      {/* {Array.from(Array(5)).map((item, i) => (
        <VerifyEmail index={i} check={getConditionWithIndex(i)}  />
        // <>
        //   {i == 0 && <VerifyEmail />}
        //   {i == 1 && <CreateProfile />}
        //   {i == 2 && <MakeReferral />}
        //   {i == 3 && <VerifyPhone />}
        //   {i == 4 && <GetWhitelisted />}
        // </>

        // <span className={styles.indicator_container}>
        //   {i == 2? (
        //     <>
        //     <span className={styles.indicator__done}></span>
        //     <span className={styles.indicator_line}></span>
        //     </>
        //   ):(
        //     <>
        //     <span className={styles.indicator}>
        //     <span className={styles.indicator__child}>

        //     </span>
        //   </span>
        //   <span className={styles.indicator_line}></span>
        //   </>
        //   )}

        // </span>
      ))} */}
    </main>
    </div>

  );
}

export default AccountProgress;
