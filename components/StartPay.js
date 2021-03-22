import style from "../styles/startpay.module.scss";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export default function StartPay() {
  const [cart, setCart] = useContext(CartContext);

  function CartAmount() {
    const Accumulator = [];
    const reducer = (acc, current) => acc + current;
    cart.forEach((item) => {
      const math = item.price * item.quantity;
      Accumulator.push(math);
    });
     const result = Accumulator.reduce(reducer);
    return result;
  }
  return (
    <>
      <div className={style.startpay}>
        <div className={style.startpay_wrapper}>
          <div className={style.startpay_content}>
            <h2>Montant du panier</h2>
            <p>{CartAmount()}€</p>
          </div>
          {/* <div className={style.startpay_content}>
            <h2>Coupon de réduction</h2>
            <p>Non</p>
          </div> */}
          <div className={style.startpay_content}>
            <h2>Total</h2>
            <p>{CartAmount()}€</p>
          </div>
        </div>
      </div>
      <Link href="/paiment">
        <button className={style.purchase_btn}>Proceder a l'achat</button>
      </Link>
    </>
  );
}
