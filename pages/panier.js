import Head from "next/head";
import PanierList from "../components/PanierList";
import StartPay from "../components/StartPay";
import style from '../styles/panier.module.scss'

export default function Chart () {

    return (
        <>
        <Head>
            <title> SQMarket - Panier</title>
            {/* <script src="https://js.stipe.com/v3/"></script> */}
        </Head>
        <div className={style.panier_wrapper}>
        <section className={style.pages_header}>
            <article>
                <h1>Panier</h1>
            </article>
        </section>
            <PanierList/>
            <StartPay/>
        </div>
        </>
    )
}