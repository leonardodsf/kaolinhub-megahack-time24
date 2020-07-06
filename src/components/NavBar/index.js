import React, { useState } from "react";
import { FiMenu, FiX, FiPower } from "react-icons/fi";
import "./styles.css";
import imageUser from "../../assets/user.png";
import logo from '../../assets/logo.svg';

export default function DashboardDriver() {
  const [customClass, setCustomClass] = useState("sideNav");
  return (
    <>
      <div className="mainNavBar">
        <div className="sideMenuButton menu-item">
          <FiMenu
            className="icon-menu"
            onClick={() => {
              setCustomClass("sideNav sideNav-open");
            }}
          ></FiMenu>
        </div>
        <div className="balance menu-item">
          <h4>Seu saldo</h4>
          <h2>R$ 2.321,02</h2>
        </div>
        <div className="profile menu-item">
          <div className="div-photo-user">
            <img className="image-user" src={imageUser} alt="ImageUser" />
          </div>
        </div>
      </div>

      <div className={customClass}>
        <div className="profile-area">
          <span
            className="close-button"
            onClick={() => {
              setCustomClass("sideNav");
            }}
          >
            <FiX />
          </span>
          <img className="logo-navbar" src={logo} alt="Logo"/>
          <div className="profile-photo">
            <img className="image-profile" src={imageUser} alt="ImageProfile" />
            <h4>Leonardo Flores</h4>
          </div>
        </div>
        <div className="content-area">
          <ul className="content-area-ul">
            <li>
              Perfil
            </li>
            <li>
              Minhas corridas
            </li>
            <li>
              Ganhos
            </li>
            <li>
              Configurações
            </li>
            <li>
              Ajuda
            </li>
          </ul>
        </div>
        <div className="div-logout">
          <ul className="div-logout-ul">
            <li onCLick={() => {}}>
              <FiPower className="icon-logout"/>
              Sair da conta
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
