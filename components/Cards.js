import Image from "next/image";
import Link from "next/link";
import style from "../styles/carddisplayer.module.scss";
export default function Cards({ data }) {
  return (
    <>
      {data.map((item) => {
        return (
          <Link href={`/product/${item._id}`}>
            <article>
              <div className={style.image_container_market}>
              {/* "/image.svg" */}
                <Image
                  src={item.images.length > 0 ? item.images[0] : "/image.svg"}
                  alt={item.name}
                  layout="fill"
                  sizes="100%"
                  objectFit="cover"
                />
              </div>
              <div className={style.market_cards_info}>
                
                  <h1>{item.name}</h1>
                <h2>{item.brand}</h2>
                <div className={style.price_and_seller}>
                  <p>{item.price}€</p>
                  <Link href={`/profil/${item.vendeur}`}>
                  <h6>{item.vendeur}</h6>
                  </Link>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </>
  );
}
