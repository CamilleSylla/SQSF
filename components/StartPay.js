import style from "../styles/startpay.module.scss";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import {loadStripe} from '@stripe/stripe-js';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe('pk_test_51Hj2udHo7ReTdVEbKASgLHcv76Pj52W7arFj6RhcsTGDk53hTLZJUJf5Ukm94BTyhH2b1CUDz73KPpiQW4BnUakl00ZOqxnheU');

export default function StartPay() {
  const [cart, setCart] = useContext(CartContext);

  function CartAmount() {
    const Accumulator = [];
    const reducer = (acc, current) => acc + current;
    if (cart.length > 0) {
      cart.forEach((item) => {
        const math = item.price * item.quantity;
        Accumulator.push(math);
      });
       const result = Accumulator.reduce(reducer);
       return result;
    } else {
      return null 
    }
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
          <Elements stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
        </div>
      </div>
      <Link href="/paiment">
        <button className={style.purchase_btn}>Proceder a l'achat</button>
      </Link>
    </>
  );
}
