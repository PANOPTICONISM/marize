import {
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../../components/Buttons/Buttons";

type FormValues = {
    firstname: string;
    lastname: string;
    phonenumber: number;
};

export default function ShippingDetails() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    return (
        <>
            <h1>Shipping Details</h1>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <label htmlFor="firstname">First name</label>
                <input
                    {...register("firstname", { required: true })}
                    id="firstname"
                />
                {errors.firstname && <p>This is required</p>}
                <label htmlFor="lastname">Last name</label>
                <input {...register("lastname")} id="lastname" />

                <label htmlFor="phonenumber">Phone number</label>
                <input
                    {...register("phonenumber", {
                        valueAsNumber: true,
                        maxLength: { value: 4, message: "Too many numbers" },
                    })}
                    id="phonenumber"
                />
                {errors.phonenumber?.message}
                <SubmitButton text="continue" />
            </form>
        </>
    );
}
