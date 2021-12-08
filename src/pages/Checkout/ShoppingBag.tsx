import React from "react";
import { SubmitButton } from "../../components/Buttons/Buttons";
import { useForm } from "react-hook-form";

type FormValues = {
    firstname: string;
    lastname: string;
    phonenumber: number;
};

export default function ShoppingBag({
    next,
    cart,
}: {
    next?: any;
    cart?: any;
}) {
    const {
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    console.log(errors);
    return (
        <div>
            <h1>My Shopping Bag</h1>
            <form onSubmit={handleSubmit((data) => next({ ...data }))}>
                <SubmitButton text="continue" />
            </form>
        </div>
    );
}
