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
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import ProfileModal from "../../components/ProfileModal";
import UploadImage from "../../components/UploadProfileImage";
import Referrals from "../../components/Referrals";
import { GeneralContext } from "../../contexts/generalContextApi";
import { useMediaQuery } from "react-responsive";
import NewReferral from "../../components/NewReferral";
import Whitelist from "../../components/Whitelist";
import { AuthContext } from "../../contexts/authContextApi";
import { hasLoggedIn, getTweets, getUserActivity } from "../../components/api/routes";
import { format, parseISO } from "date-fns";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { formatCurrency } from "../../utils/formatCurrency";
import { Icon } from "@iconify/react";
import SocialMedia from "../../components/SocialMedia";
import { FiBell, FiUser, FiUsers, FiMail } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import SendInAppMessage from "../../components/SendInAppEmail";
import AccountProgress from "../../components/AccountProgress";
import Verifyemail from "../../components/Verifyemail";
import Verifynubmer from "../../components/Verifynumber";
import Presale from "../../components/Presale";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EmailVerified from '../../components/EmailVerified'
import WhitelistSuccess from "../../components/Whitelisted";
import { ErrorHandler } from "../../helpers/Errorhandler";

interface TweetsI {
  media_key: string;
  height: number;
  url: string;
  preview_image_url: string;
  width: number,
  type: string
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

function QuickAccess({
  text,
  status,
  onClick,
}: {
  text: string;
  status: string;
  onClick: () => void;
}) {
  return (
    <>
      {status == "completed" ? (
        <div className={styles.action_completed}>
          <p style={{ color: "#16A34A" }}>{text}</p>
          <Icon
            icon="bi:check-circle-fill"
            width="24px"
            height="24px"
            color="#16A34A"
          />
        </div>
      ) : (
        <div onClick={onClick} className={styles.action}>
          <p>{text}</p>
          <img src="/icons/action_arr_right.png" />
        </div>
      )}
    </>
  );
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
    showContactForm,
    showVerifyEmail,
    showEmailVerified
  }: any = useContext(GeneralContext);

  const [refs, setRefs] = useState([]);
  const [searchParams] = useSearchParams();
  const referrals: Array<{ time: string; points: string }> = [];

  const isMobile = useMediaQuery({
    query: "(min-width: 0px) and (max-width: 767px)",
  });

  const { auth, setAuth, userDetails, setUserDetails }: any =
    useContext(AuthContext);
  const [activity, setActivity] = useState("none");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [tweets, setTweets] = useState<Array<TweetsI>>([])

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
    if (!userDetails.hasLoggedIn) {
      (async () => {
        const res = await hasLoggedIn();
        if (res.status == 200) {
          setUserDetails(res.user);
        }
      })();
      setOpenModal(true);
    }

