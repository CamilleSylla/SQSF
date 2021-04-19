import Image from "next/image";
import style from "../../styles/home_itemgrid.module.scss";
import Link from "next/link";

export default function ItemGrid({items, limit}) {
  return (
    <>
      
      <div className={style.item_grid_container}>
        <div className={style.item_grid}>
          {items.map((item, i) => {
            while (i <= limit -1) {
              return (
                <Link href={`/product/${item._id}`}>
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
      </div>
    </>
  );
}
