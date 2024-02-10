import useMediaQuery from "@mui/material/useMediaQuery";
import {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css"
const Navbar = () => {
    const isMobileOrTablet = useMediaQuery("(max-width: 767px)");
    const navigate = useNavigate();

    return ( 
        <>


        {isMobileOrTablet ? (
            <div style={{position:"fixed" , top:"92%"}}>
                <div className="mobileNavbar">
                   
                    <div className="mobileNavbarItems">
                        <button className="mobileNavbarItem" onClick={()=> navigate("/home")}>Home</button>
                        <button className="mobileNavbarItem" onClick={()=>navigate("/forum")}>Forum</button>
                        <button className="mobileNavbarItem" onClick={()=>navigate("/quiz")}>Quizzes</button>
                        <button className="mobileNavbarItem" onClick={()=>navigate("/login")}>Profile</button>
                    </div>
                </div>
            </div>
        ) : (
            <div style={{position:"fixed" , top:"0%" , left:"0%"}}>
                <div className="navbar">
                    <div className="navbarItems">
                        <button className="navbarItem" onClick={()=> navigate("/home")}>Home</button>
                        <button className="navbarItem" onClick={()=> navigate("/forum")}>Forum</button>
                        <button className="navbarItem" onClick={()=> navigate("/quiz")}>Quizzes</button>
                        <button className="navbarItem" onClick={()=> navigate("/login")}>Profile</button>
                    </div>
                </div>
            </div>
        )}
        
        </>
     );
}
 
export default Navbar;