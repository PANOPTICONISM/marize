import React, { useContext, useState } from "react";
import ShoppingBag from "./ShoppingBag/ShoppingBag";
import { Stepper, Step, StepLabel, makeStyles } from "@material-ui/core";
import ShippingDetails from "./ShippingDetails/ShippingDetails";
import Confirmation from "./Confirmation/Confirmation";
import Main from "../../containers/Main/Main";
import OrderProcessed from "./OrderProcessed/OrderProcessed";
import { GlobalContext } from "../../contexts/CartAndFavouritesContext";

function CheckoutWrapper() {
  const { stateCart } = useContext(GlobalContext);

  const [shippingData, setShippingData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    cart: [],
  });
  const steps = ["Shopping Bag", "Shipping Details", "Confirmation"];

  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data: any) => {
    setShippingData(data);

    nextStep();
  };

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const processOrder = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userStructure = {
      userId: stateCart.userId,
      firstName: shippingData.firstname,
      lastName: shippingData.lastname,
      email: shippingData.email,
      phoneNumber: shippingData.phonenumber,
      // createdAt: new Date().toISOString(),
      cart: stateCart.cart,
    };

    const baseResponse = await fetch("/api/supabase", {
      method: "POST",
      body: JSON.stringify(userStructure),
    });

    const emailResponse = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify(userStructure),
    });

    const userData = await baseResponse.json();
    const emailData = await emailResponse.json();

    if (userData.success) {
      nextStep();
      return setMessage(userData.message);
    } else {
      return setError(userData.message);
    }
  };

  const useStyles = makeStyles(() => ({
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
  }));

  const mui = useStyles();

  return (
    <Main>
      {/* {activeStep !== steps.length && cart?.line_items.length > 0 && ( */}
      <Stepper className={mui.root} activeStep={activeStep} alternativeLabel>
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
