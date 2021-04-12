import ItemInfos from "../../components/ItemInfos";
import style from '../../styles/product.module.scss'
import axios from 'axios'
import ItemGrid from "../../components/HomePage/ItemsGrid";
import { useEffect, useState } from "react";



export default function Product({item, get_seller_product}) {
const [vendeur, setVendeur] =  useState(null)
  useEffect(() => {
    axios.get(`http://localhost:3001/api/vendeur/${item.vendeur_id}`)
    .then((res) => {
      setVendeur(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
  return (
    <>
      <div className={style.product_container}>
          <div style={{height: "8vh"}}>
              ici sera le fils d'ariane
          </div>
        <ItemInfos item={item}/>
        {/* <section className={style.pages_related}>
                <h1>Vous aimerez peut-être</h1>
        </section> */}
        <h5 style={{ fontSize: "4.5vh", textAlign: "center" }}>
        Autres produits de {vendeur ? vendeur.society : "Chargement..."}
      </h5>
        <ItemGrid items={get_seller_product} limit={4}/>
      </div>
    </>
  );
}

export async function getServerSideProps({params}) {
  const item = await axios
    .get(`http://localhost:3001/api/inventary/${params.id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  const seller = await axios
  .get(`http://localhost:3001/api/inventary/${params.id}`)
  .then((res) => {
    return res.data.vendeur_id
  }) 

  const get_seller_product = await axios
  .get(`http://localhost:3001/api/inventary/produit/${seller}`)
  .then(res => res.data)
  return {
    props: {
      item,
      get_seller_product
    },
  };
}