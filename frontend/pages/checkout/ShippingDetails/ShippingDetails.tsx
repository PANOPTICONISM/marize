import { Controller, useForm } from "react-hook-form";
import { BackButton, PrimaryButton } from "../../../components/Buttons/Buttons";
import style from "./shippingdetails.module.css";
import { ShippingDataProps } from "../[id]";
import { Button, Input, TextField } from "@mui/material";

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: number;
};

export default function ShippingDetails({
  next,
  back,
}: {
  next: (data: ShippingDataProps) => void;
  back: () => void;
}) {
  const { control, handleSubmit } = useForm<FormValues>();

  return (
    <section className={style.shippingDetails}>
      <h1>Shipping Details</h1>
      <form
        onSubmit={handleSubmit((data) => {
          next({
            ...(data as ShippingDataProps),
          });
        })}
      >
        <Controller
          name="firstname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First name"
              variant="outlined"
              fullWidth
              required
            />
          )}
        />
        <Controller
          name="lastname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last name"
              variant="outlined"
              fullWidth
              required
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              required
            />
          )}
        />
        <Controller
          name="phonenumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
            />
          )}
        />
        <BackButton text="Return" onClick={back} />
        <PrimaryButton type="submit" text="Next step" />
      </form>
    </section>
  );
}
