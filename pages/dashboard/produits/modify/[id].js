import axios from "axios";
import Image from "next/image";
import { useContext, useState } from "react";
import DashboardMenu from "../../../../components/DashboardMenu";
import { UserContext } from "../../../../context/userLog";
import style from "../../../../styles/maindashboard.module.scss";
import product from "../../../../styles/modifyproduct.module.scss";
import { storage } from "../../../../firebase/firebase";

export default function ModifyProduct({ item_m, getGenre, getCategorie }) {
  const [user, setUser] = useContext(UserContext);
  const [delivery, setDelivery] = useState({
    type: null,
  });
  const [item, setItem] = useState(item_m);
  const [image, setImage] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const handleChange = (e, imageSelector) => {
    switch (imageSelector) {
      case "PP":
        if (e.target.files[0]) {
          setImage({ ...image, image1: e.target.files[0] });
        }
        break;
      case "SP":
        if (e.target.files[0]) {
          setImage({ ...image, image2: e.target.files[0] });
        }
        break;
      case "TP":
        if (e.target.files[0]) {
          setImage({ ...image, image3: e.target.files[0] });
        }
        break;
      default:
        console.log("image non valide");
    }
  };

  const handleUpload = (e) => {
    let uploadTask;
    switch (e.target.value) {
      case "PP":
        uploadTask = storage
          .ref(`images/${image.image1.name}`)
          .put(image.image1);
        console.log(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.image1.name)
              .getDownloadURL()
              .then((url) => {
                item.images[0] = url;
                console.log(url);
              });
          }
        );
        break;
      case "SP":
        uploadTask = storage
          .ref(`images/${image.image2.name}`)
          .put(image.image2);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.image2.name)
              .getDownloadURL()
              .then((url) => {
                item.images[1] = url;
                console.log(url);
              });
          }
        );
        break;
      case "TP":
        uploadTask = storage
          .ref(`images/${image.image3.name}`)
          .put(image.image3);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.image3.name)
              .getDownloadURL()
              .then((url) => {
                item.images[2] = url;
                console.log(url);
              });
          }
        );
        break;
      default:
        console.log("image non valide");
    }
  };

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
  function onDeliveryChange(e, key) {
    setDelivery([...item, { [key]: e.target.value }]);
  }

  function timeFraction() {
    const result = [];
    const startTime = new Date("2021-09-04 08:00:00");
    const endTime = new Date("2021-09-04 19:00:00");
    for (let i = startTime; i <= endTime; i.setMinutes(i.getMinutes() + 15)) {
      const hours = {
        hours: i.getHours(),
        minutes: i.getMinutes(),
      };
      result.push(hours);
    }
    return result;
  }

  function toogleDelivery(type) {
    function delConditions (e, key) {
        setDelivery({...delivery, [key]: e})
        console.log(delivery);
    }


    switch (type) {
      case "Livraison":
        return (
          <>
            <select onChange={e => delConditions(e.target.value, "perimetre")}>
              <option>Ville</option>
              <option value="SaintQuentin">Saint-Quentin</option>
              <option value="Aisne">Aisne</option>
              <option value="France">France</option>
            </select>
            <input type="num" placeholder="Tarif de livraison" onChange={e => delConditions(e.target.value, "tarif")}/>
          </>
        );
      case "ClickCollect":
        return (
          <>
            <select onChange={e => delConditions(e.target.value, "start")}>
              <option>Du (Premier jour d'ouverture de la boutique)</option>
              <option value="1">Lundi</option>
              <option value="2">Mardi</option>
              <option value="3">Mercredi</option>
              <option value="4">Jeudi</option>
              <option value="5">Vendredi</option>
              <option value="6">Samedi</option>
            </select>
            <select onChange={e => delConditions(e.target.value, "end")}>
            <option>Au (Dernier jour d'ouverture de la boutique)</option>
              <option value="1">Lundi</option>
              <option value="2">Mardi</option>
              <option value="3">Mercredi</option>
              <option value="4">Jeudi</option>
              <option value="5">Vendredi</option>
              <option value="6">Samedi</option>
              <option value="7">Dimanche</option>
            </select>
            <select onChange={e => delConditions(e.target.value, "time_start")}>
              <option>De (Horraire ouverture de l'entreprise)</option>
                {timeFraction().map((time, i) => {
                  return (
                    <option
                      value={`${time.hours}:${time.minutes}`}
                    >{`${time.hours}:${time.minutes}`}</option>
                  );
                })}
              </select>
              <select onChange={e => delConditions(e.target.value, "time_end")}>
              <option>De (Horraire fermeture de l'entreprise)</option>
                {timeFraction().map((time, i) => {
                  return (
                    <option
                      value={`${time.hours}:${time.minutes}`}
                    >{`${time.hours}:${time.minutes}`}</option>
                  );
                })}
              </select>
          </>
        );
      default:
        return null;
    }
  }

  const ValidateDel = e => {
    e.preventDefault()
    if (item.delivery_options) {
      item.delivery_options.push(delivery)

    } else {
      setItem({...item, delivery_options: [delivery]})
    }
    setDelivery({type: null})
  }
 
  const Submit = (e) => {
    e.preventDefault();

    let config = {
      headers: {
        vendeur_auth_token: user.token,
        vendeur: user.society,
      },
    };
    console.log(item);
    axios
      .patch(
        `http://localhost:3001/api/items/update/product/${item._id}`,
        { ...item },
        config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  return (
    <>
      <div className={style.dashboard_wrapper}>
        <DashboardMenu />
        <div className={product.el_wrapper}>
          <div className={product.imageschoice}>
            <div className={product.imagePic}>
              <div className={product.imageContainer}>
                <Image
                  src={item.images[0] ? item.images[0] : "/image.svg"}
                  alt="Image principal"
                  layout="fill"
                  sizes="100%"
                  objectFit="cover"
                />
              </div>
              <input type="file" onChange={(e) => handleChange(e, "PP")} />
              <button value="PP" onClick={handleUpload}>
                Remplacer
              </button>
            </div>
            <div className={product.imagePic}>
              <div className={product.imageContainer}>
                <Image
                  src={item.images[1] ? item.images[1] : "/image.svg"}
                  alt="Image principal"
                  layout="fill"
                  sizes="100%"
                  objectFit="cover"
                />
              </div>
              <input type="file" onChange={(e) => handleChange(e, "SP")} />
              <button value="SP" onClick={handleUpload}>
                Remplacer
              </button>
            </div>
            <div className={product.imagePic}>
              <div className={product.imageContainer}>
                <Image
                  src={item.images[2] ? item.images[2] : "/image.svg"}
                  alt="Image principal"
                  layout="fill"
                  sizes="100%"
                  objectFit="cover"
                />
              </div>
              <input type="file" onChange={(e) => handleChange(e, "TP")} />
              <button value="TP" onClick={handleUpload}>
                Remplacer
              </button>
            </div>
          </div>
          <div className={product.formModify}>
            <form>
              <label>Methode de Livraison</label>
              <select
                onChange={(e) =>
                  setDelivery({type: e.target.value })
                }
              >
                <option>Methode de livraison</option>
                <option value="Livraison">Livraison</option>
                <option value="ClickCollect">Click&Collect</option>
              </select>
              {toogleDelivery(delivery.type)}
              <button onClick={ValidateDel}>Valider la methode de livraison</button>
              <input
                type="text"
                onChange={onNameChange}
                placeholder={`Nom actuelle du produit - ${item.name}`}
              />
              <input
                type="text"
                onChange={onBrandChange}
                placeholder={`Marque - ${item.brand}`}
              />
              <input
                type="number"
                onChange={onpriceChange}
                min="0.01"
                step="0.01"
                placeholder={`Prix - ${item.price}€`}
              />
              <input
                type="number"
                onChange={onpromotionChange}
                placeholder={
                  item.promotion
                    ? `promotion - ${item.promotion}%`
                    : "promotion"
                }
              />
              <input
                type="number"
                onChange={onxsChange}
                placeholder={`XS - ${item.xs}`}
              />
              <input
                type="number"
                onChange={onsChange}
                placeholder={`S - ${item.s}`}
              />
              <input
                type="number"
                onChange={onmChange}
                placeholder={`M - ${item.m}`}
              />
              <input
                type="number"
                onChange={onlChange}
                placeholder={`L - ${item.l}`}
              />
              <input
                type="number"
                onChange={onxlChange}
                placeholder={`XL - ${item.xl}`}
              />
              <input
                type="number"
                onChange={onuniqueChange}
                placeholder={`Taille unique - ${item.unique}`}
              />
              <textarea
                type="text"
                onChange={ondescriptionChange}
                placeholder={`Description du produit - ${item.description}`}
              />
              <input
                type="text"
                onChange={onmatiereChange}
                placeholder={`Matiere - ${item.matiere.map(
                  (matiere) => matiere
                )}`}
              />
              <select onChange={oncategorieChange}>
                <option value="">
                  {item.categorie
                    ? `Ce poduit est catégoriser sous " ${item.categorie} "`
                    : "Veuillez une catégorie de produit"}
                </option>
                {getCategorie.map((cat) => {
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
              <button onClick={Submit}>Validé</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const item_m = await axios
    .get(`http://localhost:3001/api/inventary/${params.id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  const getGenre = await axios
    .get(`http://localhost:3001/api/categorie/genre/only`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  const getCategorie = await axios
    .get(`http://localhost:3001/api/categorie/categorie/only`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return {
    props: {
      item_m,
      getGenre,
      getCategorie,
    },
  };
}
