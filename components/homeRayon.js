import style from '../styles/rayons.module.scss'
import Link from 'next/link'
export default function Rayons () {

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
                        <Link  href="/market/Mode">
                            Voir collections →
                        </Link>
                    </div>
                </article>
                <article className={style.rayon_short_article}></article>
            </div>
            <div className={style.rayon_sectionning}>
                <article className={style.rayon_short_article}></article>
                <article className={style.rayon_big_article}></article>

            </div>
            </div>
        </section>
        </>
    )
} 