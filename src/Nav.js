import React, { useEffect, useState } from "react";
import './Nav.css';
const Nav = () => {

    const [show, handleShow] = useState([]);
    
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if (window.scrollY > 100){
                handleShow(true);
            }else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, []);

    return ( 
        <div className={`nav ${show?"nav_black":""}`}>
           
            {/* Netflix logo*/}
            <img 
            className="nav-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            />
            {/* Avatar*/}
            <img
            className="nav-avatar"
            src="https://occ-0-372-1009.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41"
            alt="User"
            />
        </div>
     );
}
 
export default Nav;