    if (searchParams.get("email_verified") == 'true') {
      showEmailVerified(true)
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
  }, []);

  useEffect(()=>{
    (async()=>{
      try{
        const arr = []
        const res = await getTweets();
        res.data.map(dat=>{
          if(dat.type == 'photo'){
            arr.push(dat)
          }
        })
        setTweets(arr)
      }catch(err){
        ErrorHandler(err, navigate, setAuth)
      }
    })()
  },[]);

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

      <div className={styles.container}>
        <div className={styles.side_nav}>
          <Sidebar />
        </div>
        <div className={styles.body__container}>
          <Navbar />
          <div className={styles.body}>
            <div className={styles.col1}>
              <div style={{display: 'flex', flexDirection: userDetails?.isEmailVerified? 'column' : 'column-reverse' }}>
              <div className={styles.section_1}>
                <div className={styles.section_1__main}>
                  <div className={styles.balance}>
                    <p className={styles.section_1_header_text}>
                    Your reward points balance
                    </p>
                    <div>
                      <h1>{formatCurrency(userDetails?.referralPoints)} pts</h1>
                      <Button
                        onClick={() => showNewReferral(true)}
                        width="auto"
                        height="36px"
                        text="New Referral"
                        bgColor="#0099D6"
                        textColor="white"
                        style={{paddingLeft: '15px', paddingRight: '15px'}}
                      />
                    </div>
                  </div>
                  <div className={styles.point_balance_mobile}>
                    <PointBalance />
                  </div>
                  <Divider width="100%" />
                  <div className={styles.welcome}>
                    <br />
                    <h2 style={{ margin: 0, textTransform: 'capitalize' }}>
                      Hi,{" "}
                      {userDetails?.firstName
                        ? userDetails?.firstName
                        : userDetails?.fullname}
                    </h2>
                    <p style={{fontSize: '16px'}}>
                      You will earn{" "}
                      <span style={{ color: "orange" }}>10,000 points</span> for
                      every individual referral and{" "}
                      <span style={{ color: "orange" }}>20,000 points</span> for
                      Business referrals
                    </p>
                    <Links />
                  </div>
                </div>
              </div>
              {/* <div className={styles.section_2}> */}
                {/* <div className={styles.section_2__main}> */}
                  {/* <h3>Get the most out of your Early Access</h3> */}
                  {/* <p style={{fontSize: '15px', lineHeight: '22.5px', margin: 0}}>Complete these steps and earn up to <br /><span style={{color: '#0099D6'}}>100,000 reward points!</span></p> */}
                  <AccountProgress />
                {/* </div> */}
              {/* </div> */}
              </div>
              
              <div ref={joinCommunityRef} className={styles.section_3}>
                <div className={styles.section_3__main}>
                  <h3>Join our community</h3>
                  <Divider type="dashed" />
                  <p>
                    Stay up to date with new products, features, exclusive
                    offers and launch dates.
                  </p>
                  <div className={styles.link_buttons}>
                    <a title="Discord coming soon!" style={{opacity: '.5', cursor: 'not-allowed'}}>
                      <img src="/icons/discord.png" />
                      <p>Discord community</p>
                      <Icon icon="bi:arrow-right" />
                    </a>
                    <br />
                    <a>
                      <Icon icon="logos:telegram" width="24px" height="24px" />
                      <p>Telegram community</p>
                      <Icon icon="bi:arrow-right" />
                    </a>
                  </div>
                  <br />
                  <Divider />
                  <div className={styles.follow_us}>
                    <p>
                      Follow Us <Icon icon="bi:arrow-right" />
                    </p>
                    <SocialMedia style={{ height: "36px", width: "36px" }} />
                  </div>
                </div>
              </div>

              <div ref={contactUsRef} className={styles.section_4}>
                <div className={styles.section_4__main}>
                  <h3>Get in touch</h3>
                  <Divider type="dashed" />
                  <p>
                  Set up a meeting with sales to learn more about how to use Poket for your business.
                    {/* Send a message or set up a meeting to learn more about how you can <br />use Poket for you and for your business */}
                  </p>
                  <Divider type="dashed" />
                  <div className={styles.link_buttons}>
                    <a onClick={() => showContactForm(true)}>
                      <p>Send a message</p>
                      <FiMail color="#002C3D" />
                    </a>
                    <br />
                    <a href="https://calendly.com/hellopoket/30min" target="_blank">
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
                <div
                  onClick={() => showUploadImage(true)}
                  className={styles.profile}
                >
                  {userDetails?.profilePhoto ? (
                    <img
                      src={userDetails?.profilePhoto}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <>
                      {userDetails?.account == "personal" ? (
                        <img src="/icons/no-image.png" />
                      ) : (
                        <Icon
                          icon="ion:business-sharp"
                          color="#00668F"
                          height="80px"
                          width="70px"
                        />
                      )}
                    </>
                  )}
                </div>
                <p style={{textTransform: 'capitalize'}}>
                  Hi,{" "}
                  {userDetails?.firstName
                    ? userDetails?.firstName
                    : userDetails?.fullname}
                </p>
                <PointBalance />
                <br />
                <h3
                  style={{
                    color: "#002C3D",
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Latest from Poket
                </h3>
                {/* <Divider type="dashed" width="100%" /> */}
                <div className={styles.social_media}>
                  <Divider width="100%" marginTop="15px" marginBottom="15px" />

                  <div className={styles.header}>
                    <div style={{display: 'flex', alignItems: 'flex-start'}}>
                      <img src="/icons/poket-logo.png" style={{width: '30px', height: '30px'}} />
                      <div>
                        <p style={{fontSize: '15px'}}>@poket.finance</p>
                        {/* <p style={{ fontSize: "12px", color: "#9CA0AC" }}>
                          1,234 posts
                        </p> */}
                      </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <SocialMedia
                        margin="2.5px"
                        style={{ height: "23px", width: "23px" }}
                      />
                    </div>
                  </div>
                  {/* <div className={styles.social_icons}>
                    <SocialMedia
                      margin="2.5px"
                      style={{ height: "23px", width: "23px" }}
                    />
                  </div> */}
                  <br />
                  
                </div>
                  
              </div>
              <div className={styles.posts}>
                {tweets.map(tweet=>(
                  <a href="https://twitter.com/poketfinance" target="_blank">
                    <div className={styles.post_item}>
                      <img src ={tweet.url || tweet.preview_image_url} width="250px" height="250px" />
                    </div>
                  </a>
                ))}
                {/* <div className={styles.post_item}>
                  <img src ="/post_img_1.png" width="250px" height="250px" />
                </div>
                <div className={styles.post_item}>
                  <img src ="/post_img_1.png" width="250px" height="250px" />
                </div> */}
                </div>
            </div>
          </div>
        </div>
      </div>
      <Modal modal={openModal} showModal={setOpenModal} backdropClose={true}>
        <Box sx={style}>
          <div style={{ width: "90%" }}>
            {/* <h3>You made it !</h3> */}
            <img src="/box_animation.gif" width="80%" />
            <p style={{ fontSize: "16px", lineHeight: "24px" }}>
              Congratulations on joining our Early Access, you have received{" "}
              <span style={{ color: "#00AFF5" }}>{userDetails?.account == 'personal'? '10,000':'25,000'} points</span> from Poket
              to get you started!
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
      <Verifyemail />
      <Verifynubmer />
      <Presale />
      <EmailVerified />
      <WhitelistSuccess />
    </>
  );
}

export default Home;
