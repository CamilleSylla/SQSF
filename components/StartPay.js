import style from "../styles/startpay.module.scss";
import Link from 'next/link'

export default function StartPay() {
  return (
    <>
      <div className={style.startpay}>
        <div className={style.startpay_wrapper}>
          <div className={style.startpay_content}>
            <h2>Montant du panier</h2>
            <p>20.90€</p>
          </div>
          <div className={style.startpay_content}>
            <h2>Coupon de réduction</h2>
            <p>Non</p>
          </div>
          <div className={style.startpay_content}>
            <h2>Total</h2>
            <p>20.90€</p>
          </div>
        </div>
      </div>
      <Link href="/paiment">
        <button className={style.purchase_btn}>Proceder a l'achat</button>
      </Link>
    </>
  );
}
