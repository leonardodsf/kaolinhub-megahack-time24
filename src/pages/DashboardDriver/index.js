import React,{ useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import "./styles.css";
import NavBar from "../../components/NavBar";
import ButtonBlue from '../../components/ButtonBlue';
import api from '../../services/api'
import MapComponent from '../../components/MapComponent'
import ModalComponent from '../../components/Modal'
import { ToastContainer, toast } from "react-toastify";
import { FiX } from "react-icons/fi";

const decodePolyline = require('decode-google-map-polyline');
export default function DashboardDriver() {
  const notifySuccess = (message) => toast.success(message);
  const [loading,setLoading] = useState(false)
  const [travelParams,setTravelParams] = useState([])
  const [openModal,setOpenModal] = useState(false)
  const [isOnTravel,setIsOnTravel] = useState(false)
  const [sellerData,setSellerData] = useState(false)
  const history = useHistory()
  const [positionParams,setPositionParams] = useState({
    lat:0,
    lng:0
  })

  function catchDrive(){
    setLoading(true)
    api.get('driver/search/seller',{headers:{ "Authorization" : `Bearer ${localStorage.getItem('token')}` }})
      .then(res=> { 
        let sellData = {
          tripId:res.data.data.tripId,
          sellerName:res.data.data.sellerName,
          startAddress:res.data.data.startAddress.address,
          endAddress:res.data.data.endAddress.address,
          cordinates:{
            start:{
              latitude:positionParams.lat,
              longitude:positionParams.lng
            },
            end:{
              latitude:res.data.data.endAddress.latitude,
              longitude:res.data.data.endAddress.longitude
            }
          }
        }
        setSellerData(sellData)
        setOpenModal(true)
        setLoading(false)
      })
      .catch(err =>{
        setLoading(false)
        console.log(err)
      })
  }

  function acceptDrive(){
    api.put('driver/accept/running',{tripId:sellerData.tripId},{headers:{ "Authorization" : `Bearer ${localStorage.getItem('token')}` }})
    .then(()=>{
      notifySuccess('A corrida foi aceita')
      drawLine()
    })
  }

  function drawLine(){
    setOpenModal(false)
    setIsOnTravel(true)
    api.post('driver/coordinates',sellerData.cordinates,{headers:{ "Authorization" : `Bearer ${localStorage.getItem('token')}` }})
      .then((res)=>{
        setTravelParams(decodePolyline(res.data.data.points))
      })
  }


  

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(params=>{
      let paramObject = {lng:params.coords.longitude, lat:params.coords.latitude}
      setPositionParams(paramObject)
      console.log(params)
    })
  },[history])

  return (
    <>
      <ToastContainer></ToastContainer>
      <ModalComponent open={openModal}>
      <FiX onClick={()=>setOpenModal(false)} className="icon-close-modal" />
      <div className="accept-info">
        <h4>Entrega de: {sellerData.sellerName}</h4>
        <span className="label">Endereço de Coleta:</span>
          <span className="address">{sellerData.startAddress}</span>
        <span className="label">Endereço de Entrega:</span>
          <span className="address">{sellerData.endAddress}</span>
        <span>Deseja aceitar a corrida ?</span>
        <div className="buttonModal">
          <ButtonBlue onClick={acceptDrive} title="Aceitar"></ButtonBlue>
        </div>
      </div>
      </ModalComponent>


      <div className="div-root-panel">
        <NavBar />
        {!isOnTravel ?
        <div className="buttonCard">
          <ButtonBlue title="Buscar Entregas" onClick={catchDrive} loading={loading}/>
        </div>: false
        }
        <div className="map-container">
          {isOnTravel ?
          <div className="card-seller-info">
            <h3>Entrega de: {sellerData.sellerName}</h3>
          </div> : false}
          <MapComponent actualLocal={positionParams} path={travelParams}></MapComponent>
        </div>
      </div>
    </>
  );
}
