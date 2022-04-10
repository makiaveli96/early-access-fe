import React from "react";
import { SocialIcon } from "react-social-icons";

function SocialMedia({ style, margin }: { style?: any; margin?: string }) {
  return (
    <div>
      <span style={{ margin: margin || "5px" }}>
        <SocialIcon
          style={style}
          network="facebook"
          url="https://www.facebook.com/poketfi"
        />
      </span>
      <span style={{ margin: margin || "5px" }}>
        <SocialIcon
          style={style}
          network="linkedin"
          url="https://www.linkedin.com/company/poketfi/"
        />
      </span>
      <span style={{ margin: margin || "5px" }}>
        <SocialIcon
          style={style}
          network="twitter"
          url="https://twitter.com/gradient_fi"
        />
      </span>
      <span style={{ margin: margin || "5px" }}>
        <SocialIcon
          style={style}
          network="instagram"
          url="https://www.instagram.com/poketfi"
        />
      </span>
    </div>
  );
}

export default SocialMedia;
