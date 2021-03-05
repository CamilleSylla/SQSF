import Image from "next/image";
import styles from "../styles/iteminfos.module.scss";



export default function ItemInfos({item}) {
  return (
    <>
      <section className={styles.iteminfos}>
        <div className={styles.image_displayer}>
          <div className={styles.main_image}>
            <Image
              src="/image.svg"
              alt="imagecont"
              layout="fill"
              sizes="100%"
              objectFit="cover"
            />
          </div>
          <div className={styles.additionnal_image_wrapper}>
            <div className={styles.additionnal_image}>
              <Image
                src="/image.svg"
                alt="imagecont"
                layout="fill"
                sizes="100%"
                objectFit="cover"
              />
            </div>
            <div className={styles.additionnal_image}>
              <Image
                src="/image.svg"
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
            {item.category.map(cat => <p>{cat}</p>)}
            {item.matiere.map(mat => <p>{mat}</p>)}
          </div>
          <div className={styles.sizing_wrapper}>
            <button>XS</button>
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
          </div>
          <div className={styles.final_operations_wrapper}>
            <div className={styles.final_operations}>
              <input type="number" placeholder="1" />
              <button>Ajouter au panier</button>
            </div>
            <p>Partager cette article</p>
          </div>
        </article>
      </section>
    </>
  );
}


