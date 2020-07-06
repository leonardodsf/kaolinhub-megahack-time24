import React, { useEffect,useState } from "react";
import { useHistory } from "react-router-dom"

import {
  FiSearch,
  FiPower,
} from "react-icons/fi";
import "./styles.css";
import logo from "../../assets/logo-branco.svg";
import imageUser from "../../assets/user.png";
import ButtonBlue from "../../components/ButtonBlue";
import StatusDelivery from "../../components/StatusDelivery";
import api from '../../services/api'
import { ToastContainer, toast } from "react-toastify";
import Loader from "react-loader-spinner";
import Modal from '../../components/Modal';
// import SearchingScreen from "../../components/searchingLoading/SearchingScreen";

export default function Dashboard() {
  const notify = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const [sales, setSales] = useState([])
  const [selectedSales, setSelectedSales] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const history = useHistory()
  
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userData'))
    if (userData.mlLogged === false) {
      history.push('/verify-token')
    }else{
      setLoading(true)
      api.get('ml/sales',{headers:{ "Authorization" : `Bearer ${localStorage.getItem('token')}` }})
        .then(res => {
          setSales(res.data.data)
          setLoading(false)
        }) 
    }
  },[history])
  
  function selectItem(item){
    let tempSelected = JSON.parse(JSON.stringify(selectedSales))
    tempSelected.push(item)
    setSelectedSales(tempSelected)
  }
  function removeItem(item){
    let tempSelected = JSON.parse(JSON.stringify(selectedSales))
    
    tempSelected.map((product,index) =>{
      if(product.mlProductId.includes(item.mlProductId)){
        tempSelected.splice(index,1)
      }
      return true
    })
    setSelectedSales(tempSelected)
  }

  function requestDriver(){
    if(selectedSales.length > 0){
      setLoadingButton(true)
      api.post('seller/request/withdrawal',selectedSales,{headers:{ "Authorization" : `Bearer ${localStorage.getItem('token')}` }})
        .then(res=>{
          console.log(res)
          setLoadingButton(false)
          notifySuccess('Uma entrega foi solicitada 😀')
          setSelectedSales([])
        })
        .catch(err=>{
          notify('Ocorreu um erro ao chamar um entregador ')
          setLoadingButton(false)
        })
    }else{
      notify('Selecione um produto')
    }
  }
  return (
    <>
      <Modal>
      </Modal>
      <ToastContainer></ToastContainer>
      <div className="dashboard-main">
        <div className="div-header-yellow">
          <div className="div-header-nav">
            <div>
              <img
                className="logo-ml-dashboard"
                src={logo}
                alt="LogoMercadoEntrega"
              />
            </div>
            <div className="div-dashboard-user">
              <div className="div-photo-user">
                <img className="image-user" src={imageUser} alt="ImageUser" />
              </div>
              <FiPower className="icon-logout-dashboard" onClick={()=> {
                  localStorage.removeItem('token')
                  history.push('/')
                }
              } />
            </div>
          </div>
        </div>
        <div className="div-content-card">
          <div className="div-card-info">
            <div className="div-header-card-info">
              <h2>Verificação de Produtos</h2>
              <h3>Produtos Adicionados</h3>
            </div>
            <div className="div-card-selected-items">
              { 
                selectedSales.length < 1 ? 
                  <span>Nenhum item selecionado</span>
                  :
                  selectedSales.map(sales=>{
                    return  <div key={sales.mlProductId} className="div-selected-item">
                              <span>
                                {sales.title}
                              </span>
                              <span>{sales.quantity}</span>
                            </div>
              })}
            </div>
            <div className="checkout-area">
              <div className="label-checkout">
                <span>Total de produtos: {selectedSales.length}</span>
                <span>Peso total: {selectedSales.reduce((result,sales)=>{
                  return result += sales.weight
                },0)}</span>
              </div>
              <div className="button-area">
                <ButtonBlue title="Chamar entregador" loading={loadingButton} onClick={requestDriver}></ButtonBlue>
              </div>
            </div>
          </div>
        </div>
        <div className="div-input-search">
          <input
            type="text"
            className="input"
            placeholder="Pesquisar produtos"
          />
          <div className="div-icon-search">
            <FiSearch className="icon-search" />
          </div>
        </div>
        <div className="div-list-products">
          <div className="div-card-list">
            <h3>Lista de Produtos:</h3>

                {
                  loading 
                  ?
                  <Loader type="Oval" className="spinner-center" color="#00BFFF" height={70} width={70} />
                  :
                  sales.map((sale)=>{
                    return (
                      <div className="list-item" key={sale.mlProductId} >
                        <div>
                          <img
                            className="image-product"
                            src={sale.photo}
                            alt="ImageProduct"
                          />
                        </div>
                        <div className="table-title">{sale.title}</div>
                        <div>{sale.price}</div>
                        <div>{sale.quantity}</div>
                        <div>
                          {sale.status}
                          <input type="checkbox" className="checkbox-select-item" onChange={ (e)=>e.target.checked ? selectItem(sale) : removeItem(sale) }>
                          </input>
                        </div>
                      </div>
                    )
                  })
                }
            <StatusDelivery />
          </div>
        </div>
      </div>
      
    </>
  );
}
