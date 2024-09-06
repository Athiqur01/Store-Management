
import { FaFacebook,FaLinkedin,FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="   ">
        <footer className="footer   px-10 mx-auto bg-[#7B1FA2] text-base-content pt-20 flex flex-col md:flex-row ">
  <nav className="text-white mx-auto">
    <h6 className="footer-title ">BBM Inventory Management</h6> 
    <p className="text-left ">Welcome to BBM Inventory Management <br />that focuses on the reliability and  <br />accuracy of the inventory management system.</p>
    
  </nav> 
  <nav className="text-white mx-auto">
    <h6 className="footer-title text-center lg:text-left ">Contact</h6> 
    <p className="text-left ">BAU Campus, Sesh Moor <br />Call us FREE<a className="link link-hover text-left" href="">+8801720112498</a>  <br />
<a className="link link-hover" >athik.apece@gmail.gov.bd</a>
</p>
  </nav> 
  <nav className="text-white mx-auto ">
    <h6 className="footer-title ">Social Links</h6> 
    <div className="flex space-x-4 text-2xl">
    <a className="link link-hover "><FaFacebook /></a>
    <a className="link link-hover "><FaLinkedin /></a>
    <a className="link link-hover "><FaTwitter /></a>

    </div>
    
  </nav> 
  
  
</footer>
  <div className="bg-[#7B1FA2] text-center rounded-b-md  ">
    <p className="text-white p-20">© 2024 Bangladesh Betar,Mymensingh All Rights Reserved</p>
  </div>
        </div>
    );
};

export default Footer;