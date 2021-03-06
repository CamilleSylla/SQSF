import axios from "axios";
import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "../context/userLog";
import style from "../styles/login.module.scss";

export default function Login() {
  const [user, setUser] = useContext(UserContext);
  console.log(user);
  const [connect, setConnect] = useState({
    email: "",
    password: "",
  });

  const onEmailChange = (e) => {
    setConnect({ ...connect, email: e.target.value });
  };
  const onPasswordChange = (e) => {
    setConnect({ ...connect, password: e.target.value });
  };
  const Submit = (e) => {
    axios
      .post("http://localhost:3001/api/user/auth/connexion/vendeur", connect)
      .then((res) =>
        setUser({
          id: res.data.id,
          society: res.data.society,
          token: res.headers.vendeur_auth_token,
        })
      )
      .catch((err) => console.log(err));
      e.preventDefault()
  };

  return (
    <>
      <div className={style.login_wrapper}>
        <div className={style.login_img}>
          <Image
            src="/login.svg"
            alt="imagecont"
            layout="fill"
            sizes="100%"
            objectFit="contain"
          />
        </div>
        <form onSubmit={Submit}>
          <div className={style.form_img}>
            <Image
              src="/sqmarket.svg"
              alt="imagecont"
              width="auto"
              height="50%"
            />
          </div>
          <input
            type="email"
            onChange={onEmailChange}
            placeholder="Adresse e-mail"
          />
          <input
            type="password"
            onChange={onPasswordChange}
            placeholder="Mot de passe"
          />
          <input
            type="submit"
            value="Connection"
            className={style.connection_btn}
          />
        </form>
      </div>
    </>
  );
}
