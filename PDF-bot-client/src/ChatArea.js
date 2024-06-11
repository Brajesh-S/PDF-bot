import React from "react";
import { useState, useEffect, useRef } from "react";
import LoadingMessage from "./LoadingMessage";
import "./ChatArea.css";
import ailogo from "./assets/ailogo.png";
import userlogo from "./assets/userlogo.png";

const ChatArea = ({ chatHistory, isLoading }) => {
  const chatAreaRef = useRef(null);

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  return (
    <main className="app-main" ref={chatAreaRef}>
      <div className="chat-area" >
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            {msg.sender === "user" && (
              <div className="user-logo">
                <img src={userlogo} alt="User Logo" />
              </div>
            )}
            {msg.sender === "ai" && (
              <div className="ai-logo">
                <img src={ailogo} alt="AI Logo" />
              </div>
            )}
            <div className="message-content">
              {msg.sender === "ai" ? (
                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
              ) : (
               <div > {msg.content} </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && <LoadingMessage />}
      </div>
    </main>
  );
};

export default ChatArea;
