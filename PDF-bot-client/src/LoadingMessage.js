// LoadingMessage.js
import React from "react";
import Lottie from "react-lottie";
import ailogo from "./assets/ailogo.png";
import loadingAnimation from "./loading.json";
import "./LoadingMessage.css";

const LoadingMessage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  return (
    <div className="message ai-message">
      <div className="ai-logo">
        <img src={ailogo} alt="AI Logo" />
      </div>
      <div className="message-content loading-message">
        <Lottie options={defaultOptions} height={50} width={50} />
      </div>
    </div>
  );
};

export default LoadingMessage;
