import Image from "next/image";
import style from "../../styles/home_itemgrid.module.scss";
import Link from "next/link";

export default function ItemGrid(items) {
  return (
    <>
      <h5 style={{ fontSize: "4.5vh", textAlign: "center" }}>
        Les Nouveautés de SQMarket
      </h5>
      <div className={style.item_grid_container}>
        <div className={style.item_grid}>
          {items.items.map((item, i) => {
            while (i <= 24) {
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
