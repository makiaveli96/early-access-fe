import React, { useContext } from "react";
import { SocialIcon } from "react-social-icons";
import { AuthContext } from '../../contexts/authContextApi'

function SocialMedia({ style, margin, type }: { style?: any; margin?: string, type?: string }) {

  const { userDetails } = useContext(AuthContext)
  const refMessage = `Hi! Have you tried Poket? Poket allows me send money anywhere across currencies at the best fees. Check it out poketfi.money/ref=${userDetails.referralID}`

  return (
    <div>
      <span style={{ margin: margin || "5px" }}>
        <SocialIcon
          style={style}
          network="facebook"
          url={type == 'referral'? `https://www.facebook.com/sharer.php?u=https://poketfi.money?ref=${userDetails?.referralID}` : "https://www.facebook.com/poketfi"}
        />
      </span>
      <span style={{ margin: margin || "5px" }}>
        <SocialIcon
          style={style}
          network="linkedin"
          url={type == 'referral'? `https://www.linkedin.com/sharing/share-offsite/?url=https://poketfi.money?ref=${userDetails?.referralID}` : "https://www.linkedin.com/company/poketfi/"}
        />
      </span>
      <span style={{ margin: margin || "5px" }}>
        <SocialIcon
          style={style}
          network="twitter"
          url={type == 'referral'? `https://twitter.com/intent/tweet?text=${refMessage}` : "https://twitter.com/gradient_fi"}
        />
      </span>
      {type !== 'referral' && (
        <span style={{ margin: margin || "5px" }}>
          <SocialIcon
            style={style}
            network="instagram"
            url="https://www.instagram.com/poketfi"
          />
        </span>
      )}
     
    </div>
  );
}

export default SocialMedia;
