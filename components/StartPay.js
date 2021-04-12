import style from "../styles/startpay.module.scss";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = (client, setClient) => {
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
  const  [client, setClient] = useState({
    name: "Camille",
    lastname: "Sylla",
    adress: "8 square du moulin l'évêque",
    city: "Le Mans",
    cp: "02100",
    card_name: "",
    email: "",
    phone: "",
    cart: cart,
    pi_id: null
  })

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

  function onInfosChange (e, key) {
    setClient({...client, [key]: e})
    console.log(client);
  }
   return (
    <>
    <div className={style.startpay_container}>
      <div className={style.cumstumer_infos}>
        <label>Nom</label>
        <input type="text" onChange={e => onInfosChange(e.target.value,"lastname")}/>
        <label>Prénom</label>
        <input type="text" onChange={e => onInfosChange(e.target.value,"name")}/>
        <label>Email</label>
        <input type="text" onChange={e => onInfosChange(e.target.value,"email")}/>
        <label>Telephone</label>
        <input type="text" onChange={e => onInfosChange(e.target.value,"phone")}/>
        <label>Adresse</label>
        <input type="text" onChange={e => onInfosChange(e.target.value,"adress")}/>
        <label>Ville</label>
        <input type="text" onChange={e => onInfosChange(e.target.value,"city")}/>
        <label>Code Postale</label>
        <input type="text" onChange={e => onInfosChange(e.target.value,"cp")}/>
        <label>Nom de la Carte</label>
        <input type="text" onChange={e => onInfosChange(e.target.value,"card_name")}/>
        <Elements stripe={stripePromise}>
            <CheckoutForm client={client} setClient={setClient} />
          </Elements>
      </div>
    <div className={style.startpay}>
        <div className={style.startpay_wrapper}>
          <h3>Facture</h3>
          
          
            <h2>Éléments du panier</h2>
            <div className={style.startpay_content} style={{fontSize: "1.4vh"}}>
              <p>Nom du produit</p>
              <p>Quantité</p>
            </div>
            {cart.map((item, i) => {
              return (
                <>
                <div className={style.startpay_content}>
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                </div>
                </>
              )
            })}
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
    </div>
    </>
  );
}
