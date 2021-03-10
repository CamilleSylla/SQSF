import axios from "axios";
import DashboardMenu from "../../../components/DashboardMenu";
import style from "../../../styles/maindashboard.module.scss";
import component from "../../../styles/dashboardlistproducts.module.scss";
import { useState } from "react";
import CreateArticle from "../../../components/CreateArticle";
import Link from "next/link";
export default function ProduitsVendeurProfil({ profil_item }) {
  const [hide, setHide] = useState(true)
    return (
    <>
      <div className={style.dashboard_wrapper}>
        <DashboardMenu />
        <div className={style.el_wrapper}>
          <div className={component.filter_and_addProduct}>
            <div className={component.filter}>

            </div>
            <div className={component.addProduct} onClick={() => setHide(!hide)}>
              <h6>{hide ? "+ Ajouter un nouveau produit" : "Annulé"}</h6>
            </div>
          </div>
        <div className={component.addFrom}>
            {hide ? null : <CreateArticle/>}
        </div>
          <table className={component.table_wrapper}>
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
            
            
          </table>
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
