import React, { useState } from "react";
import imageSvg from "../../assets/login-svg.svg";
import logo from "../../assets/logo.svg";
import LoginCard from "../../components/LoginCard";
import RegisterCard from "../../components/RegisterCard";


import "./styles.css";

export default function Login() {
  const [cardMode, setCardMode] = useState(false);

  function handleCardForm() {
    if (cardMode) {
      return (

        <RegisterCard
          clickedLink={() => {
            setCardMode(false);
          }}
        />
      );
    } else {
      return (
        <LoginCard
          clickedLink={() => {
            setCardMode(true);
          }}
        />
      );
    }
  }

  return (
    <>
      <div className="div-content-login-register">
        <div className="div-background-yellow">
          <div className="div-logo-title">
            <img className="logo-ml" src={logo} alt="LogoMercadoEntrega" />
            <h2>KaolinHub</h2> 
          </div>

          {handleCardForm()}
        </div>
        <div className="div-image-svg">
          <img src={imageSvg} alt="LoginSvg" />
        </div>
      </div>
    </>
  );
}
