import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const PaymentModal = ({closeModal, orderData}) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm closeModal={closeModal} orderData={orderData}/>
      </Elements>
    </div>
  );
};

export default PaymentModal;
