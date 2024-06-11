import React, { useState, useEffect } from "react";
import Header from "./Header";
import ChatArea from "./ChatArea";
import MessageInput from "./MessageInput";
import { marked } from "marked";
import { chat } from "./api/ChatApi";
import { uploadPDF } from "./api/UploadPdf";

import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
    localStorage.setItem("lastUploadedFile", selectedFile.name);
    if (selectedFile) {
      handleUploadFile(selectedFile);
    }
  };
  const handleUploadFile = async (file) => {
    setIsLoading(true);

    try {
      const res = await uploadPDF(file);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", content: message };
    setChatHistory([...chatHistory, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await chat(message);
      const formattedResponse = marked(res.message);
      const aiMessage = { sender: "ai", content: formattedResponse };
      setChatHistory([...chatHistory, userMessage, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        sender: "ai",
        content: error.message,
        style: { color: "red" },
      };
      setChatHistory([...chatHistory, userMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header fileName={fileName} handleFileChange={handleFileChange} />

      <ChatArea chatHistory={chatHistory} isLoading={isLoading} />
      <MessageInput
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;
