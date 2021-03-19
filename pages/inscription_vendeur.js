import Image from "next/image";
import VendeurInscription from "../components/VendeurIncription";
import style from "../styles/inscrivend.module.scss";
import { useRouter } from 'next/router'
import axios from "axios";
export default function VendeurInsc() {
  const router =  useRouter()
  const code = router.query.code

  // useEffect(() => {
  //   axios.get
  // })
  return (
    <>
      <div className={style.inscri_vend_wrapper}>
      <section className={style.pages_header}>
            <article>
                <h1>Inscription Vendeur</h1>
            </article>
        </section>
        <div className={style.inscri_content}>
          <div className={style.inscri_image}>
            <Image
              src="/sellerregister.svg"
              alt="Inscription Vendeur"
              layout="fill"
              sizes="100%"
              objectFit="cover"
            />
          </div>
          <VendeurInscription stripe={code}/>
        </div>
      </div>
    </>
  );
}


