import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import CheckOutForm from "./CheckOutForm";

const Payment = ({ handleClose, campaign_id, newmount, refetch,setOpen}) => {
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  return (
    <div>
      <div>
        <SectionTitle headingTitle="Payment"></SectionTitle>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm
          setOpen={setOpen}
          refetch={refetch}
            handleClose={handleClose}
            campaign_id={campaign_id}
            newmount={newmount}
          ></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
