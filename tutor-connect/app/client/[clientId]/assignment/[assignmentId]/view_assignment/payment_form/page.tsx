'use client'
import { useEffect } from 'react';

const PaymentButton = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>

      <stripe-buy-button
        buy-button-id="buy_btn_1PeL6rK3VZfDZK6MJLmV7oQU"
        publishable-key="pk_live_51PeHexK3VZfDZK6MCsZ3cZxNY4MyizsY91JsRZWhyvnkC1GUcIi0af8gUm5nUQKEQiDIVDPGyWr0ffrkTIZURhol00QyC0S3aU"
      ></stripe-buy-button>
    </div>
  );
};

export default PaymentButton;
