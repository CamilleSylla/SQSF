import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import styles from "../styles/iteminfos.module.scss";
import Link from "next/link";

export default function ItemInfos({ item }) {
  console.log(item);
  const [vendeur, setVendeur] = useState(null);
  const [cart, setCart] = useContext(CartContext);
  const [delivery, setDelivery] = useState({
    type: null,
  });
  const [picked, setPicked] = useState({
    item_id: item._id,
    name: item.name,
    vendeur: item.vendeur,
    size: null,
    image: item.images[0],
    price: item.price,
    quantity: 1,
    delivery_options: [],
  });

  const [imageDisplay, setImageDisplay] = useState(0);

  function AddCart() {
    picked.delivery_options.push(delivery);
    cart.push(picked);
  }

  function targetImage(num) {
    setImageDisplay(num);
  }

  function delConditions(e, key) {
    setDelivery({ ...delivery, [key]: e });
  }
  function toogleDelivery(type) {
    function timeFraction() {
      const result = [];
      const startTime = new Date("2021-09-04 08:00:00");
      const endTime = new Date("2021-09-04 19:00:00");
      for (let i = startTime; i <= endTime; i.setMinutes(i.getMinutes() + 15)) {
        const hours = {
          hours: i.getHours(),
          minutes: i.getMinutes(),
        };
        result.push(hours);
      }
      return result;
    }


    switch (type) {
      case "ClickCollect":
        return (
          <>
            <input
              type="date"
              id="start"
              name="trip-start"
              min={new Date()}
              max="2050-12-31"
              onChange={(e) => delConditions(e.target.value, "date")}
            ></input>
            <select onChange={(e) => delConditions(e.target.value, "time")}>
              <option>Heure</option>
              {timeFraction().map((time, i) => {
                return (
                  <option
                    key={i}
                    value={`${time.hours}:${time.minutes}`}
                  >{`${time.hours}:${time.minutes}`}</option>
                );
              })}
            </select>
          </>
        );
      default:
        return null;
    }
  }

  
   function sizeOptions () {
    const result = []
    Object.keys(item.sizes).forEach((key) => {
    console.log(key, item.sizes[key]);
    result.push(key)
  })
  console.log(result);
  return result
}

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/vendeur/${item.vendeur_id}`)
      .then((res) => {
        setVendeur(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <section className={styles.iteminfos}>
        <div className={styles.item_overview}>
          <h1>
            {item.brand} - {item.name}
          </h1>
          <div className={styles.main_image}>
            <div className={styles.item_like}>
              <Image
                src="/heart.svg"
                alt="imagecont"
                width="20px"
                height="20px"
                objectFit="contain"
                // className={styles.item_heart}
              />
            </div>
            <div className={styles.item_button}>
              <Image
                src="/share.svg"
                alt="imagecont"
                width="20px"
                height="20px"
                objectFit="contain"
                // className={styles.item_heart}
              />
            </div>
            <Image
              src={
                item.images[imageDisplay]
                  ? item.images[imageDisplay]
                  : "/image.svg"
              }
              alt="imagecont"
              layout="fill"
              sizes="100%"
              objectFit="contain"
            />
          </div>
          <div className={styles.other_image}>
            {item.images.map((image, i) => {
              return (
                <div
                  onClick={() => targetImage(i)}
                  className={styles.image_mini}
                >
                  <Image
                    src={image ? image : "/image.svg"}
                    alt="imagecont"
                    layout="fill"
                    sizes="100%"
                    objectFit="cover"
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.item_image}>
            <h2>Details</h2>
            <div className={styles.table_container}>
              <table>
                <tr>
                  <td>Marque :</td>
                  <td>{item.brand}</td>
                </tr>
                <tr>
                  <td>Modele :</td>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <td>Vendeur :</td>
                  <td>{item.vendeur}</td>
                </tr>
                <tr>
                  <td>Modele :</td>
                  <td>{item.name}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className={styles.item_description}>
            <h2>Description</h2>
            <p>{item.description}</p>
          </div>
        </div>

        <div className={styles.seller_overview_container}>
          <div className={styles.seller_item}>
            <h2>{item.price}€</h2>
            <div className={styles.seller_info}>
              <div className={styles.profile_img}>
                <Image
                  src={vendeur ? vendeur.profile_picture : "/image.svg"}
                  alt="imagecont"
                  layout="fill"
                  sizes="100%"
                  objectFit="cover"
                />
              </div>
              <Link href={`/profil/${item.vendeur_id}`}>
                <div style={{ cursor: "pointer" }}>
                  <h5>{vendeur ? vendeur.society : "Chargement..."}</h5>

                  <p>Consulter le profil du vendeur</p>
                </div>
              </Link>
            </div>
            <div className={styles.delivery_options}>
              <select onChange={(e) => setDelivery({ type: e.target.value })}>
                <option>Mode de livraison disponible</option>
                {item.delivery_options.map((option, i) => {
                  return <option value={option.type}>{option.type}</option>;
                })}
              </select>
              {toogleDelivery(delivery.type)}
            </div>
            <div className={styles.delivery_options}>
              <select
                onChange={(e) => setPicked({ ...picked, size: e.target.value })}
              >
                <option>Selectionner une taille</option>
                {sizeOptions().map((size, i) => {
                  return <option key={i} value={size}>{size}</option>
                })}
              </select>
            </div>
            <div onClick={() => AddCart()} className={styles.btn_container}>
              <div className={styles.btn}>
                <p>Ajouter au panier</p>
              </div>
            </div>
            <div className={styles.btn_container}>
              <div className={styles.btn}>
                <p>Contacter le vendeur</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
