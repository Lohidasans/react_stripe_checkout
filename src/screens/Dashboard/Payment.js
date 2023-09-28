import React, { useEffect, useState } from "react";
import { Element } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
    const [clientSecret,setClientSecret]=useState('')
    const stripePromise=loadStripe('pk_test_51NdHL7D8sIpXeskQeT6CpplrqrGVFHb5npUb6p44xjXwavDqBNefgfC9VW4VqTKnFJ7bB5bK0OJOwXFfKBu6O9e4006pkHpPmK');
    let data = {
        customer_id: 631,
        amount: 100,
        currency: 'USD',
      };
      useEffect(() => {
        fetch("https://tipmeapi.duceapps.com/api/user/createPayment", {
          method: "POST",
          body: JSON.stringify(data),
        }).then(async (result) => {
          var { clientSecret } = await result.json();
          console.log(clientSecret,'clientSecret')
          setClientSecret(clientSecret);
        });   
      }, []);
  return (
    <>
      {clientSecret && stripePromise && (
        <Element strip={stripePromise} options={{ clientSecret }}>
          {/* <CheckoutForm /> */}
        </Element>
      )}
    </>
  );
};
export default Payment;
