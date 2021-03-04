import Image from "next/image";
import style from '../styles/carddisplayer.module.scss'
export default function Cards({ data }) {
  return (
    <>
      {data.map((item) => {
        return (
          <article>
            <div className={style.image_container_market}>
              <Image
                src="/image.svg"
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
            <h6>{item.vendeur}</h6>
            </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
