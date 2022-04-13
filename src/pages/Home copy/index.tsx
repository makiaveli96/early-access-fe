import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Links from "../../components/Links";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
import Carousel from "react-elastic-carousel";
import PointBalance from "../../components/PointBalance";
import Divider from "../../components/Divider";
import Modal from "../../components/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import ProfileModal from "../../components/ProfileModal";
import UploadImage from "../../components/UploadProfileImage";
import Referrals from "../../components/Referrals";
import { GeneralContext } from "../../contexts/generalContextApi";
import { useMediaQuery } from "react-responsive";
import NewReferral from "../../components/NewReferral";
import Whitelist from "../../components/Whitelist";
import { AuthContext } from "../../contexts/authContextApi";
import { hasLoggedIn } from "../../components/api/routes";
import { format, parseISO } from "date-fns";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { formatCurrency } from "../../utils/formatCurrency";
import { Icon } from '@iconify/react';
import SocialMedia from "../../components/SocialMedia";
import { FiBell, FiUser, FiUsers, FiMail } from 'react-icons/fi'
import { ToastContainer } from 'react-toastify'
import SendInAppMessage from "../../components/SendInAppEmail";
import AccountProgress from "../../components/AccountProgress";

function QuickAccess({ text, status, onClick }: {text: string, status: string, onClick: ()=>void}){
  return(
    <>
    {status == 'completed'? (
      <div className={styles.action_completed}>
        <p style={{color: '#16A34A'}}>{text}</p>
        <Icon icon="bi:check-circle-fill" width="24px" height="24px" color="#16A34A" />
      </div>
    ):(
      <div onClick={onClick} className={styles.action}>
        <p>{text}</p>
        <img src="/icons/action_arr_right.png" />
      </div>
    )}
    </>
   
  )
}

