import Head from "next/head";
import Image from "next/image";
import style from "../../styles/profil.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SellerProfile({ vendeur, product }) {

  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("");
  const [dropdown, setDropdown] = useState(null)

  async function Categories () {

    const categories = await axios
    .get("http://localhost:3001/api/categorie/all")
    .then(res => setDropdown(res.data))
  } 
console.log(dropdown);
  useEffect(() => {
    Categories()
  },[])
  const categories = () => {
    return dropdown.categories.map((cat, i) => {
        return <option value={cat.name}>{cat.name}</option>
      })
    
  }

  return (
    <>
      <Head>
        <title>SQMarket - Vendeur</title>
      </Head>
      <div className={style.profil_wrapper}>
        <div className={style.profil_banner}>
          <Image
            src={vendeur.banniere_picture}
            alt="imagestuff"
            layout="fill"
            sizes="100%"
            objectFit="cover"
          />
          <div className={style.profil_picture}>
            <Image
              src={vendeur.profile_picture}
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
        <input type="text" placeholder="Rechercher" onChange={e => setSearch(e.target.value)}/>
          <select>
            <option>Toutes le catégories</option>
            {dropdown ? categories() : null}
          </select>
        <section className={style.profil_infos_wrapper}>
          
          <div className={style.profil_product} style={{width: "50%"}}>
          {product.filter(item =>{
            if (categorie == "") {
              return item
            } else if (categorie == item.categorie) {
              return item
            }
            }).filter((filtered) => {
            if (search == "") {
              return filtered;
            } else if (
              filtered.name
                .toLowerCase()
                .includes(search.toLocaleLowerCase()) ||
              filtered.brand
                .toLowerCase()
                .includes(search.toLocaleLowerCase()) ||
              filtered.vendeur
                .toLowerCase()
                .includes(search.toLocaleLowerCase())
            ) {
              return filtered;
            }
          }).map((item, i) => {
            while (i <= 6) {
              return (
                <Link href={`/product/${item._id}`} key={i}>
                  <div className="item_card">
                    <div className="item_img_container">
                      <Image
                        src={item.images[0] ? item.images[0] : "/image.svg"}
                        alt="imagestuff"
                        layout="fill"
                        sizes="100%"
                        objectFit="cover"
                      />
                    </div>
                    <div className="item_crad_details">
                      <p>{item.genre}</p>
                      <Link href={`/profil/${item.vendeur_id}`}>
                        <p>{item.vendeur}</p>
                      </Link>
                      <p>
                        {" "}
                        {item.brand} - {item.name}
                      </p>
                      <p>{item.price}€</p>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
          </div>
          <div className={style.profil_identity}>
            <h1>
              <span>Nom du Vendeur : </span>
              {vendeur.society}
            </h1>
            <h2>
              <span>Adresse du vendeur :</span> {vendeur.siege}
            </h2>
            <h2>
              <span>Ville et Code Postale:</span> {vendeur.city}, 0{vendeur.cp}
            </h2>
            <h2>
              <span>Adresse Email:</span> {vendeur.email}
            </h2>
            <h2>
              <span>Téléphone :</span> 06 06 06 06 06
            </h2>
            <h2>
              <span>Présentation</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              rutrum dui vel laoreet elementum. Proin a venenatis purus.
              Praesent vestibulum id lorem a consequat. Interdum et malesuada
              fames ac ante ipsum primis in faucibus. Duis maximus condimentum
              leo in interdum.
            </p>
            <h2>
              <span>Bon a savoir :</span>
            </h2>
            <ul>
              <li>Point</li>
              <li>Point</li>
              <li>Point</li>
              <li>Point</li>
              <li>Point</li>
            </ul>
            <h2>
              <span>Réseaux sociaux :</span>
            </h2>
            <div className={style.profil_social}>
              <div className={style.profil_social_icons}></div>
              <div className={style.profil_social_icons}></div>
              <div className={style.profil_social_icons}></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const vendeur = await axios
    .get(`http://localhost:3001/api/vendeur/${params.vendeur}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  const product = await axios
    .get(`http://localhost:3001/api/inventary/produit/${params.vendeur}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      vendeur,
      product
    },
  };
}
