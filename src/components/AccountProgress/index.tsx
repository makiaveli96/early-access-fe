import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { AuthContext } from "../../contexts/authContextApi";
import { GeneralContext } from "../../contexts/generalContextApi";
import styles from "./styles.module.css";
import { Icon } from "@iconify/react";

function AccountProgress() {
  const { userDetails } = useContext(AuthContext);
  const {
    showWhitelist,
    showNewReferral,
    showProfile,
    showVerifyEmail,
    showPhoneModal,
  } = useContext(GeneralContext);
  const [display, setDisplay] = useState("none");
  const [current, setCurrent] = useState(0);

  const progress = [
    {
      value: "Verify email address",
      val: userDetails?.isEmailVerified,
      action: showVerifyEmail,
    },
    {
      value: "Setup profile",
      val: userDetails?.isProfileSet,
      action: showProfile,
    },
    {
      value: "Make a referral",
      val: userDetails?.isReferralSent,
      action: showNewReferral,
    },
    {
      value: "Verify phone number",
      val: userDetails?.isPhoneVerified,
      action: showPhoneModal,
    },
    {
      value: "Get whitelisted",
      val: userDetails?.isWhitelisted,
      action: showWhitelist,
    },
  ];
  const _progress = progress.sort(function (a, b) {
    return b.val - a.val;
  });

  const progressValues = [
    { val: userDetails?.isEmailVerified },
    { val: userDetails?.isProfileSet },
    { val: userDetails?.isReferralSent },
    { val: userDetails?.isPhoneVerified },
    { val: userDetails?.isWhitelisted },
  ];

  useEffect(() => {
    for (var i = 0; i < _progress.length; i++) {
      if (_progress[i].val !== true) {
        setCurrent(i);
        break;
      }
    }
  }, [userDetails]);

  useEffect(() => {
    const findActive = progress.find((item) => item.val == false);
    if (findActive) {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  }, [userDetails]);

  function getClickActionWithIndex(index) {
    if (index == 0) {
      showVerifyEmail(true);
    }
    if (index == 1) {
      showProfile(true);
    }
    if (index == 2) {
      showNewReferral(true);
    }
    if (index == 3) {
      showPhoneModal(true);
    }
    if (index == 4) {
      showWhitelist(true);
    }
  }

  function getScrollTo(ref) {
    ref.current.scrollToView();
  }
  const ref: React.MutableRefObject<HTMLInputElement | undefined> = useRef();

  const Stages = ({
    index,
    check,
    text,
    action,
  }: {
    index: number;
    check: boolean;
    text: string;
    action: () => void;
  }) => {
    if (current == index) {
      // console.log(ref, " re--ference");
      // ref.current?.scrollIntoView()
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }

    return (
      <>
          {/* CHECKS THE STATE OF UNCOMPLETED ITEMS */}
        {!check ? (
          <>
          {/* DISPLAYS ACTIVE ITEM */}
            {current == index ? (
              <>
                {/* <main onClick={()=>{setCurrent(index); getClickActionWithIndex(index); }} style={{cursor: 'pointer'}} className={styles.main}> */}
                <main
                  ref={ref}
                  onClick={() => {
                    setCurrent(index);
                    action();
                  }}
                  style={{ cursor: "pointer" }}
                  className={styles.main}
                >
                  <span className={styles.indicator_container}>
                    <span className={styles.indicator__active}>
                      <span className={styles.indicator__child}></span>
                    </span>
                    <span className={styles.indicator_line} />
                  </span>
                  <p>{text}</p>
                </main>
              </>
            ) : (
              <>
                <main className={styles.main}>
                  <span className={styles.indicator_container}>
                    <span className={styles.indicator} />
                    <span className={styles.indicator_line} />
                  </span>
                  <p>{text}</p>
                </main>
              </>
            )}
          </>
        ) : (
          // DISPLAYS COMPLETED ITEMS
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
              <p>{text}</p>
            </main>
          </>
        )}
      </>
    );
  };

  function RenderState(index) {}

  function getConditionWithIndex(index) {
    //check if item is completed from array
    const found = _progress.find((item, i) => i == index);
    return found.val;
  }

  // const ref: React.MutableRefObject<HTMLInputElement | undefined> = useRef()
  // ref.current?.scrollIntoView()

  // useEffect(()=>{
  // })

  return (
    <div style={{ display }} className={styles.parent_container}>
      <div className={styles.info}>
        <h3>Get the most out of your Early Access</h3>
        <p style={{ fontSize: "15px", lineHeight: "22.5px", margin: 0 }}>
          Complete these steps and earn up to <br />
          <span style={{ color: "#0099D6" }}>100,000 reward points!</span>
        </p>
      </div>
      <main className={styles.container}>
        {_progress.map((item, i) => (
          <div key={i}>
            <Stages
              index={i}
              check={getConditionWithIndex(i)}
              text={item.value}
              action={() => item.action(true)}
            />
          </div>
        ))}
      </main>
    </div>
  );
}

export default AccountProgress;
