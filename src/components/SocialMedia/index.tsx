import React, { useContext } from "react";
import { SocialIcon } from "react-social-icons";
import { AuthContext } from '../../contexts/authContextApi'

function SocialMedia({ style, margin, type, refMessage }: { style?: any; margin?: string, type?: string, refMessage?: string }) {

  const { userDetails } = useContext(AuthContext)
  // const refMessage = `I just joined Poket Early Access. With Poket, you can send and receive money around the world in cash and crypto at the best rates. Check it out: poketfi.money/ref=${userDetails?.referralID}`
  // const refMessage = `Hello. I just joined Poket Early Access. With Poket, you can send and receive money around the world, across currencies, and at the best rates. Check it out: poketfi.money?ref=${userDetails?.referralID}`
  // const refMessage = `Hi! Have you tried Poket? Poket allows me send money anywhere across currencies at the best fees. Check it out poketfi.money/ref=${userDetails.referralID}`

  return (
    <div>
      <span style={{ margin: margin || "5px" }}>
        <SocialIcon
          style={style}
          network="facebook"
          url={type == 'referral'? `https://www.facebook.com/sharer.php?u=https://poketfi.money?ref%3D${userDetails?.referralID}` : "https://www.facebook.com/poketfi"}
        />
      </span>
      <span style={{ margin: margin || "5px" }}>
        <SocialIcon
          style={style}
          network="linkedin"
          url={type == 'referral'? `https://www.linkedin.com/sharing/share-offsite/?url=https://poketfi.money?ref%3D${userDetails?.referralID}` : "https://www.linkedin.com/company/78340869/admin/"}
        />
      </span>
      <span style={{ margin: margin || "5px" }}>
        <SocialIcon
          style={style}
          network="twitter"
          url={type == 'referral'? `https://twitter.com/intent/tweet?text=${refMessage}` : "https://twitter.com/poketfinance"}
        />
      </span>
      {type !== 'referral' && (
        <span style={{ margin: margin || "5px" }}>
          <SocialIcon
            style={style}
            network="instagram"
            url="https://www.instagram.com/poketfinance/"
          />
        </span>
      )}
     
    </div>
  );
}

export default SocialMedia;
