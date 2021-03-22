import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import styles from "../styles/iteminfos.module.scss";



export default function ItemInfos({item}) {
  
  const [cart, setCart ] = useContext(CartContext)
  const [picked, setPicked] =  useState({
    item_id : item._id,
    name: item.name,
    vendeur: item.vendeur,
    size: null,
    image: item.images[0],
    price: item.price,
    quantity: null
  })

  function AddCart () {
    cart.push(picked)
    console.log(cart);
  }

  const onSizePicked = e => {
    setPicked({...picked, size: e.target.value})
  }
  const onQuantityPicked = e => {
    setPicked({...picked, quantity: e.target.value})
  }
  return (
    <>
      <section className={styles.iteminfos}>
        <div className={styles.image_displayer}>
          <div className={styles.main_image}>
            <Image
              src={item.images[0]  ? item.images[0] : "/image.svg"}
              alt="imagecont"
              layout="fill"
              sizes="100%"
              objectFit="cover"
            />
          </div>
          <div className={styles.additionnal_image_wrapper}>
            <div className={styles.additionnal_image}>
              <Image
                src={item.images[1] ? item.images[1] : "/image.svg"}
                alt="imagecont"
                layout="fill"
                sizes="100%"
                objectFit="cover"
              />
            </div>
            <div className={styles.additionnal_image}>
              <Image
                src={item.images[2] ? item.images[2] : "/image.svg"}
                alt="imagecont"
                layout="fill"
                sizes="100%"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <article>
          <h1>{item.name}</h1>
          <h2>{item.brand}</h2>
          <p className={styles.product_desc}>
            {item.description}
          </p>
          <h3>{item.price}€</h3>
          <div className={styles.categroy_grid}>
            <p>{item.categorie}</p>
            {item.matiere.map(mat => <p>{mat}</p>)}
          </div>
          <div className={styles.sizing_wrapper}>
            <button value="xs" onClick={onSizePicked}>XS</button>
            <button value="s" onClick={onSizePicked}>S</button>
            <button value="m" onClick={onSizePicked}>M</button>
            <button value="l" onClick={onSizePicked}>L</button>
            <button value="xl" onClick={onSizePicked}>XL</button>
          </div>
          <div className={styles.final_operations_wrapper}>
            <div className={styles.final_operations}>
              <input type="number" placeholder="1" onChange={onQuantityPicked}/>
              <button onClick={() => AddCart()}>Ajouter au panier</button>
            </div>
            <p>Partager cette article</p>
          </div>
        </article>
      </section>
    </>
  );
}


