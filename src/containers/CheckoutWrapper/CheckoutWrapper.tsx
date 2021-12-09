import React, { useEffect, useState } from "react";
import { useShoppingBagCMS } from "../../contexts/CartContext";
import { commerce } from "../../lib/Commerce";
import ShoppingBag from "../../pages/Checkout/ShoppingBag/ShoppingBag";
import Main from "../Main/Main";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import CustomerDetails from "../../pages/Checkout/ShippingDetails/CustomerDetails";

function CheckoutWrapper({ children }: { children?: React.ReactNode }) {
    const { cart } = useShoppingBagCMS();
    const [tokenId, setTokenId] = useState();
    const [liveObject, setLiveObject] = useState();
    const [shipping, setShipping] = useState({});
    const steps = [
        "Product Details",
        "Customer Details",
        "Payment Details",
        "Confirmation",
    ];
    const [activeStep, setActiveStep] = useState(0);
    const nextStep = () =>
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    useEffect(() => {
        if (cart?.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(
                        cart.id,
                        {
                            type: "cart",
                        }
                    );

                    setTokenId(token);
                } catch {
                    console.log("wrong");
                }
            };

            generateToken();
        }
    }, [cart]);

    const next = (data: any) => {
        setShipping(data);
        console.log(data);

        nextStep();
    };

    return (
        <Main>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === 0 && <ShoppingBag next={next} />}
            {activeStep === 1 && <CustomerDetails />}
            {/* {activeStep === steps.length && <ConfirmationPage />} */}
        </Main>
    );
}

export default CheckoutWrapper;
