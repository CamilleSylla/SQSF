import Image from "next/image";
import styles from "../styles/iteminfos.module.scss";

export default function ItemInfos() {
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
          <h1>Titre de l'article</h1>
          <h2>Marque</h2>
          <p className={styles.product_desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec
            aliquam quam, sed lacinia nunc. Nullam in orci vel urna porta porta
            ut nec felis. Curabitur mattis lorem ac lacinia euismod. Maecenas
            venenatis neque et massa rutrum, quis tincidunt felis sodales. Nulla
            ornare pulvinar nulla, eget eleifend eros luctus id. Donec finibus
            lacus sem, at pulvinar justo pulvinar non.
          </p>
          <h3>20.00€</h3>
          <div className={styles.categroy_grid}>
            <p>Categrorie A</p>
            <p>Categrorie A</p>
            <p>Categrorie A</p>
            <p>Categrorie A</p>
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
