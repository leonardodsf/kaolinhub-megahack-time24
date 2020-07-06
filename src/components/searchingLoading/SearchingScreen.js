import React from 'react'
import {
    FiWifi,
  } from "react-icons/fi";

export default function SearchingScreen(props){
    return (
        props.open ?
            <div className="searching-driver">
                <span>{props.title}</span>
                <FiWifi className="icon-wifi" />
            </div>
        : false
    )
}