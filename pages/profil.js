import Head from "next/head";
import Image from "next/image";
import style from '../styles/profil.module.scss'
import axios from 'axios'

const id = "6042308b5cbbe4504cc91d76"
export default function SellerProfile ({vendeur}) {
    return (
        <>
        <Head>
            <title>SQMarket - Vendeur</title>
        </Head>
        <div className={style.profil_wrapper}>
            <div className={style.profil_banner}>
            <Image
                src="/image.svg"
                alt="imagestuff"
                layout="fill"
                sizes="100%"
                objectFit="cover"
              />
              <div className={style.profil_picture}>
              <Image
                src="/image.svg"
                alt="imagestuff"
                layout="fill"
                sizes="100%"
                objectFit="cover"
              />
              </div>
              <div className={style.profil_name}>
                    <h1>{vendeur.society}</h1>
              </div>
            </div>
            <section className={style.profil_infos_wrapper}>
                <div className={style.profil_identity}>
                    <h1><span>Nom du Vendeur : </span>{vendeur.society}</h1>
                    <h2><span>Adresse du vendeur :</span> {vendeur.siege}</h2>
                    <h2><span>Ville et Code Postale:</span> {vendeur.city}, 0{vendeur.cp}</h2>
                    <h2><span>Adresse Email:</span> {vendeur.email}</h2>
                    <h2><span>Téléphone :</span> 06 06 06 06 06</h2>
                    <h2><span>Présentation</span></h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum dui vel laoreet elementum. Proin a venenatis purus. Praesent vestibulum id lorem a consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis maximus condimentum leo in interdum. 
                    </p>
                    <h2><span>Bon a savoir :</span></h2>
                    <ul>
                        <li>Point</li>
                        <li>Point</li>
                        <li>Point</li>
                        <li>Point</li>
                        <li>Point</li>
                    </ul>
                    <h2><span>Réseaux sociaux :</span></h2>
                    <div className={style.profil_social}>
                    <div className={style.profil_social_icons}>

                    </div>
                    <div className={style.profil_social_icons}>

                    </div>
                    <div className={style.profil_social_icons}>

                    </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

export async function getServerSideProps() {
    const vendeur = await axios
      .get(`http://localhost:3001/api/vendeur/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      props: {
        vendeur,
      },
    };
  }