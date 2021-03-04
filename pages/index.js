import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home({ items }) {

  return (
    <>
      <Head>
        <title>SQMarket</title>

      </Head>

      <section>
          {items.map((item) => {
            return (
              <>
                <li>{item.brand}</li>
                <p>{item.name}</p>
                <p>{item.price}€</p>
                <p>{item.description}</p>
              </>
            );
          })}
      </section>
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
