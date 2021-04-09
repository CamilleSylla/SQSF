import axios from "axios";
import Image from "next/image";
import { useContext, useState } from "react";
import DashboardMenu from "../../../components/DashboardMenu";
import { UserContext } from "../../../context/userLog";
import { storage } from "../../../firebase/firebase";
import style from "../../../styles/maindashboard.module.scss";
import layer from "../../../styles/dashboard_profil.module.scss";

export default function ProfilInfos() {
  const [user, setUser] = useContext(UserContext);
  const [image, setImage] = useState({
    profile_picture: null,
    banniere_picture: null,
  });
  const [imageTransferred, setImageTransferred] = useState({
    bytes: 0,
    total: 0,
    nothing: "L'importation d'une image est obligatoire pour créer un produit",
  });

  const [updated, setUpdated] = useState({});

  function handleChange(e, key) {
    console.log(e.target.files[0], key);
    if (e.target.files[0]) {
      switch (key) {
        case 0:
          setImage({ ...image, profile_picture: e.target.files[0] });
          break;
        case 1:
          setImage({ ...image, banniere_picture: e.target.files[0] });
          break;
      }
    }
    console.log(image);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    Object.keys(image).forEach((key) => {
      if (image[key]) {
        console.log(image[key].name);
        const uploadTask = storage
          .ref(`images/${image[key].name}`)
          .put(image[key]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image[key].name)
              .getDownloadURL()
              .then((url) => {
                if (key == "profile_picture") {
                  setUpdated({ ...updated, profile_picture: url });
                } else {
                  setUpdated({ ...updated, banniere_picture: url });
                }

                console.log(updated);
              });
          }
        );
      }
    });
  };

  const onValidate = () => {
    console.log(updated);
    let config = {
      headers: {
        vendeur_auth_token: user.token,
      },
    };
    axios
      .patch(`http://localhost:3001/api/profil/update/${user.id}`, {
        ...updated,
      })
      .then((res) => console.log(res));
  };

  function handleTextInputChange (e, key) {
    setUpdated({...updated, [key]: e.target.value})
    console.log(updated);
  }

  return (
    <>
      <div className={style.dashboard_wrapper}>
        <DashboardMenu />

        <div className={style.el_wrapper}>
          <div style={{width: "100%", display: "flex", justifyContent: "space-evenly"}}>
            <div className={layer.options_cards}>
              <h2>Mon profil public</h2>
              <form className={layer.public_profil}>
                <label>Photo de profil</label>
                <div className="nav_button_card">
                  <Image
                    src={user.profile_picture ? user.profile_picture : "/user.svg"}
                    alt="Recherche"
                    layout="fill"
                    sizes="100%"
                    objectFit="cover"
                  />
                </div>
                <p>Modifier la photo de profil</p>
                <input type="file" onChange={(e) => handleChange(e, 0)} />
                <label>Banniere de profil</label>
                <Image
                  src={user.banniere_picture ? user.banniere_picture : "/user.svg"}
                  alt="Recherche"
                  width="100%"
                  height="150px"
                  objectFit="cover"
                />
                <p>Modifier la banniere du profil</p>
                <input type="file" onChange={(e) => handleChange(e, 1)} />
                <button onClick={handleUpload}>Importer les images</button>
              </form>
            </div>


            <div className={layer.options_cards}>
              <h2>Ma société</h2>
              <form className={layer.public_profil}>
                  <label>Nom de la société</label>
                  <input type="text" placeholder={user.society} onChange={e => handleTextInputChange(e, "society") } />
                  <label>N° de SIRET</label>
                  <input type="number" onChange={e => handleTextInputChange(e, "siret") } />
                  <label>Adresse du Siège Social</label>
                  <input type="text" placeholder="N° et rue"onChange={e => handleTextInputChange(e, "siege") } />
                  <input type="text" placeholder="Ville"onChange={e => handleTextInputChange(e, "city") } />
                  <input type="number" placeholder="Code Postale" onChange={e => handleTextInputChange(e, "cp") } />
              </form>
            </div>
            <div className={layer.options_cards}>
              <h2>Personne physique</h2>
              <form className={layer.public_profil}>
                  <label>Identité</label>
                  <input type="text" placeholder="Prénom" onChange={e => handleTextInputChange(e, "name") } />
                  <input type="text" placeholder="Nom" onChange={e => handleTextInputChange(e, "lastname") } />
                  <label>Informations de contact</label>
                  <input type="text" placeholder="email" onChange={e => handleTextInputChange(e, "email") } />


                 
              </form>
            </div>
          </div>
        <button onClick={onValidate}>Validée les changements</button>
        </div>
      </div>
    </>
  );
}
