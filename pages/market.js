import axios from "axios";
import Head from "next/head";
import CardDisplayer from "../components/CardDisplayer";
import style from '../styles/market.module.scss'

export default function Market ({items}) {
  
    return <>
    <Head>
        <title>SQMarket - Catalogue</title>
    </Head>
    <div className={style.market_container}>
        <section className={style.pages_header}>
            <article>
                <h1>Catalogue</h1>
            </article>
        </section>
        <CardDisplayer data={items}/>
    </div>
    </>
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