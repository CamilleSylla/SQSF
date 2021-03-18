import style from "../styles/rayons.module.scss";
import Link from "next/link";
export default function Rayons() {
  return (
    <>
      <section className={style.rayon_container}>
        <h6>Nos rayon principaux</h6>
        <div className={style.rayon_content_wrapper}>
          <div className={style.rayon_sectionning}>
            <article className={style.rayon_big_article}>
              <div className={style.text_wrapper}>
                <h1>Mode</h1>
                <h2>Consulter les dernieres tendance </h2>
                <Link href="/market/Mode">Voir collections →</Link>
              </div>
            </article>
            <article className={style.rayon_short_article}>
              <div className={style.text_wrapper}>
                <h1>Mobilier</h1>
                <h2>Votre maison, votre univers</h2>
                <Link href="/market/mobilier">Voir mobilier →</Link>
              </div>
            </article>
          </div>
          <div className={style.rayon_sectionning}>
            <article className={style.rayon_short_article}>
              <div className={style.text_wrapper}>
                <h1>Livre</h1>
                <h2>Laissez vous emporter</h2>
                <Link href="/market/Livre">Voir les livres →</Link>
              </div>
            </article>
            <article className={style.rayon_big_article}>
              <div className={style.text_wrapper}>
                <h1>Electonique</h1>
                <h2>Soyez au top de la technologie </h2>
                <Link href="/market/technologie">Voir l'éléctronique →</Link>
              </div>
            </article>
          </div>
        </div>
        <div className="neumorph more_btn">
            <Link href="/market/all">
               <p>Tout les produits</p>
            </Link>
        </div>
      </section>
    </>
  );
}
