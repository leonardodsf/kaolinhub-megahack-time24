import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
import api from "../../services/api";
import cep from "cep-promise";
import ButtonBlue from "../../components/ButtonBlue";
import Modal from '../../components/Modal';
import { FiArrowLeft, FiX } from "react-icons/fi";
// import { validate, required, email } from "sm-form-validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterCard(props) {
  const notify = (message) => toast.error(message);
  const history = useHistory();
  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    document: "",
    type: "",
    phone: {
      areaCode: "",
      number: "",
    },
    address: {
      street: "",
      district: "",
      zipCode: "",
      city: "",
      state: "",
      number: "",
      complement: "",
    },
    car: {
      model: "",
      plate: "",
      measures: {
        height: 0,
        width: 0,
        length: 0,
      },
    },
  });

  const handleRegister = () => {
    if (formData.type === "D") {
      setModal(true);
    } else {
      RequestRegister(formData);
    }
  }

  function RequestRegister(data) {
    console.log('finalData', formData)
    setSpinner(true);
    api
      .post("/register", data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.data.user));
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData.type === "S") {
          notify("Você foi cadastrado com sucesso!");
          return history.push("/dashboard");
        } else {
          notify("Você foi cadastrado com sucesso!");
          return history.push("/dashboardDriver");
        }
      })
      .catch((err) => {
        notify(err.response.data.message);
        setSpinner(false);
      });
  }

  async function handleGetCep() {
    if (formData.address.zipCode.length === 8) {
      await cep(formData.address.zipCode)
        .then((response) => {
          let tempData = JSON.parse(JSON.stringify(formData))
          tempData.address = {
            street: response.street,
            district: response.neighborhood,
            city: response.city,
            state: response.state,
            zipCode: formData.address.zipCode,
            complement:''
          }
          setFormData(tempData)
        }).catch((err) => {
          notify(err.errors[1].message);
        });
    }
  }

  function handleCloseModal() {
    setModal(false);
  }

  return (
    <>
      { 
          <Modal open={modal}>
            <div className="div-title-model">
              <FiX onClick={handleCloseModal} className="icon-close-modal" />
              <h2>Preencha os dados do seu veículo</h2>
            </div>
            <div className="div-input-model">
              <input
                className="input input-model "
                type="text"
                placeholder="Modelo"
                value={formData.car.model}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    car: {
                      ...formData.car,
                      model: e.target.value,
                    },
                  });
                }}
              />
              <input
                className="input input-model "
                type="text"
                placeholder="Placa"
                value={formData.car.plate}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    car: {
                      ...formData.car,
                      plate: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="div-title-model">
              <h2>Tamanho de pacote suportado</h2>
            </div>
            <div className="div-input-model">
              <input
                className="input row-input-model"
                type="text"
                placeholder="Altura"
                value={formData.car.measures.height}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    car: {
                      ...formData.car,
                      measures: {
                        ...formData.car.measures,
                        height: e.target.value,
                      }
                    },
                  });
                }}
              />
              <input
                className="input row-input-model"
                type="text"
                placeholder="Largura"
                value={formData.car.measures.width}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    car: {
                      ...formData.car,
                      measures: {
                        ...formData.car.measures,
                        width: e.target.value,
                      }
                    },
                  });
                }}
              />
              <input
                className="input row-input-model"
                type="text"
                placeholder="Tamanho"
                value={formData.car.measures.length}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    car: {
                      ...formData.car,
                      measures: {
                        ...formData.car.measures,
                        length: e.target.value,
                      }
                    },
                  });
                }}
              />
            </div>
            <div className="button-open-modal">
              <ButtonBlue
                title="Criar conta"
                loading={spinner}
                onClick={() => RequestRegister(formData)}
              />
            </div>
          </Modal>
      }
      <div className="div-register-card">
        <ToastContainer />
        <div className="div-title-card-register">
          <h2>Crie sua conta já!</h2>
        </div>
        <div className="div-input">
          <input
            className="input row-input"
            type="text"
            placeholder="Nome completo"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <input
            className="input row-input"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <input
            className="input row-input"
            type="text"
            placeholder="CPF"
            value={formData.document}
            onChange={(e) => {
              setFormData({ ...formData, document: e.target.value });
            }}
          />
        </div>
        <div className="div-input">
          <input
            className="input row-input-area-code"
            type="text"
            placeholder="DDD"
            value={formData.phone.ddd}
            onChange={(e) => {
              setFormData({
                ...formData,
                phone: {
                  ...formData.phone,
                  areaCode: e.target.value,
                },
              });
            }}
          />
          <input
            className="input row-input-phone"
            type="text"
            placeholder="Celular"
            value={formData.phone.number}
            onChange={(e) => {
              setFormData({
                ...formData,
                phone: {
                  ...formData.phone,
                  number: e.target.value,
                },
              });
            }}
          />
          <input
            className="input row-input"
            type="text"
            placeholder="CEP"
            onBlur={handleGetCep}
            value={formData.address.zipCode}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  zipCode: e.target.value,
                },
              });
            }}
          />
          <input
            className="input row-input"
            type="text"
            placeholder="Logradouro"
            value={formData.address.street}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  street: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className="div-input">
          <input className="input row-input" type="text" placeholder="Número"
            value={formData.address.number}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  number: e.target.value,
                },
              });
            }}
          />
          <input
            className="input row-input"
            type="text"
            placeholder="Bairro"
            value={formData.address.district}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  district: e.target.value,
                },
              });
            }}
          />
          <input
            className="input row-input"
            type="text"
            placeholder="Cidade"
            value={formData.address.city}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  city: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className="div-input">
          <input
            className="input row-input"
            type="text"
            placeholder="Estado"
            value={formData.address.state}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  state: e.target.value,
                },
              });
            }}
          />
          <input
            className="input row-input"
            type="text"
            placeholder="Complemento"
            onChange={(e) => {
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  complement: e.target.value,
                },
              });
            }}
          />
          <select
            name="type"
            className="input row-input"
            value={formData.type}
            onChange={(e) => {
              setFormData({
                ...formData,
                type: e.target.value,
              });
            }}
          >
            <option value="" >
              Selecione um tipo
          </option>
            <option value="S">Vendedor</option>
            <option value="D">Motorista</option>
          </select>
        </div>
        <div className="div-input">
          <input
            className="input row-input"
            type="password"
            placeholder="Senha"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <input
            className="input row-input"
            type="password"
            placeholder="Confirmar senha"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
            }}
          />
        </div>
        <div className="div-btn-terms">
          <h4>
            Ver o <b>contrato</b> do Mercado Livre Ao cadastrar-me, declaro que
          sou maior de idade e aceito os <b>Termos e condições</b> e as
          <b> Políticas de privacidade </b>
          do Mercado Livre e do Mercado Pago.
        </h4>
          <ButtonBlue
            title="Criar conta"
            loading={spinner}
            onClick={handleRegister}
          />
        </div>
        <div className="div-go-create-account-register ">
          <span className="link-go-create-account" onClick={props.clickedLink}>
            <FiArrowLeft />
            Já tenho conta
          </span>
        </div>
      </div>
    </>
  );
}
