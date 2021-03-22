import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import style from "../styles/panierlist.module.scss";

export default function PanierList() {
  const [cart, setCart ] = useContext(CartContext)
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
        {cart.map(items => {

          const {image, name, quantity, size, vendeur, price} = items

          return (
<tr>
          <th className={style.product}>
            <div>
              <Image
                src={image ? image : '/image.svg'}
                alt={name}
                layout="fill"
                sizes="100%"
                objectFit="cover"
              />
            </div>
            {name}
          </th>
          <th className={style.quantite}>
              <input type='number' placeholder={quantity}/>
          </th>
          <th>
              {vendeur}
          </th>
          <th>
              {price}€
          </th>
          <th>
              {price * quantity}€
          </th>
        </tr>
          )
        })}
        
      </table>
    </>
  );
}
