import React, { useState } from "react";
import "./styles.css";
import api from "../../services/api";
import ButtonBlue from "../../components/ButtonBlue";
import { validate, required, email } from "sm-form-validation";
import { FiArrowRight } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginCard(props) {
  const notify = (message) => toast.error(message);
  const history = useHistory();
  const [spinner, setSpinner] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => RequestLogin(formData);

  function RequestLogin(data) {
    setSpinner(true);
    api
      .post("/login", data)
      .then(async(res) => {
        await localStorage.setItem("token", res.data.data.token);
        await localStorage.setItem("userData", JSON.stringify(res.data.data.user));

        const userData = JSON.parse(localStorage.getItem("userData"));

        if (userData.type === "S") {
          return history.push("/dashboard");
        } else {
          return history.push("/dashboardDriver");
        }
      })
      .catch((err) => {
        notify(err.response.data.message);
        setSpinner(false);
      });
  }

  function handleValidateForm() {
    validate([
      {
        [formData.email]: [
          email("Email inválido, tente outro novamente!"),
          required("Campo email é obrigatório"),
        ],
      },
      {
        [formData.password]: [required("Campo senha é obrigatório")],
      },
    ])
      .then(() => {
        handleLogin();
      })
      .catch((err) => {
        notify(err[0].status);
      });
  }

  return (
    <div className="div-login-card">
      <ToastContainer />
      <div className="div-title-card-login">
        <h2>Faça seu logon</h2>
      </div>
      <div className="div-input-login">
        <input
          className="input"
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Senha"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <a className="link-forgot-password" href="https://google.com">
          esqueci minha senha
        </a>
      </div>
      <div className="button-container">
        <ButtonBlue
          title="entrar"
          loading={spinner}
          onClick={handleValidateForm}
        />
      </div>
      <div className="div-go-create-account">
        <span className="link-go-create-account" onClick={props.clickedLink}>
          Criar nova conta
          {spinner}
          <FiArrowRight />
        </span>
      </div>
    </div>
  );
}
