import Image from "next/image";
import style from "../styles/panierlist.module.scss";

export default function PanierList() {
  return (
    <>
      <table className={style.tableau}>
        <tr>
          <th>Produit(s)</th>
          <th>Quantité</th>
          <th>Revendeur</th>
          <th>Prix Unité TTC</th>
          <th>Prix Total</th>
        </tr>
        <tr>
          <th className={style.product}>
            <div>
              <Image
                src="/image.svg"
                alt="product"
                layout="fill"
                sizes="100%"
                objectFit="cover"
              />
            </div>
            Product Name
          </th>
          <th className={style.quantite}>
              <input type='number' value="1"/>
          </th>
          <th>
              Nom du revendeur
          </th>
          <th>
              20.90€
          </th>
          <th>
              20.90€
          </th>
        </tr>
      </table>
    </>
  );
}
