import React from "react";
import "./styles.css";
import Loader from "react-loader-spinner";

export default function ButtonBlue(props) {
  return (
    <div className="div-button">
      <button className="button-blue" onClick={props.onClick}>
        {props.loading ? (
          <Loader type="Oval" color="#00BFFF" height={30} width={30} />
        ) : (
          props.title
        )}
      </button>
    </div>
  );
}
