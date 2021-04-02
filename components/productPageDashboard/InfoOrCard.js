import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userLog";
import SimulateurPrix from "../SimulateurPrix";
import style from "../../styles/maindashboard.module.scss";
import Image from "next/image";
import axios from "axios";
import { storage } from "../../firebase/firebase";

export default function InfoOrCard({
  addItem,
  target,
  sizes,
  getGenre,
  getCategories,
}) {
  const [user, setUser] = useContext(UserContext);
  const [item, setItem] = useState({
    vendeur: user.society,
    vendeur_id: user.id,
    images: [],
  });
  const [image, setImage] = useState([]);

  const fileList = [];

  // const handleChange = e => {
  //       if (e.target.files[0]) {
  //           setImage(e.target.files[0])
  //       }
  //   };

  function handleChange(e, key) {
    console.log(e.target.files[0], key);
    if (e.target.files[0]) {
      switch (key) {
        case 0:
          image.splice(key, 0, e.target.files[0]);
          break;
        case 1:
          image.splice(key, 0, e.target.files[0]);
          break;
        case 2:
          image.splice(key, 0, e.target.files[0]);
          break;
      }
    }
    console.log(image);
  }
  const fileUrl = [];

   const handleUpload = e => {
    e.preventDefault()
    image.map((singleImage) => {
      const uploadTask = storage.ref(`images/${singleImage.name}`).put(singleImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(singleImage.name)
            .getDownloadURL()
            .then((url) => {
              item.images.push(url);
              console.log(item.images);
            });
        }
      );
    });
  }
  const onNameChange = (e) => {
    setItem({ ...item, name: e.target.value });
  };
  const onBrandChange = (e) => {
    setItem({ ...item, brand: e.target.value });
  };
  const onpriceChange = (e) => {
    setItem({ ...item, price: e.target.value });
  };
  const onpromotionChange = (e) => {
    setItem({ ...item, promotion: e.target.value });
  };
  const onxsChange = (e) => {
    setItem({ ...item, xs: e.target.value });
  };
  const onsChange = (e) => {
    setItem({ ...item, s: e.target.value });
  };
  const onmChange = (e) => {
    setItem({ ...item, m: e.target.value });
  };
  const onlChange = (e) => {
    setItem({ ...item, l: e.target.value });
  };
  const onxlChange = (e) => {
    setItem({ ...item, xl: e.target.value });
  };
  const onuniqueChange = (e) => {
    setItem({ ...item, unique: e.target.value });
  };
  const onmatiereChange = (e) => {
    setItem({ ...item, matiere: e.target.value });
  };
  const ondescriptionChange = (e) => {
    setItem({ ...item, description: e.target.value });
  };
  const ongenreChange = (e) => {
    setItem({ ...item, genre: e.target.value });
  };
  const oncategorieChange = (e) => {
    setItem({ ...item, categorie: e.target.value });
  };
  const Submit = (e) => {
    e.preventDefault();

      let config = {
        headers: {
          vendeur_auth_token: user.token,
        },
      };
      console.log(item);
      axios
        .post(`http://localhost:3001/api/items/create`, item, config)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  };
  switch (addItem) {
    case true:
      return (
        <div className={style.card_info_container}>
          <div className={style.card}>
            <div className={style.user}>
              <div className="nav_button_card">
                <Image
                  src={target ? target.images[0] : "/user.svg"}
                  alt="Recherche"
                  layout="fill"
                  sizes="100%"
                  objectFit="cover"
                />
              </div>
              <h6 style={{ marginTop: "10px" }}>
                {target ? target.name + " - " + target.brand : null}
              </h6>
              <p>{target ? target.price : null}€</p>
            </div>
          </div>
          <div className={style.card}>
            <div className={style.user}>
              <div className="nav_button">
                <Image
                  src="/stock.svg"
                  alt="Recherche"
                  width="20px"
                  height="20px"
                  objectFit="contain"
                />
              </div>
              <h6 style={{ marginTop: "10px" }}>Stock produit</h6>
            </div>
            <table className={style.size}>
              <thead>
                <th>XS</th>
                <th>S</th>
                <th>M</th>
                <th>L</th>
                <th>XL</th>
              </thead>
              {target ? sizes() : null}
            </table>
          </div>
        </div>
      );
    case false:
      return (
        <div className={style.card_info_container}>
          <div className={style.big_card}>
            <div className={style.big_card_header}>
              <h6>Ajouter un nouveau produit</h6>
              <div className="nav_button">
                <Image
                  src="/add.svg"
                  alt="Recherche"
                  width="20px"
                  height="20px"
                  objectFit="contain"
                />
              </div>
            </div>
            <form
              onSubmit={Submit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label>Fiche produit</label>
              <input
                type="text"
                onChange={onNameChange}
                placeholder="Nom du produit"
              />
              <input
                type="text"
                onChange={onBrandChange}
                placeholder="Marque"
              />
              <input
                type="number"
                onChange={onpriceChange}
                min="0.01"
                step="0.01"
                placeholder="Prix"
              />

              {item.price ? <SimulateurPrix price={item.price} /> : null}
              <input
                type="number"
                onChange={onpromotionChange}
                placeholder="Promotion"
              />
              <label>Images du produit</label>
              <table className={style.import_image}>
                <thead>
                  <tr>
                    <th>
                      <div className="nav_button">
                        <Image
                          src="/defaultImage.svg"
                          alt="Recherche"
                          width="20px"
                          height="20px"
                          objectFit="contain"
                        />
                      </div>
                    </th>
                    <th>
                      <div className="nav_button">
                        <Image
                          src="/defaultImage.svg"
                          alt="Recherche"
                          width="20px"
                          height="20px"
                          objectFit="contain"
                        />
                      </div>
                    </th>
                    <th>
                      <div className="nav_button">
                        <Image
                          src="/defaultImage.svg"
                          alt="Recherche"
                          width="20px"
                          height="20px"
                          objectFit="contain"
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      <input type="file" onChange={(e) => handleChange(e, 0)} />
                    </th>
                    <th>
                      <input type="file" onChange={(e) => handleChange(e, 1)} />
                    </th>
                    <th>
                      <input type="file" onChange={(e) => handleChange(e, 2)} />
                    </th>
                  </tr>
                </tbody>
              </table>
              <button onClick={handleUpload}>
                Importé les images
              </button>
              <label>Stock disponible</label>
              <div className={style.create_size}>
                <input type="number" onChange={onxsChange} placeholder="XS" />
                <input type="number" onChange={onsChange} placeholder="S" />
                <input type="number" onChange={onmChange} placeholder="M" />
                <input type="number" onChange={onlChange} placeholder="L" />
                <input type="number" onChange={onxlChange} placeholder="XL" />
                <input
                  type="number"
                  onChange={onuniqueChange}
                  placeholder="Unique"
                />
                <label>Informations produit</label>
                <textarea
                  type="text"
                  onChange={ondescriptionChange}
                  placeholder="Description du produit"
                />
                <input
                  type="text"
                  onChange={onmatiereChange}
                  placeholder="Matiere"
                />
                <select onChange={oncategorieChange}>
                  <option value="">
                    {item.categorie
                      ? `Ce poduit est catégoriser sous " ${item.categorie} "`
                      : "Veuillez une catégorie de produit"}
                  </option>
                  {getCategories.map((cat) => {
                    return <option value={cat.name}>{cat.name}</option>;
                  })}
                </select>
                <select onChange={ongenreChange}>
                  <option value="">
                    {item.genre
                      ? `Ce poduit est classer sous le genre " ${item.genre} "`
                      : "Veuillez une genrer ce produit"}
                  </option>
                  {getGenre.map((genre) => {
                    return <option value={genre.name}>{genre.name}</option>;
                  })}
                </select>
                <input type="submit" value="Ajouter" />
              </div>
            </form>
            {/* <label>Images du produit</label>
            <input type="file" onChange={handleChange} multiple="multiple" />
            <button onClick={handleUpload} style={{marginBottom: "20px"}}>Importé les images</button> */}
          </div>
        </div>
      );
    default:
  }
}
