import ItemInfos from "../components/ItemInfos";
import style from '../styles/product.module.scss'

export default function Product() {
  return (
    <>
      <div className={style.product_container}>
          <div style={{height: "8vh"}}>
              ici sera le fils d'ariane
          </div>
        <ItemInfos />
        <section className={style.pages_related}>
                <h1>Vous aimerez peut-être</h1>
        </section>
      </div>
    </>
  );
}
