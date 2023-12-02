import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckoutForm = () => {
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [yourDiscount, setYourDiscount] = useState(0);
  const { user } = useContext(AuthContext);

  const stripe = useStripe();
  const elements = useElements();
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bookings");
      return res.data;
    },
  });

  const price = bookings.reduce((total, item) => total + item.price, 0);
  const handleDiscount = (event) => {
    event.preventDefault();
    const code = event.target.code.value;
    if (code === "HEALTHY1") {
      let discount = (20 * price) / 100;
      setYourDiscount(discount);
      event.target.code.value = "";
    } else {
      setYourDiscount(0);
    }
  };
  console.log(yourDiscount);
  const totalPrice = price - yourDiscount;
  

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
      console.log("error", error);
      setError(error.message);
    } else {
      console.log("payment Method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        setYourDiscount(0);
      }
    }
  };
  return (
    <div className=" w-4/5 mx-auto mt-10 md:mt-16 lg:mt-20">
      <form onSubmit={handleDiscount} className="mb-5">
        <input
          name="code"
          className="bg-base-200 rounded-l-lg py-3 px-5"
          placeholder="Write your coupon code"
          type="text"
        />
        <input
          className="btn bg-gradient-to-r from-[#0e1a38] to-[#6b84bd] text-white rounded-r-lg py-3 px-2"
          type="submit"
          value="Get Discount"
        />
      </form>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
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
        <button
          type="submit"
          className="btn mt-3 bg-gradient-to-r from-[#0e1a38] to-[#6b84bd] text-white"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-700">{error}</p>
        {transactionId && (
          <p className="text-green-600">
            {" "}
            Your TransactionId : {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
