import Image from "next/image";
import Link from "next/link";
import style from "../styles/register.module.scss";

export default function Register() {
  return (
    <>
      <div className={style.inscri_vend_wrapper}>
        <section className={style.pages_header}>
          <article>
            <h1>Inscription à SQMarket</h1>
          </article>
        </section>
        <div className={style.select_wrapper}>
          <div className={style.select_box}>
            <div className="round_btn">
              <Image
                src="/user.svg"
                alt="Recherche"
                width="40px"
                height="40px"
                objectFit="contain"
              />
            </div>
            <h6>Compte utilisateur</h6>
            <p>M'inscrire en tant qu'utilisateur et obtenir une meilleure expérience sur SQMarket</p>
            <div className="global_button">
                M'inscrire
            </div>
          </div>
          <div className={style.select_box}>
          <div className="round_btn">
              <Image
                src="/shop.svg"
                alt="Recherche"
                width="40px"
                height="40px"
                objectFit="contain"
              />
            </div>
            <h6>Compte vendeur</h6>
            <p>M'inscrire en tant que vendeur et obtenir la possibilté de vendre vos produits sur SQMarket</p>
            <div className="global_button">
                <Link href="/vendeur_register">
                    Vendre
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
