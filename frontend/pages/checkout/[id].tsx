import React from "react";
import ShoppingBag from "./ShoppingBag/ShoppingBag";
import { Stepper, Step, StepLabel, makeStyles } from "@mui/material";
import ShippingDetails from "./ShippingDetails/ShippingDetails";
import Confirmation from "./Confirmation/Confirmation";
import Main from "../../containers/Main/Main";
import OrderProcessed from "./OrderProcessed/OrderProcessed";
import { GlobalContext, StateExtraProps } from "../../contexts/CartAndFavouritesContext";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { translations } from "../../translations/toasts";
import { useRouter } from "next/router";
import { SingleProduct } from "../../types/product";

export type ShippingDataProps = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  cart: (SingleProduct & StateExtraProps)[];
  user_id: string;
};

function CheckoutWrapper() {
  const { locale } = useRouter()
  const { stateCart } = React.useContext(GlobalContext);

  const [shippingData, setShippingData] = React.useState<ShippingDataProps>({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    cart: [],
    user_id: ""
  });
  const steps = ["Shopping Bag", "Shipping Details", "Confirmation"];

  const [activeStep, setActiveStep] = React.useState(0);
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data: ShippingDataProps) => {
    setShippingData(data);

    nextStep();
  };

  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const processOrder = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userStructure = {
      id: uuid(),
      firstname: shippingData.firstname,
      lastname: shippingData.lastname,
      email: shippingData.email,
      phonenumber: shippingData.phonenumber,
      cart: stateCart.cart,
      user_id: stateCart.userId,
    };

    const baseResponse = await fetch("/api/postgres", {
      method: "POST",
      body: JSON.stringify(userStructure),
    });

    // const emailResponse = await fetch("/api/email", {
    //   method: "POST",
    //   body: JSON.stringify(userStructure),
    // });

    const userData = await baseResponse.json();
    // const emailData = await emailResponse.json();

    if (userData.success) {
      next(userStructure);
      return setMessage(userData.message);
    } else {
      return toast.error(translations[locale].purchaseError)
    }
  };

  const stepperStyling = {
    root: {
      "& .MuiStepIcon-active": {
        color: "white",
        border: `1px solid black`,
        borderRadius: "50%",
      },
      "& .MuiStepIcon-completed": { color: "#FA6121" },
      "& .Mui-disabled .MuiStepIcon-root": {
        color: "black",
      },
      "& .Mui-disabled .MuiStepIcon-root .MuiStepIcon-text": {
        fill: "white",
      },
      "& .MuiStepIcon-text": { fill: "black" },
    },
  };

  return (
    <Main>
      {/* {activeStep !== steps.length && cart?.line_items.length > 0 && ( */}
      <Stepper sx={stepperStyling} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && <ShoppingBag next={next} />}
      {activeStep === 1 && <ShippingDetails back={backStep} next={next} />}
      {activeStep === 2 && (
        <Confirmation processOrder={processOrder} shippingData={shippingData} />
      )}
      {activeStep === 3 && <OrderProcessed shippingData={shippingData} />}
    </Main>
  );
}

export default CheckoutWrapper;
