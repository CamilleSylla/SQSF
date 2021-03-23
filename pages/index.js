import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import HeroBanner from "../components/HeroBanner";
import Rayons from "../components/homeRayon";

export default function Home({ items }) {

  return (
    <>
      <Head>
        <title>SQMarket</title>

      </Head>

      <div>
        <HeroBanner/>
        <Rayons/>
        <script src="https://js.stipe.com/v3/"></script>
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
  return {
    props: {
      items,
    },
  };
}
