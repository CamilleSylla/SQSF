import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../context/userLog";
import style from "../styles/createarticle.module.scss";
import { storage } from "../firebase/firebase";

export default function CreateArticle({ getGenre, getCategories}) {
  const [user, setUser] = useContext(UserContext);
  const [item, setItem] = useState({
    vendeur: user.society,
    images: [],
  });


  const [image, setImage] = useState(null);

  const fileList = [];
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]);
      fileList.push(e.target.files[i]);
    }
    setImage(fileList);
  };
  const fileUrl = [];

  const handleUpload = (e) => {
    e.preventDefault();
    image.forEach((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              item.images.push(url);
            });
        }
      );
    });
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
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={Submit} className={style.create_article_wrapper}>
        <div className={style.sectionnng}>
          <label>Fiche produit</label>
          <input
            type="text"
            onChange={onNameChange}
            placeholder="Nom du produit"
          />
          <input type="text" onChange={onBrandChange} placeholder="Marque" />
          <input
            type="number"
            onChange={onpriceChange}
            min="0.01"
            step="0.01"
            placeholder="Prix"
          />
          <input
            type="number"
            onChange={onpromotionChange}
            placeholder="Promotion"
          />
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
          </div>
        </div>
        <div className={style.sectionnng}>
          <label>Informations produit</label>
          <textarea
            type="text"
            onChange={ondescriptionChange}
            placeholder="Description du produit"
          />
          <input type="text" onChange={onmatiereChange} placeholder="Matiere" />
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
      <div className={style.sectionnng}>
        <label>Images du produit</label>
        <input type="file" onChange={handleChange} multiple="multiple" />
        <button onClick={handleUpload}>Importé les images</button>
      </div>
    </>
  );
}
