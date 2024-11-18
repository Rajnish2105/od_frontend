import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      style={{
        background: "#2B373B",
        color: "#ffffff",
        textAlign: "center",
        fontSize: "12px",
      }}
      buttonStyle={{
        background: "#4CAF50",
        color: "#ffffff",
        fontSize: "12px",
        borderRadius: "5px",
        padding: "0.5rem 1rem",
      }}
      expires={365}
      onAccept={() => {
        console.log("Cookie consent given!");
      }}
    >
      We use cookies to enhance your browsing experience. By continuing to use
      our website, you agree to our.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
