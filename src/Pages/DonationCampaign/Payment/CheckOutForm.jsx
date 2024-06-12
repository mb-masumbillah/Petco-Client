import { useEffect, useRef, useState } from "react";
import useAuth from "../../../Hook/useAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const CheckOutForm = ({ handleClose, campaign_id, newmount, refetch, setOpen }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionID, setTransactionId] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const priceRef = useRef();

  const [totalPrice, setTotalPrice] = useState();

  const handlePrice = () => {
    setTotalPrice(priceRef.current.value);
  };

  useEffect(() => {
    if (totalPrice > 0) {
      axiosPublic
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosPublic, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          donator_name: user?.displayName,
          donator_email: user?.email,
          donator_image: user?.photoURL,
          price: totalPrice,
          transactionID: paymentIntent.id,
          date: new Date(), //utc date convert.use monent js to
          status: "payment success",
          campaign_id: campaign_id,
        };

        const res = await axiosPublic.post("/payment", payment);
        console.log("payment save : ", res);
        if (res.data?.paymentResult?.insertedId) {
          const donatedAmount = {
            donatedAmount: parseInt(totalPrice) + parseInt(newmount),
          };

          axiosPublic
            .put(`/petDonation/${campaign_id}`, donatedAmount)
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                refetch();
                setOpen(false)
              }
            });

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank your for your payment",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };
  return (
    <div className="mt-10 border-2 border-red-200 p-5">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-xl font-bold text-[#0A303A]">Amount</label>
          <input
            type="number"
            className="border-2 border-gray-600 block px-2 py-1 rounded-md"
            ref={priceRef}
            onChange={handlePrice}
          />
        </div>
        <div className="my-5">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#0A303A",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-red-600 px-4 py-2 font-bold text-white rounded-md"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-500 px-4 py-2 font-bold text-white rounded-md"
          >
            Close
          </button>
        </div>
        <div className="my-4">
          <p className="text-red-600">{error}</p>
          {transactionID && (
            <p className="text-green-600">
              Your transaction Id : {transactionID}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
