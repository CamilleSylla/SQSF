import Image from "next/image";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/cartContext";
import style from "../styles/panierlist.module.scss";

export default function PanierList() {
  const [cart, setCart] = useContext(CartContext);

console.log(cart);
function updateItem (e, key) {
  cart[key].quantity = e
  console.log(cart);
}
  
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
        {cart.map((items, i) => {
          const { image, name, quantity, size, vendeur, price } = items;

          return (
            <tr key={i}>
              <th className={style.product}>
                <div>
                  <Image
                    src={image ? image : "/image.svg"}
                    alt={name}
                    layout="fill"
                    sizes="100%"
                    objectFit="cover"
                  />
                </div>
                {name}
              </th>
              <th className={style.quantite}>
                <input
                  type="number"
                  min="1"
                  placeholder={quantity}
                  onChange={e => updateItem(e.target.value, i)}
                />
              </th>
              <th>{vendeur}</th>
              <th>{price}€</th>
              <th>{price * quantity}€</th>
            </tr>
          );
        })}
      </table>
    </>
  );
}
