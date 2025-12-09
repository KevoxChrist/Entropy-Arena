// Footer Component
import React from "react";
import "../styles/Footer.css";
import instagramIcon from "../assets/social/instagram.svg";
import twitterIcon from "../assets/social/twitter.svg";
import githubIcon from "../assets/social/github.svg";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <a href="/" className="footer-link">Home</a>
            <a href="/faq" className="footer-link">FAQ</a>
            <a href="/register" className="footer-link">Register</a>
          </div>
          <div className="footer-right">
            <a
              href="https://www.instagram.com/"
              className="footer-icon-link"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagramIcon} alt="" className="footer-icon" />
            </a>
            <a
              href="https://twitter.com/"
              className="footer-icon-link"
              aria-label="Twitter"
              target="_blank"
              rel="noreferrer"
            >
              <img src={twitterIcon} alt="" className="footer-icon" />
            </a>
            <a
              href="https://github.com/"
              className="footer-icon-link"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <img src={githubIcon} alt="" className="footer-icon" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
