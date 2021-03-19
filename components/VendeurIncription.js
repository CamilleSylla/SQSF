import { useState } from "react";
import style from "../styles/sellerregister.module.scss";

import axios from "axios";

export default function VendeurInscription({stripe}) {
  const [submit, setSubmit] = useState({
    society: "",
    email: "",
    password: "",
    siret: "",
    siege: "",
    city: "",
    cp: "",
    name: "",
    lastname: "",
  });

  const onNameChange = (e) => {
    setSubmit({ ...submit, name: e.target.value });
  };
  const onLastNameChange = (e) => {
    setSubmit({ ...submit, lastname: e.target.value });
  };
  const onEmailChange = (e) => {
    setSubmit({ ...submit, email: e.target.value });
  };
  const onPasswordChange = (e) => {
    setSubmit({ ...submit, password: e.target.value });
  };
  const onSocietyChange = (e) => {
    setSubmit({ ...submit, society: e.target.value });
  };
  const onSiretChange = (e) => {
    setSubmit({ ...submit, siret: e.target.value });
  };
  const onSiegeChange = (e) => {
    setSubmit({ ...submit, siege: e.target.value });
  };
  const onCityChange = (e) => {
    setSubmit({ ...submit, city: e.target.value });
  };
  const onCPChange = (e) => {
    setSubmit({ ...submit, cp: e.target.value });
  };

  const Submit = (e) => {
    e.preventDefault()
    console.log(submit);
    axios
      .post(`http://localhost:3001/api/user/auth/stripe/${stripe}`, submit)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form className={style.form_container} onSubmit={Submit}>
        <label>Représentant</label>
        <input
          className="input_neumorph"
          type="text"
          placeholder="Nom"
          onChange={onNameChange}
        />
        <input
          className="input_neumorph"
          type="text"
          placeholder="Prénom"
          onChange={onLastNameChange}
        />
        <input
          type="email"
          placeholder="Adresse email"
          onChange={onEmailChange}
          className="input_neumorph"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={onPasswordChange}
          className="input_neumorph"
        />
        <label>Société</label>
        <input
          type="text"
          placeholder="Nom de la société"
          onChange={onSocietyChange}
          className="input_neumorph"
        />
        <input
          type="Number"
          placeholder="N° de SIRET"
          onChange={onSiretChange}
          className="input_neumorph"
        />
        <input
          type="text"
          placeholder="Adresse du siège social"
          onChange={onSiegeChange}
          className="input_neumorph"
        />
        <input
          className="input_neumorph"
          type="text"
          placeholder="Ville"
          onChange={onCityChange}
        />

        <input
          className="input_neumorph"
          type="text"
          placeholder="Code Postal"
          onChange={onCPChange}
        />
        <input
          className="input_neumorph"
          type="submit"
          value="M'inscrire"
          className={style.form_submit}
        />
      </form>
    </>
  );
}
