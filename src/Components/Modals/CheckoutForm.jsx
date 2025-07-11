import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useUserData from "../../Hooks/useUserData";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ShowToast from "../UI/ShowToast";

const CheckoutForm = ({ closeModal, orderData , refetch}) => {
  const { userInfo } = useUserData();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const { data } = await axiosSecure.post("/users/create-payment-intent", {
          totalPrice: orderData?.totalPrice,
          productId: orderData?.productId,
        });
        setClientSecret(data?.clientSecret);
      } catch (err) {
        console.error("Failed to create payment intent", err);
        ShowToast("error", "Payment setup failed");
        closeModal();
      }
    };
    getClientSecret();
  }, [axiosSecure, orderData, closeModal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setCardError("");

    const { error: createError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (createError) {
      setCardError(createError.message || "Card error occurred");
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: userInfo?.displayName || "Anonymous",
          email: userInfo?.email,
        },
      },
    });

    if (confirmError) {
      setCardError(confirmError.message || "Payment failed");
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        const orderPayload = {
          ...orderData,
          transactionId: paymentIntent.id,
        };
        const { data } = await axiosSecure.post("/users/order", orderPayload);
        if (data?.insertedId) {
          ShowToast("success", "Order Placed Successfully!");
          refetch()
        }
      } catch (err) {
        console.error("Order saving failed", err);
        ShowToast("error", "Order saving failed");
      } finally {
        setProcessing(false);
        closeModal();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#146131",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-red-500 my-2">{cardError.toString()}</p>}

      <div className="flex justify-between">
        <button
          className="px-3 py-1 bg-primary text-white rounded"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : `Pay ৳${orderData.totalPrice}`}
        </button>
        <button
          onClick={closeModal}
          className="px-3 py-1 bg-red-500 text-white rounded"
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
