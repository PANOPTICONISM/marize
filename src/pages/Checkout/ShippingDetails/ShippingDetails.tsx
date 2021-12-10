import { useForm } from "react-hook-form";
import { SubmitButton } from "../../../components/Buttons/Buttons";
import style from "./shippingdetails.module.css";
import {
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { commerce } from "../../../lib/Commerce";

type FormValues = {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: number;
    address: string;
    zip: string;
    city: string;
    country: string;
};

export default function ShippingDetails({
    checkoutTokenId,
}: {
    checkoutTokenId?: any;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    console.log(checkoutTokenId, "token");

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingCities, setShippingCities] = useState([]);
    const [shippingCity, setShippingCity] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");

    const fetchShippingCountries = async (checkoutTokenId: any) => {
        const { countries } =
            await commerce.services.localeListShippingCountries(
                checkoutTokenId
            );

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutTokenId?.id);
    }, [checkoutTokenId.id]);

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
    }));

    return (
        <section className={style.shippingDetails}>
            <h1>Shipping Details</h1>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <div>
                    <label htmlFor="firstname">First name</label>
                    <input
                        {...register("firstname", { required: true })}
                        id="firstname"
                    />
                    {errors.firstname && <p>This is required</p>}
                </div>

                <div>
                    <label htmlFor="lastname">Last name</label>
                    <input {...register("lastname")} id="lastname" />
                </div>

                <div>
                    <label htmlFor="lastname">Last name</label>
                    <input {...register("lastname")} id="lastname" />
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input {...register("email")} id="email" />
                </div>
                <div>
                    <label htmlFor="phonenumber">Phone number</label>
                    <input
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
                <div>
                    <label htmlFor="address">Address</label>
                    <input {...register("address")} id="address" />
                </div>
                <div>
                    <label htmlFor="zip">Zip code</label>
                    <input {...register("zip")} id="zip" />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input {...register("city")} id="city" />
                </div>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Country</InputLabel>
                    <Select
                        value={shippingCountry}
                        fullWidth
                        onChange={(e: any) =>
                            setShippingCountry(e.target.value)
                        }
                    >
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <InputLabel>City</InputLabel>
                    <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}>
                            Me
                        </MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Options</InputLabel>
                    <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}>
                            Me
                        </MenuItem>
                    </Select>
                </Grid> */}
                <SubmitButton text="continue" />
            </form>
        </section>
    );
}
