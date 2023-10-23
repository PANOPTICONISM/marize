import React from "react";
import ShoppingBag from "./ShoppingBag/ShoppingBag";
import { Stepper, Step, StepLabel, makeStyles } from "@mui/material";
import ShippingDetails from "./ShippingDetails/ShippingDetails";
import Confirmation from "./Confirmation/Confirmation";
import Main from "../../containers/Main/Main";
import OrderProcessed from "./OrderProcessed/OrderProcessed";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";

export type ShippingDataProps = {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  cart: [];
};

function CheckoutWrapper() {
  const { stateCart } = React.useContext(GlobalContext);

  const [shippingData, setShippingData] = React.useState<ShippingDataProps>({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    cart: [],
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
      id: stateCart.userId,
      firstName: shippingData.firstname,
      lastName: shippingData.lastname,
      email: shippingData.email,
      phoneNumber: shippingData.phonenumber,
      created_at: new Date().toISOString(),
      cart: stateCart.cart,
    };

    const baseResponse = await fetch("/api/supabase", {
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
      nextStep();
      return setMessage(userData.message);
    } else {
      return setError(userData.message);
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
