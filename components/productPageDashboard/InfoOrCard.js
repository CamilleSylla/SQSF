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
  getGenre,
  getCategories,
  sizesSelect,
}) {
  const [user, setUser] = useContext(UserContext);
  const [item, setItem] = useState({
    vendeur: user.society,
    vendeur_id: user.id,
  });
  const [image, setImage] = useState([]);
  const [typeSize, setTypeSize] = useState();
  const [sizes, setSizes] = useState({});

  const fileList = [];

  function sizeTable() {
    return (
      <div>
        {typeSize.sizes.map((sizes, i) => {
          return (
            <div>
              {sizes}
              <input type="number" onChange={e => onSizeChange(sizes, e.target.value)}/>
            </div>
          );
        })}
      </div>
    );
  }

  const pickSize = (e) => {
    const target = sizesSelect.find((size) => (size._id == e.target.value));
    setTypeSize(target);
  };

  function onSizeChange (key, e) {
    setSizes({...sizes, [key]: e})
    console.log(sizes);
  } 

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

  function handleUpload(e) {
    e.preventDefault();
    if (image.length) {
      const allUrl = Promise.all(
        image.map((singleImage) => {
          return new Promise((resolve, reject) => {
            const uploadTask = storage
              .ref(`images/${singleImage.name}`)
              .put(singleImage);
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
                    resolve(url);
                  })
                  .catch(function (err) {
                    reject(err);
                  });
              }
            );
          });
        })
      ).then((allUrls) => {
        let config = {
          headers: {
            vendeur_auth_token: user.token,
          },
        };
        console.log({ ...item, images: allUrls, sizes:sizes });
        axios
          .post(
            `http://localhost:3001/api/items/create`,
            { ...item, images: allUrls, sizes:sizes },
            config
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });
    } else {
      console.log(
        "vous devez inserer au moin une image pour présenter votre produit"
      );
    }
  }
  function onItemChange(e, key) {
    setItem({ ...item, [key]: e.target.value });
  }

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
              onSubmit={(e) => handleUpload(e)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label>Fiche produit</label>
              <input
                type="text"
                onChange={(e) => onItemChange(e, "name")}
                placeholder="Nom du produit"
              />
              <input
                type="text"
                onChange={(e) => onItemChange(e, "brand")}
                placeholder="Marque"
              />
              <input
                type="number"
                onChange={(e) => onItemChange(e, "price")}
                min="0.01"
                step="0.01"
                placeholder="Prix"
              />

              {item.price ? <SimulateurPrix price={item.price} /> : null}
              <input
                type="number"
                onChange={(e) => onItemChange(e, "promotion")}
                placeholder="Promotion"
              />
              <select onChange={(e) => onItemChange(e, "categorie")}>
                <option value="">
                  {item.categorie
                    ? `Ce poduit est catégoriser sous " ${item.categorie} "`
                    : "Veuillez une catégorie de produit"}
                </option>
                {getCategories.map((cat) => {
                  return <option value={cat.name}>{cat.name}</option>;
                })}
              </select>
              <select onChange={(e) => onItemChange(e, "genre")}>
                <option value="">
                  {item.genre
                    ? `Ce poduit est classer sous le genre " ${item.genre} "`
                    : "Veuillez une genrer ce produit"}
                </option>
                {getGenre.map((genre) => {
                  return <option value={genre.name}>{genre.name}</option>;
                })}
              </select>
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
              <label>Stock disponible par taille</label>
              <select onChange={pickSize}>
                <option>Selectionner un type de taille</option>
                {sizesSelect.map((sizes, i) => {
                  return <option value={sizes._id}>{sizes.name}</option>;
                })}
              </select>
              {typeSize ? sizeTable() : null}
              <div className={style.create_size}>
                <label>Informations produit</label>
                <textarea
                  type="text"
                  onChange={(e) => onItemChange(e, "description")}
                  placeholder="Description du produit"
                />
                <input
                  type="text"
                  onChange={(e) => onItemChange(e, "matiere")}
                  placeholder="Matiere"
                />

                <input type="submit" value="Ajouter" />
              </div>
            </form>
          </div>
        </div>
      );
    default:
  }
}
