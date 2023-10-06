import { Controller, useForm } from "react-hook-form";
import { BackButton } from "../../../components/Buttons/Buttons";
import style from "./shippingdetails.module.css";
import { ShippingDataProps } from "../[id]";
import { Button, Input, TextField } from "@mui/material";

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: number;
  address: string;
  zip: string;
};

export default function ShippingDetails({
  next,
  back,
}: {
  checkoutTokenId?: any;
  next?: any;
  back?: any;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Email" variant="outlined" fullWidth />
          )}
        />
        <Controller
          name="phonenumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="PhoneNumber"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <BackButton text="Return" onClick={back} />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ padding: "12px" }}
        >
          Next step
        </Button>
      </form>
    </section>
  );
}
