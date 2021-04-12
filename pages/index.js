import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import HeroBanner from "../components/HeroBanner";
import HomePopular from "../components/HomePage/PopularCat";
import ItemGrid from "../components/HomePage/ItemsGrid";

export default function Home({ items, filters }) {

  return (
    <>
      <Head>
        <title>SQMarket</title>
      </Head>
      <div>
        <HeroBanner/>
        <HomePopular id="categories" data={filters}/>
        <HomePopular id="vendeurs" data={filters}/>
        <HomePopular id="promotions"/>
        <h5 style={{ fontSize: "4.5vh", textAlign: "center" }}>
        Les Nouveautés de SQMarket
      </h5>
        <ItemGrid items={items} limit={24}/>
        
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const items = await axios
    .get("http://localhost:3001/api/inventary/catalogue/all")
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
      console.log("error",err);
    });
  return {
    props: {
      items,
      filters
    },
  };
}
