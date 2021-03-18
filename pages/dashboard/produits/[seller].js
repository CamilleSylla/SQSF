import axios from "axios";
import DashboardMenu from "../../../components/DashboardMenu";
import style from "../../../styles/maindashboard.module.scss";
import component from "../../../styles/dashboardlistproducts.module.scss";
import { useState } from "react";
import CreateArticle from "../../../components/CreateArticle";
import Link from "next/link";
import Image from "next/image";
export default function ProduitsVendeurProfil({ profil_item, getGenre, getCategories }) {
  const [hide, setHide] = useState(true);
  const [search, setSearch] = useState("");

  function format(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function getFommattedDate(dateF) {
    const date = new Date(dateF);
    var month = format(date.getMonth() + 1);
    var day = format(date.getDate());
    var year = format(date.getFullYear());
    return day + "/" + month + "/" + year;
  }

  const Search = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className={style.dashboard_wrapper}>
        <DashboardMenu />
        <div className={style.el_wrapper}>
          <div className={component.filter_and_addProduct}>
            <input
              className={component.search}
              type="text"
              placeholder="Recherche de produit"
              onChange={Search}
            />
            <div className={component.filter}></div>
            <div
              className={component.addProduct}
              onClick={() => setHide(!hide)}
            >
              <h6>{hide ? "+ Ajouter un nouveau produit" : "Annulé"}</h6>
            </div>
          </div>
          <div className={component.addFrom}>
            {hide ? null : <CreateArticle getGenre={getGenre} getCategories={getCategories}/>}
          </div>

          <div className={component.product_card_grid}>
            {profil_item
              .filter((filtered) => {
                if (search == "") {
                  return filtered;
                } else if (
                  filtered.name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())
                    ||
                    filtered.brand
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())

                ) {
                  return filtered;
                }
              })
              .map((item) => {
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
                      <p>Catégorie : {item.categorie}</p>
                      <p>Genre : {item.genre}</p>
                      <p>{item.price}€</p>
                      <p>Crée le {getFommattedDate(item.date)}</p>
                    </div>
                    <div className={component.card_menu}>
                      <Link href={`/dashboard/produits/modify/${item._id}`}>
                        <p
                          className={component.card_menu_item}
                          style={{ background: "orange" }}
                        >
                          Modifier
                        </p>
                      </Link>
                      <button
                        className={component.card_menu_item}
                        style={{ background: "red" }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
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

    const getGenre = await axios
    .get(`http://localhost:3001/api/categorie/genre/only`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  const getCategories = await axios
    .get(`http://localhost:3001/api/categorie/categorie/only`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return {
    props: {
      profil_item,
      getGenre,
      getCategories
    },
  };
}
