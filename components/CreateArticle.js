import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../context/userLog";
import style from "../styles/createarticle.module.scss";

export default function CreateArticle() {
    const [user, setUser ] = useContext(UserContext)
    const [item, setItem] = useState({
        vendeur: user.society
    })
const onNameChange = e => {
    setItem({...item, name: e.target.value})
    }
    const onBrandChange = e => {
        setItem({...item, brand: e.target.value})
    }
    const onpriceChange = e => {
        setItem({...item, price: e.target.value})
    }
    const onpromotionChange = e => {
        setItem({...item, promotion: e.target.value})
    }
    const onxsChange = e => {
        setItem({...item, xs: e.target.value})
    }
    const onsChange = e => {
        setItem({...item, s: e.target.value})
    }
    const onmChange = e => {
        setItem({...item, m: e.target.value})
    }
    const onlChange = e => {
        setItem({...item, l: e.target.value})
    }
    const onxlChange = e => {
        setItem({...item, xl: e.target.value})
    }
    const onuniqueChange = e => {
        setItem({...item, unique: e.target.value})
    }
    const onmatiereChange = e => {
        setItem({...item, matiere: e.target.value})
    }
    const ondescriptionChange = e => {
        setItem({...item, description: e.target.value})
    }
    // const onNameChange = e => {
    //     setItem({...item, name: e.target.value})
    // }
    // const onNameChange = e => {
    //     setItem({...item, name: e.target.value})
    // }
    const Submit = e => {
        let config = {
            headers: {
                vendeur_auth_token: user.token
            }
        }

        axios
        .post(`http://localhost:3001/api/items/create`, item, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        e.preventDefault()
    }

  return (
    <>
      <form onSubmit={Submit} className={style.create_article_wrapper}>
          <div className={style.sectionnng}>
          <label>Fiche produit</label>
        <input type="text" onChange={onNameChange} placeholder="Nom du produit" />
        <input type="text" onChange={onBrandChange} placeholder="Marque" />
        <input type="number" onChange={onpriceChange} min="0.01"  step="0.01"  />
        <input type="number" onChange={onpromotionChange} placeholder="Promotion" />
        <label>Stock disponible</label>
        <div className={style.create_size}>
          <input type="number" onChange={onxsChange} placeholder="XS" />
          <input type="number" onChange={onsChange} placeholder="S" />
          <input type="number" onChange={onmChange} placeholder="M" />
          <input type="number" onChange={onlChange} placeholder="L" />
          <input type="number" onChange={onxlChange} placeholder="XL" />
          <input type="number" onChange={onuniqueChange} placeholder="Unique" />
        </div>
          </div>
          <div className={style.sectionnng}>
          <label>Informations produit</label>
        <textarea type="text" onChange={ondescriptionChange} placeholder="Description du produit" />
        <input type="text" onChange={onmatiereChange} placeholder="Matiere" />
        <input type="text" placeholder="Catégorie"/>
        <input type="text" placeholder="Genre"/>
        <input type="submit" value="Ajouter"/>
          </div>
      </form>
    </>
  );
}
