import React, { useState, useEffect } from "react";
import {
  storeObject,
  exportObject,
} from "../../components/variableSet/variableSet.jsx";
import Logo from "../../assets/Logo.png";
import Carousel from "../../components/carousel/carousel.jsx";
import "./home.css";
import Navbar from "../../components/navbar/navbar.jsx";
import Frame from "../../assets/Frame.png";
import quiz1 from "../../assets/quiz1.png";
import quiz2 from "../../assets/quiz2.png";
import {Link , useNavigate} from "react-router-dom";


export const Home = () => {
  const isMobileView = window.innerWidth <= 768; 
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
  useEffect(() => {
    setObj(exportObject());
  }, []);
  return (
    <>
      <div className="homePage">
        <div className="headingCumLogo">
          <div className="headingCumLogoLogo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="headingCumLogoHeading">
            <h1>Hi, {obj.userName}</h1>
          </div>
        </div>
        <div className="mainBanner">
          <div className="mainBannerHeading">
            <h1>Continue Where You Left</h1>
          </div>
          <div
            className="mainBannerImage"
            style={{
              backgroundImage: `url(${Frame})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          ></div>
        </div>
        <div className="homeCorusel">
          <div className="homeCoruselHeading">
            <h1>Let's Learn!!</h1>
          </div>
          <div className="homeCoruselCaruuu">
            <Carousel
              borderRadii="20px"
              marginTop="100px"
              height="250px"
              const width = {isMobileView ? "95vw" : "500px"}
              autoPlay="false"
              list={[
                "https://i.imgur.com/HTTARQc.png",
                "https://i.imgur.com/sl9OObL.png",
              ]}
            />
          </div>
        </div>
        <div className="quizzes">
          <div className="quizzesHeading">
            <h1>Quizzes</h1>
          </div>
          <div className="quizzesItems">
            <div
              className="quizzesItem"
              onClick={()=>navigate("/quiz")}
              style={{
                backgroundImage: `url(${quiz1})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="quizzesItem"
              onClick={()=>navigate("/quiz")}
              style={{
                backgroundImage: `url(${quiz2})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="quizzesItem"
              onClick={()=>navigate("/quiz")}
              style={{
                backgroundImage: `url(${quiz1})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="quizzesItem"
              onClick={()=>navigate("/quiz")}
              style={{
                backgroundImage: `url(${quiz2})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};
