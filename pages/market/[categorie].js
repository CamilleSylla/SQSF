import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import CardDisplayer from "../../components/CardDisplayer";
import Filter from "../../components/Filter";
import style from "../../styles/market.module.scss";

export default function Market({ itemsAll, filters }) {
  const [search, setSearch] = useState("");
  const [toogleFilter, setToogleFilter] = useState(false);
  const viewItem = itemsAll
  const [items, setItems] = useState(viewItem)
  const [isChecked, setIsChecked] = useState({})


  return (
    <>
      <Head>
        <title>SQMarket - Catalogue</title>
      </Head>
      <div className={style.market_container}>
        <section className={style.pages_header}>
          <article>
            <h1>Catalogue</h1>
          </article>
        </section>
        <div className={style.filter_and_search}>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
            <div className={style.display_filter} onClick={() => setToogleFilter(!toogleFilter)}>{toogleFilter == true ? "Annuler" :  "+ Afficher les filtres"}</div>
        </div>

        <div className={style.filter_and_cards}>
        {toogleFilter == true ? <Filter isChecked={isChecked} setIsChecked={setIsChecked} cat={filters} setItem={setItems}/> : null}

        <CardDisplayer
          data={items.filter((filtered) => {
            if (search == "") {
              return filtered;
            } else if (
              filtered.name
                .toLowerCase()
                .includes(search.toLocaleLowerCase()) ||
              filtered.brand
                .toLowerCase()
                .includes(search.toLocaleLowerCase()) ||
              filtered.vendeur
                .toLowerCase()
                .includes(search.toLocaleLowerCase())
            ) {
              return filtered;
            }
          })}
        />
        </div>

        
      </div>
    </>
  );
}

export async function getServerSideProps({params}) {
  const itemsAll = await axios
    .get(`http://localhost:3001/api/inventary/catalogue/${params.categorie}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  const filters = await axios
    .get("http://localhost:3001/api/categorie/all")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });


  return {
    props: {
      itemsAll,
      filters
    },
  };
}
