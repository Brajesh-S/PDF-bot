import React from "react";
import "./MessageInput.css";

const MessageInput = ({ message, setMessage, handleSendMessage }) => {
  return (
    <div className="message-box">
      <input
        type="text"
        placeholder="Send a message..."
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button className="send-btn" onClick={handleSendMessage}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
