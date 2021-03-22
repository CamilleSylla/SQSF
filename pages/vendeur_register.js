import Image from "next/image";
import style from "../styles/register.module.scss";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { vendeurInscriptionContext } from "../context/vendInscription";
import axios from "axios";

export default function VendeurRegister() {
  const [submit, setSubmit] = useState({
    society: "",
    email: "",
    password: "",
    siret: "",
    siege: "",
    city: "",
    cp: "",
    name: "",
    lastname: ""
  });
  const [step, setStep] = useState(1);
  const router = useRouter();
  const code = router.query.code;

  if (code && step === 1) {
    setStep(2);
  }

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
      .post(`http://localhost:3001/api/user/auth/stripe/${code}`, submit)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  function Steps() {
    switch (step) {
      case 1:
        return (
          <div className={style.form_wrapper}>
            <div className="round_btn">
              <Image
                src="/stripe.svg"
                alt="Recherche"
                width="60px"
                height="60px"
                objectFit="contain"
              />
            </div>
            <h6>Connexion / Création de votre compte Stripe</h6>
            <p>
              Afin d'assurer des paiment sécurisés et des verifications de
              compte, SQMarket s'associe a Stripe pour gerer le smodalités de
              paiments.
            </p>
            <a
              href="https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=ca_J3LzqEAjCcRQ8l5cUVfhCwzBD42UDPY5&scope=read_write"
              class="stripe-connect"
            >
              <span>Connexion à</span>
            </a>
          </div>
        );
      case 2:
        return (
          <div className={style.form_wrapper}>
            <div className="round_btn">
              <Image
                src="/user.svg"
                alt="Recherche"
                width="40px"
                height="40px"
                objectFit="contain"
              />
            </div>
            <h6>Informations du gestionnaire du compte SQMarket</h6>
            <p>
              Merci de bien vouloir fournir vos informations concernant la
              personne physique qui gerera le compte
            </p>
            <form className={style.form_container}>
              <div className={style.form_split}>
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
              </div>
              <div className={style.form_split}>
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
              </div>
            </form>
            <div className="global_button" onClick={() => setStep(step + 1)}>
              Suivant →
            </div>
          </div>
        );

      case 3:
        return (
          <div className={style.form_wrapper}>
            <div className="round_btn">
              <Image
                src="/shop.svg"
                alt="Recherche"
                width="40px"
                height="40px"
                objectFit="contain"
              />
            </div>
            <h6>Informations concernant votre entreprise</h6>
            <p>
              Merci de bien vouloir fournir vos informations concernant votre
              entreprise
            </p>
            <form className={style.form_container}>
              <div className={style.form_split}>
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
              </div>
              <div className={style.form_split}>
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
              </div>
            </form>
            <div className="global_button" onClick={() => setStep(step + 1)}>
              Suivant →
            </div>
          </div>
        );
      case 4:
        return (
          <div className={style.form_wrapper}>
            <div className="round_btn">
              <Image
                src="/id.svg"
                alt="Recherche"
                width="60px"
                height="60px"
                objectFit="contain"
              />
            </div>
            <h6>Récapitulatif d'informations</h6>

            <form className={style.verif}>
              <div className={style.form_split}>
              <div className={style.steps}>
              <Image
                src="/user.svg"
                alt="Recherche"
                width="20px"
                height="20px"
                objectFit="contain"
              />
              </div>
              Déteneur du compte
                <input
                  className="input_neumorph"
                  type="text"
                  placeholder={submit.name}
                  onChange={onNameChange}
                />
                <input
                  className="input_neumorph"
                  type="text"
                  placeholder={submit.lastname}
                  onChange={onLastNameChange}
                />
                <input
                  type="email"
                  placeholder={submit.email}
                  onChange={onEmailChange}
                  className="input_neumorph"
                />

                <div onClick={Submit} className="global_button">
                    Confirmé et m'inscrire
                </div>
              </div>
              <div className={style.form_split}>
              <div className={style.steps}>
              <Image
                src="/shop.svg"
                alt="Recherche"
                width="20px"
                height="20px"
                objectFit="contain"
              />
              </div>
              Informations d'entreprise
              <input
                  type="text"
                  placeholder={submit.society}
                  onChange={onSocietyChange}
                  className="input_neumorph"
                />
                <input
                  type="Number"
                  placeholder={submit.siret}
                  onChange={onSiretChange}
                  className="input_neumorph"
                />
                <input
                  type="text"
                  placeholder={submit.siege}
                  onChange={onSiegeChange}
                  className="input_neumorph"
                />
                <input
                  className="input_neumorph"
                  type="text"
                  placeholder={submit.city}
                  onChange={onCityChange}
                />

                <input
                  className="input_neumorph"
                  type="text"
                  placeholder={submit.cp}
                  onChange={onCPChange}
                />
              </div>
            </form>
          </div>
        );
    }
  }

  return (
    <>
      <div className={style.inscri_vend_wrapper}>
        <div className={style.steps_wrapper}>
          <div className={style.steps}>
            <Image
              src="/stripe.svg"
              alt="Recherche"
              width="30px"
              height="30px"
              objectFit="contain"
            />
          </div>
          <div className={style.steps}>
            <Image
              src="/user.svg"
              alt="Recherche"
              width="20px"
              height="20px"
              objectFit="contain"
            />
          </div>
          <div className={style.steps}>
            <Image
              src="/shop.svg"
              alt="Recherche"
              width="20px"
              height="20px"
              objectFit="contain"
            />
          </div>
          <div className={style.steps}>
            <Image
              src="/id.svg"
              alt="Recherche"
              width="25px"
              height="25px"
              objectFit="contain"
            />
          </div>
          <div className={style.steps}>
            <Image
              src="/thumb.svg"
              alt="Recherche"
              width="25px"
              height="25px"
              objectFit="contain"
            />
          </div>
        </div>
        {Steps()}
              <div style={{margintop: "20px"}} className="global_button" onClick={() => setStep(step - 1)}>← Precedent</div>
      </div>
    </>
  );
}
