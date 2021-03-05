import Head from "next/head";
import Login from "../components/Login";
import style from '../styles/connection.module.scss'

export default function Connection() {
  return (
    <>
      <Head>
        <title>SQMarquet - Connection</title>
      </Head>
      <div className={style.connection_wrapper}>
      <section className={style.pages_header}>
            <article>
                <h1>Connection</h1>
            </article>
        </section>
        <Login />
      </div>
    </>
  );
}
