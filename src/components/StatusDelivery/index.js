import React, { useState } from "react";
import { FiX, FiBell } from "react-icons/fi";
import "./styles.css";

export default function StatusDelivery() {
  const [customClassStatus, setCustomClassStatus] = useState("div-status-open");

  return (
    <>
      <div
        className="div-status-delivery"
        onClick={() => {
          setCustomClassStatus("div-status-open oppened-card");
        }}
      >
        <div className="status-delivery">
          <h2><FiBell size={24} color="#fff" /></h2>
        </div>
      </div>
      <div className={customClassStatus}>
        <div className="status-open">
          <div className="div-header-status-open">
            <FiX
              className="icon-x"
              size={28}
              onClick={() => {
                setCustomClassStatus("div-status-open");
              }}
            />
            <h2>Entregas em andamento</h2>
          </div>
          <h3>
            Estas são suas entregas em andamento, clique no item para mais
            detalhes
          </h3>
          <div className="div-product-status-open">
            <h4>
              Psp 3000 Original Playstation Na Caixa S/ Bateria Otimo Estado
            </h4>
            <h4>1x</h4>
          </div>
        </div>
      </div>
    </>
  );
}
