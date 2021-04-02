import axios from "axios";
import DashboardMenu from "../../../components/DashboardMenu";
import style from "../../../styles/maindashboard.module.scss";
import component from "../../../styles/dashboardlistproducts.module.scss";
import { useContext, useEffect, useState } from "react";
import CreateArticle from "../../../components/CreateArticle";
import Link from "next/link";
import Image from "next/image";
import SimulateurPrix from "../../../components/SimulateurPrix";
import DashboardHeader from "../../../components/DashboardHeader";
import { UserContext } from "../../../context/userLog";
import InfoOrCard from "../../../components/productPageDashboard/InfoOrCard";
export default function ProduitsVendeurProfil({
  profil_item,
  getGenre,
  getCategories,
}) {
  const [hide, setHide] = useState(true);
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState(null);
  const [select, setSelect] = useState({
    selected: [],
    token: null,
  });
 
  
  const [addItem, setAddItem] = useState(true);

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
  function itemVue(item) {
    const userTarget = profil_item.find((allItem) => allItem._id == item);
    setTarget(userTarget)
    setAddItem(true)
  }
  function sizes() {
    return (
      <tbody>
        <th>
          <p
            style={{
              color: fontColor(target.xs),
            }}
          >
            {target.xs}
          </p>
        </th>
        <th>
          <p
            style={{
              color: fontColor(target.s),
            }}
          >
            {target.s}
          </p>
        </th>
        <th>
          <p
            style={{
              color: fontColor(target.m),
            }}
          >
            {target.m}
          </p>
        </th>
        <th>
          <p
            style={{
              color: fontColor(target.l),
            }}
          >
            {target.l}
          </p>
        </th>
        <th>
          <p
            style={{
              color: fontColor(target.xl),
            }}
          >
            {target.xl}
          </p>
        </th>
      </tbody>
    );
  }
  function fontColor(num) {
    if (num < 10 && num >= 5) {
      return "orange";
    } else if (num < 5) {
      return "red";
    } else {
      return "green";
    }
  }

  const onSelect = (e) => {
    const target = document.getElementById(e.target.value);
    const find = select.selected.find((id) => id == target.value);
    if (find) {
      const index = select.selected.indexOf(target.value);
      select.selected.splice(index, 1);
    } else {
      select.selected.push(target.value);
    }
    console.log(select.selected);
  };

  


  return (
    <>
      <div className={style.dashboard_wrapper}>
        <DashboardMenu />

        <div className={style.el_wrapper}>
          <DashboardHeader
            addItem={addItem}
            setAddItem={setAddItem}
            item={profil_item}
            select={select}
            target={target}
            search={setSearch}
          />
          <div className="dashboard_top_cards_container">
            <div className="top_cards">
              <div className="nav_button">
                <Image
                  src="/checklist.svg"
                  alt="Recherche"
                  width="20px"
                  height="20px"
                  objectFit="contain"
                />
              </div>
              <h6 style={{ width: "50%" }}>
                Nombre d'article disponible sur SQMarket :<br />
                <span style={{ fontSize: "20px" }}>{profil_item.length}</span>
              </h6>
            </div>
            <div className="top_cards">
              <div className="nav_button">
                <Image
                  src="/truck.svg"
                  alt="Recherche"
                  width="20px"
                  height="20px"
                  objectFit="contain"
                />
              </div>
              <h6 style={{ width: "50%" }}>
                items sans notification d'envoie :<br />
                <span style={{ fontSize: "20px" }}>0</span>
              </h6>
            </div>
            <div className="top_cards">
              <div className="nav_button">
                <Image
                  src="/shop.svg"
                  alt="Recherche"
                  width="20px"
                  height="20px"
                  objectFit="contain"
                />
              </div>
              <h6 style={{ width: "50%" }}>
                item Click&Collect sans récupération :<br />
                <span style={{ fontSize: "20px" }}>0</span>
              </h6>
            </div>
          </div>
          <div className={style.content_container}>
            <table className={style.list}>
              <thead>
                <tr>
                  <th>
                    <p>Identifiant</p>
                  </th>
                  <th>
                    <p>Prix</p>
                  </th>
                  <th>
                    <p>Crée</p>
                  </th>
                  <th>
                    <p>Status</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {profil_item
                  .filter((filtered) => {
                    if (search == "") {
                      return filtered;
                    } else if (
                      filtered.name
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase()) ||
                      filtered.brand
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ) {
                      return filtered;
                    }
                  })
                  .map((item, i) => {
                    const d = new Date(item.date);
                    return (
                      <tr key={i} onClick={() => itemVue(item._id)}>
                        <td>
                          <p>{item.name} </p>
                        </td>
                        <td>
                          <p>{item.price}€</p>
                        </td>
                        <td>
                          <p>
                            {d.toLocaleDateString() +
                              " à " +
                              d.toLocaleTimeString()}
                          </p>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            id={item._id}
                            value={item._id}
                            onChange={onSelect}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <InfoOrCard addItem={addItem} target={target} sizes={sizes} getGenre={getGenre} getCategories={getCategories} />
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
      getCategories,
    },
  };
}
