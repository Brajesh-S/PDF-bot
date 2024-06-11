import React from "react";
import logo from "./assets/logo.png";
import "./Header.css";

const Header = ({ fileName, handleFileChange }) => {
  return (
    <header className="app-header">
      <div className="logo">
        <img src={logo} alt="AI Planet Logo" />
      </div>
      <div className="upload-section">
        {fileName && (
          <div className="file-info">
            <span className="file-icon">📄</span>
            <span className="file-name">{fileName}</span>
          </div>
        )}
        <label htmlFor="pdf-upload" className="upload-btn">
          <span className="plus-icon">+</span>
          <span className="btn-text">Upload PDF</span>
        </label>
        <input
          type="file"
          id="pdf-upload"
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept=".pdf"
        />
      </div>
    </header>
  );
};

export default Header;
