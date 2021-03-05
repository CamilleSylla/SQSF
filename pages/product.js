import ItemInfos from "../components/ItemInfos";
import style from '../styles/product.module.scss'
import axios from 'axios'

const id = "603fb2419df8b350643cde80"

export default function Product({item}) {
  return (
    <>
      <div className={style.product_container}>
          <div style={{height: "8vh"}}>
              ici sera le fils d'ariane
          </div>
        <ItemInfos item={item}/>
        <section className={style.pages_related}>
                <h1>Vous aimerez peut-être</h1>
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const item = await axios
    .get(`http://localhost:3001/api/inventary/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      item,
    },
  };
}