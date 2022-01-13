import { useForm } from "react-hook-form";
import { BackButton, SubmitButton } from "../../../components/Buttons/Buttons";
import style from "./shippingdetails.module.css";
import { InputLabel, Select, MenuItem } from "@material-ui/core";

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: number;
  address: string;
  zip: string;
};

export default function ShippingDetails({
  checkoutTokenId,
  next,
  back,
}: {
  checkoutTokenId?: any;
  next?: any;
  back?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <section className={style.shippingDetails}>
      <h1>Shipping Details</h1>
      <form
        onSubmit={handleSubmit((data) =>
          next({
            ...data,
          })
        )}
      >
        <section>
          <div>
            <label htmlFor="firstname">First name</label>
            <input
              placeholder="John"
              {...register("firstname", { required: true })}
              id="firstname"
            />
            {errors.firstname && <p>This is required</p>}
          </div>
          <div>
            <label htmlFor="lastname">Last name</label>
            <input
              placeholder="Smith"
              {...register("lastname")}
              id="lastname"
            />
          </div>
        </section>
        <section>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              placeholder="john@mail.pt"
              {...register("email")}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="phonenumber">Phone number</label>
            <input
              placeholder="+45 00 00 00"
              {...register("phonenumber", {
                valueAsNumber: true,
                maxLength: {
                  value: 4,
                  message: "Too many numbers",
                },
              })}
              id="phonenumber"
            />
            {errors.phonenumber?.message}
          </div>
        </section>
        <section>
          <div>
            <label htmlFor="address">Address</label>
            <input
              placeholder="Street's name"
              {...register("address")}
              id="address"
            />
          </div>
          <div>
            <label htmlFor="zip">ZIP code</label>
            <input
              placeholder="Street's ZIP code"
              {...register("zip")}
              id="zip"
            />
          </div>
        </section>
        <div className={style.buttons}>
          <BackButton text="Return" onClick={back} />
          <SubmitButton className={style.submitButton} text="Next step" />
        </div>
      </form>
    </section>
  );
}
