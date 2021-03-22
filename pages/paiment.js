
import { useEffect, useState } from "react";
import axios from 'axios'
export default function Paiment () {

    const [payment, setPayment] = useState({
        setupBegan : false,
        isLoadingFieldNeeded: true
      })
    
      function fetchFieldsNeeded() {
        axios.post('http://localhost:3001/api/payments/stripe/account/get', {}).then(res => {
            console.log(res);
          const {success, message, setupBegan} = res.data
          if (success) {
            setPayment({...payment, 
              setupBegan,
              isLoadingFieldNeeded: false
             }) 
          }else {
               setPayment({...payment, 
              error: message,
              isLoadingFieldNeeded: true
    
              })
          }
        })
      }
     
      function onStartAccountSetup ()  {
        setPayment({...payment, 
            isLoadingFieldNeeded: true
           }) 
        axios.post('http://localhost:3001/api/payments/stripe/account/setup', {
            country: 'FR',

        }).then(res => {
            console.log(res);
            
          const {success, message} = res.data
          if (success) {
            fetchFieldsNeeded()
          }else {
               setPayment({...payment, 
              error: message,
              isLoadingFieldNeeded: true
    
              })
          }
        })
      }

      function onclickBeginSetup() {
        onStartAccountSetup()
    }

      useEffect(() => {
          fetchFieldsNeeded()
      }, [])

    if (payment.isLoadingFieldNeeded) {
        return (
            <p>Loading...</p>
        )
    }

    if (!payment.setupBegan) {
        return( 
            <div>
                <button onClick={() => onclickBeginSetup()}>
                    Debuter le configuration de stripe
                </button>
                <p> By clicking setup you agree to the TOS for Stripe</p>
                
            </div>
        )
    }
}