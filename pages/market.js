import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import CardDisplayer from "../components/CardDisplayer";
import Filter from "../components/Filter";
import style from "../styles/market.module.scss";

export default function Market({ items }) {
  const [search, setSearch] = useState("");
  const [toogleFilter, setToogleFilter] = useState(false);
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

        <Filter/>
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
    </>
  );
}

export async function getServerSideProps() {
  const items = await axios
    .get("http://localhost:3001/api/inventary/all")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      items,
    },
  };
}
