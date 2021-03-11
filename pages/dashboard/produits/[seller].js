import axios from "axios";
import DashboardMenu from "../../../components/DashboardMenu";
import style from "../../../styles/maindashboard.module.scss";
import component from "../../../styles/dashboardlistproducts.module.scss";
import { useState } from "react";
import CreateArticle from "../../../components/CreateArticle";
import Link from "next/link";
import Image from "next/image";
export default function ProduitsVendeurProfil({ profil_item }) {
  const [hide, setHide] = useState(true);

  function format(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function getFommattedDate (dateF) {
    const date = new Date(dateF)
    var month = format(date.getMonth() + 1);
    var day = format(date.getDate());
    var year = format(date.getFullYear());
    return day + "/" + month + "/" + year;
  }

  return (
    <>
      <div className={style.dashboard_wrapper}>
        <DashboardMenu />
        <div className={style.el_wrapper}>
          <div className={component.filter_and_addProduct}>
            <input className={component.search} type="text" placeholder="Recherche de produit"/>
            <div className={component.filter}></div>
            <div
              className={component.addProduct}
              onClick={() => setHide(!hide)}
            >
              <h6>{hide ? "+ Ajouter un nouveau produit" : "Annulé"}</h6>
            </div>
          </div>
          <div className={component.addFrom}>
            
            {hide ? null : <CreateArticle />}
          </div>

          <div className={component.product_card_grid}>
            {profil_item.map((item) => {
              return (
                <div className={component.product_card}>
                  <div className={component.image}>
                    <Image
                      src={item.images[0] ? item.images[0] : "/image.svg"}
                      alt="Image principal"
                      layout="fill"
                      sizes="100%"
                      objectFit="cover"
                    />
                  </div>
                  <div className={component.rows_content}>
                    <p>{item.name}</p>
                    <p>{item.brand}</p>
                    <p>{item.price}€</p>
                    <p>Crée le  {getFommattedDate(item.date)}</p>
                  </div>
                <div className={component.card_menu}>
                  <Link  href={`/dashboard/produits/modify/${item._id}`}>
                    <p className={component.card_menu_item} style={{background: "orange"}}>Modifier</p>
                  </Link>
                  <button className={component.card_menu_item} style={{background: "red"}}>Supprimer</button>
                </div>
                </div>
              );
            })}
          </div>

          {/* <table className={component.table_wrapper}>
            <tr>
              <th>Identifiant</th>
              <th>Nom du produit</th>
              <th>Marque</th>
              <th>Prix</th>
              <th>Categorie</th>
              <th>Promotion</th>
              <th>Action</th>
            </tr>
            
            {profil_item.map((items) => {
              return (
                <tr className={component.table_data}>
                  <th>{items._id}</th>
                  <th>{items.name}</th>
                  <th>{items.brand}</th>
                  <th>{items.price}€</th>
                  <th>Catégory</th>
                  <th>{items.promotion}</th>
                  <Link href={`/dashboard/produits/modify/${items._id}`}>
                  <th>...</th>
                  </Link>
                </tr>
              );
            })}
            
            
          </table> */}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const profil_item = await axios
    .get(`http://localhost:3001/api/inventary/produit/${params.seller}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      profil_item,
    },
  };
}