function Home() {
  const {
    profile,
    showProfile,
    uploadImage,
    showUploadImage,
    showWhitelist,
    showNewReferral,
    joinCommunityRef,
    contactUsRef,
    showContactForm
  }: any = useContext(GeneralContext);

  const [refs, setRefs] = useState([]);
  const referrals: Array<{ time: string; points: string }> = [];

  const isMobile = useMediaQuery({
    query: "(min-width: 0px) and (max-width: 767px)",
  });

  const { auth, setAuth, userDetails, setUserDetails }: any =
    useContext(AuthContext);
  const [activity, setActivity] = useState("none");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    border: "0px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 446,
    height: "auto",
    paddingTop: '30px',
    paddingBottom: '30px',
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
    if (!userDetails.hasLoggedIn) {
      (async () => {
        const res = await hasLoggedIn();
        if (res.status == 200) {
          setUserDetails(res.user);
        }
      })();
      setOpenModal(true);
    }

    userDetails.businessReferrals.forEach((ref) => {
      referrals.push({ time: ref?.time, points: "+20000" });
    });
    userDetails.referrals.forEach((ref) => {
      referrals.push({ time: ref?.time, points: "+10000" });
    });
    referrals.sort(function (a, b) {
      return new Date(b.time).valueOf() - new Date(a.time).valueOf();
    });
    setRefs(referrals);
    console.log(referrals, " refsss");
  }, []);

  const toggleActivity = () => {
    if (activity == "none") {
      setActivity("flex");
    } else {
      setActivity("none");
    }
  };

  return (
    <>
    <ToastContainer />
      <main className={styles.main}>
        <div className={styles.left}>
          <Sidebar />
        </div>
        <div className={styles.right}>
          <Navbar />
          <div className={styles.body}>
            <div className={styles.col1}>
              <div className={styles.section_1}>
                <p className={styles.section_1_header_text}>
                  Current Points balance
                </p>
                <div className={styles.balance}>
                  <h1>{formatCurrency(userDetails?.referralPoints)} Pts</h1>
                  <Button
                    onClick={() => showNewReferral(true)}
                    width="114px"
                    height="36px"
                    text="New Referral"
                    bgColor="#0099D6"
                    textColor="white"
                  />
                </div>
                <Divider width="100%" />
                <div className={styles.welcome}>
                  <br />
                  <h2 style={{margin: 0}}>
                    Hi,{" "}
                    {userDetails?.firstName
                      ? userDetails?.firstName
                      : userDetails?.fullname}
                  </h2>
                  <p>
                  You will earn <span style={{ color: "orange" }}>10,000 points</span> for
                    every individual referral and{" "}
                    <span style={{ color: "orange" }}>20,000 points</span> for
                    Business referrals
                  </p>
                  <Links />
                </div>
              </div>
              <div className={styles.section_2}>
                <h3>
                  Get the most out of your Early Access
                </h3>
                <AccountProgress />
                <div style={{ width: "100%", border: ".5px dashed #B3BCCE" }} />
                {/* <div className={styles.slider}>
                  <Carousel
                    isRTL={false}
                    itemsToShow={isMobile ? 1 : 3}
                    showArrows={false}
                    renderPagination={({ pages, activePage }) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "15px",
                        }}
                      >
                        {pages.map((page, i) => (
                          <span
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              backgroundColor:
                                i == activePage ? "#F57A00" : "#0099D6",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  >
                    <div className={styles.slider_item}>
                      <h2>Build a profile</h2>
                      <p>
                        Build your poket profile and help us set up just the
                        right type of account that suits all your needs.
                      </p>
                      <Button
                        text="Get Started"
                        bgColor="#F57A00"
                        textColor="white"
                        width="auto"
                        height="28px"
                      />
                    </div>

                    <div className={styles.slider_item}>
                      <h2>Invite Family & Friends</h2>
                      <p>
                        Invite family, friends and businesses and earn points.
                        Your points will be redeemable for tokens, cash and
                        other amazing prices when we launch.
                      </p>
                      <Button
                        text="Start a New referral"
                        bgColor="#F57A00"
                        textColor="white"
                        width="auto"
                        height="28px"
                      />
                    </div>
                    <div className={styles.slider_item}>
                      <h2>Get Whitelisted</h2>
                      <p>
                        To qualify for our upcoming Token presale event, your
                        account must be whitelisted. Read more about the presale
                        event and account whitelisting here.
                      </p>
                      <Button
                        text="Get Started"
                        bgColor="#F57A00"
                        textColor="white"
                        width="auto"
                        height="28px"
                      />
                    </div>
                  </Carousel>
                </div> */}
                <div className={styles.quick_access}>
                  <QuickAccess text="Build Profile" onClick={()=>{showProfile(true)}} status={userDetails?.isProfileSet? 'completed':'pending'} />
                  <QuickAccess text="Invite Family & Friends" onClick={()=>{showNewReferral(true)}} status="pending" />
                  <QuickAccess text="Get Whitelisted" onClick={()=>{showWhitelist(true)}} status={userDetails?.isWhitelisted? 'completed':'pending'} />
                  <QuickAccess text="Join our Community" onClick={()=>{}} status="pending" />
                </div>
              </div>
              <div ref={joinCommunityRef} className={styles.section_3}>
                <div className={styles.section_3__main}>
                  <h3>Join our community</h3>
                  <Divider type="dashed" />
                  <p>Stay up to date with new products, features, exclusive offers and launch dates.</p>
                  <div className={styles.link_buttons}>
                    <a>
                      <img src="/icons/discord.png" />
                      <p>Discord community</p>
                      <Icon icon="bi:arrow-right" />
                    </a>
                    <br/>
                    <a>
                      <Icon icon="logos:telegram" width="24px" height="24px" />
                      <p>Telegram community</p>
                      <Icon icon="bi:arrow-right" />
                    </a>
                  </div>
                  <br />
                  <Divider />
                  <div className={styles.follow_us}>
                    <p>Follow Us <Icon icon="bi:arrow-right" /></p>
                    <SocialMedia style={{ height: '36px', width: '36px' }} />
                  </div>
                  <Divider marginTop="20px" type="dashed" />
                </div>
              </div>

              <div ref={contactUsRef} className={styles.section_4}>
                <div className={styles.section_4__main}>
                  <h3>Get in touch</h3>
                  <Divider type="dashed" />
                  <p>Send us a message or set up a meeting with us to learn more about how you can use poket for yourself and business.</p>
                  <Divider type="dashed" />
                  <div className={styles.link_buttons}>
                    <a onClick={()=>showContactForm(true)}>
                      <p>Send a message</p>
                      <FiMail color="#002C3D"  />
                    </a>
                    <br/>
                    <a>
                      <p>Schedule a meeting</p>
                      <FiUsers color="#002C3D" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* COLUMN FAR RIGHT */}
            <div className={styles.col2}>
              <div className={styles.col2_body}>
                <div onClick={()=>showUploadImage(true)} className={styles.profile}>
                  {userDetails?.profilePhoto? (
                      <img src={userDetails?.profilePhoto} style={{width: "80px", height: "80px", borderRadius: '50%'}}/>
                  ):(
                    <>{userDetails?.account == 'personal'? (
                      <img src="/icons/no-image.png" />
                    ):(
                      <Icon icon="ion:business-sharp" color="#00668F" height="80px" width= '70px' />
                    )}
                    </>
                  )}
                </div>
                <p>
                  Hi,{" "}
                  {userDetails?.firstName
                    ? userDetails?.firstName
                    : userDetails?.fullname}
                </p>
                <PointBalance />
                <p
                  onClick={() => toggleActivity()}
                  style={{
                    color: "#00668F",
                    cursor: "pointer",
                    display: "flex",
                    userSelect: "none",
                    alignItems: "center",
                    margin: 0,
                    fontWeight: 'bold',
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
                <div style={{ display: activity }} className={styles.activity}>
                  {[
                    ...userDetails?.businessReferrals,
                    ...userDetails?.referrals,
                  ].length == 0 && (
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
                  {refs.map((referral, i) => (
                    <div style={{ width: "100%" }} key={i}>
                      <Divider type="dashed" width="100%" />
                      <div className={styles.activity__item}>
                        <div>
                          <p
                            style={{
                              color: "#231712",
                              margin: 0,
                              fontWeight: "400",
                              fontSize: "16px",
                            }}
                          >
                            Poket referral bonus
                          </p>
                          {referral?.time && (
                            <p
                              style={{
                                color: "#B3BCCE",
                                margin: 0,
                                fontSize: "13px",
                              }}
                            >
                              {format(
                                parseISO(referral?.time),
                                "LLL, dd, yyyy"
                              )}
                            </p>
                          )}
                        </div>
                        <span className={styles.activity_points}>
                         {referral.points+' Pts'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <Divider type="dashed" width="100%" /> */}
                <h3 style={{ color: "#002C3D", margin: 0, fontSize: '18px', fontWeight: '500' }}>Latest from Poket</h3>
                {/* <Divider type="dashed" width="100%" /> */}
                <div className={styles.social_media}>
                  <div className={styles.header}>
                    <img src="/icons/poket-logo.png" />
                    <div>
                      <p>@poket.finance</p>
                      <p style={{ fontSize: "15px", color: "#9CA0AC" }}>
                        1,234 posts
                      </p>
                    </div>
                  </div>
                  <div className={styles.social_icons}>
                    <SocialMedia margin="2.5px" style={{ height: "23px", width: "23px" }} />
                  </div>
                  <br />
                  <div className={styles.posts}>
                    <img src="/post_img_1.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modal modal={openModal} showModal={setOpenModal} backdropClose={true}>
        <Box sx={style}>
          <div style={{ width: "90%" }}>
            {/* <h3>You made it !</h3> */}
            <img src="/sally-4.png" width="80%" />
            <p style={{ fontSize: "16px", lineHeight: '24px' }}>
            Congratulations on joining our Early Access, you have received <span style={{color: '#00AFF5'}}>10,000 points</span> from Poket to get you started! 
            </p>
          </div>
          <Button
            onClick={() => setOpenModal(false)}
            text="Continue"
            width="90%"
            height="48px"
            bgColor="#0099D6"
          />
        </Box>
      </Modal>
      <ProfileModal modal={profile} showModal={showProfile} />
      <UploadImage modal={uploadImage} showModal={showUploadImage} />
      <Referrals />
      <NewReferral />
      <Whitelist />
      <SendInAppMessage />
    </>
  );
}

export default Home;
