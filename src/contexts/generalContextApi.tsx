import React, { useState, createContext, useRef } from "react";
import { getReferrals } from '../components/api/routes'
import { ErrorHandler } from "../helpers/Errorhandler";
import { NavigateFunction, useNavigate } from 'react-router-dom';


interface ReferralI {
  referrerEmail: string
  receiverEmail: string;
  referrerType: string
  receiverType: string;
  status: string;
  name: string;
  time: string
}

interface ContextTypesI {
  profile: boolean;
  showProfile: any;
  uploadImage: boolean;
  showUploadImage: any;
  referrals: boolean;
  showReferrals: any;
  newReferral: boolean;
  showNewReferral: any;
  whitelist: boolean;
  showWhitelist: any;
  joinCommunityRef: React.MutableRefObject<HTMLInputElement | undefined>;
  contactUsRef: React.MutableRefObject<HTMLInputElement | undefined>;
  _referrals: Array<ReferralI>;
  _setReferrals: any;
  GetReferrals: (email: string, navigate: NavigateFunction, setAuth: any)=>void;
  contactForm: boolean;
  showContactForm: any;
}

export const GeneralContext = createContext<ContextTypesI | undefined>(undefined);



function GeneralContextApi(props) {
  const [profile, showProfile] = useState(false);
  const [uploadImage, showUploadImage] = useState(false);
  const [referrals, showReferrals] = useState(false);
  const [newReferral, showNewReferral] = useState(false);
  const [whitelist, showWhitelist] = useState(false)
  const joinCommunityRef = useRef()
  const contactUsRef = useRef();
  const [_referrals, _setReferrals] = useState<Array<ReferralI>>([])
  const [contactForm, showContactForm] = useState(false)


  async function GetReferrals(email: string, navigate: NavigateFunction, setAuth: any){
    try{
      const res = await getReferrals(email)
      if(res.status == 200){
        _setReferrals(res.data)
      }
    }catch(err){
      ErrorHandler(err, navigate, setAuth)
    }
  }


  const allValues = {
    profile,
    showProfile,
    uploadImage, showUploadImage,
    referrals, showReferrals,
    newReferral, showNewReferral,
    whitelist, showWhitelist,
    joinCommunityRef,
    contactUsRef,
    GetReferrals,
    _referrals, _setReferrals,
    contactForm, showContactForm
  };

  return (
    <GeneralContext.Provider value={allValues}>
      {props.children}
    </GeneralContext.Provider>
  );
}

export default GeneralContextApi;
