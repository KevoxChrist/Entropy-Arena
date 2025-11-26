//Footer Component
import React from "react";
import "../styles/Footer.css"


class Footer extends React.Component{
    render(){
        return (
           <footer className="footer">
            <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">About</a>
            </div>
        </footer>
        );
    }

}
export default Footer;