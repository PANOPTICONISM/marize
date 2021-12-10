import React, { useEffect, useState } from "react";
import { useShoppingBagCMS } from "../../contexts/CartContext";
import { commerce } from "../../lib/Commerce";
import ShoppingBag from "./ShoppingBag/ShoppingBag";
import { Stepper, Step, StepLabel, makeStyles } from "@material-ui/core";
import ShippingDetails from "./ShippingDetails/ShippingDetails";
import Confirmation from "./Confirmation/Confirmation";
import Main from "../../containers/Main/Main";

function CheckoutWrapper({ children }: { children?: React.ReactNode }) {
    const { cart } = useShoppingBagCMS();
    const [checkoutTokenId, setCheckoutTokenId] = useState();
    const [shippingData, setShippingData] = useState({});
    const steps = ["Shopping Bag", "Shipping Details", "Confirmation"];

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

                    setCheckoutTokenId(token);
                } catch {
                    console.log("wrong");
                }
            };

            generateToken();
        }
    }, [cart]);

    const [activeStep, setActiveStep] = useState(0);
    const nextStep = () =>
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data: any) => {
        setShippingData(data);
        console.log(data, "shipping data");

        nextStep();
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

    console.log(steps.length, activeStep);

    return (
        <Main>
            <Stepper
                className={mui.root}
                activeStep={activeStep}
                alternativeLabel
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === 0 && <ShoppingBag next={next} />}
            {activeStep === 1 && (
                <ShippingDetails
                    checkoutTokenId={checkoutTokenId}
                    back={backStep}
                    next={next}
                />
            )}
            {activeStep === 2 && <Confirmation shippingData={shippingData} />}
        </Main>
    );
}

export default CheckoutWrapper;
