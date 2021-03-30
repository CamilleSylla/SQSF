import style from "../styles/startpay.module.scss";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import ReactDOM from "react-dom";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [cart, setCart] = useContext(CartContext);
  const [request, setRequest] = useState({
    cart: cart,
    client_secret : null
  });
  const  [client, setClient] = useState({
    name: "Camille",
    lastname: "Sylla",
    adress: "8 square du moulin l'évêque",
    city: "Le Mans",
    cp: "02100",
    cart: cart,
    pi_id: null
  })

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    console.log(request.client_secret);
    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(request.client_secret, {
      payment_method: {
        card: card,
        billing_details: {
          name: `${client.name} ${client.lastname}`
        }
      }
    });
    if (result.error) {
      setError(`Payment failed ${result.error.message}`);
      setProcessing(false);
      console.log(result.error.message);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      axios.post(`http://localhost:3001/api/order/create`, {...client, pi_id: result.paymentIntent.id})
      .then(res => console.log(res.data))
    }
  };
  useEffect(() => {
axios.post(`http://localhost:3001/api/payments/payment_intent`, {cart})
.then(res =>{ 
  setRequest({...request, client_secret : res.data.client_secret})
  console.log(request.client_secret);
})

    if (request.source) {
      axios
        .post(`http://localhost:3001/api/payments/donate`, request)
        .then((res) => {
          console.log(res);
        });
    }
  },[]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Proceder à l'achat"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51Hj2udHo7ReTdVEbKASgLHcv76Pj52W7arFj6RhcsTGDk53hTLZJUJf5Ukm94BTyhH2b1CUDz73KPpiQW4BnUakl00ZOqxnheU"
);

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
      return null;
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
            <CheckoutForm />
          </Elements>
        </div>
      </div>
      <Link href="/paiment">
        <button className={style.purchase_btn}>Proceder a l'achat</button>
      </Link>
    </>
  );
}
