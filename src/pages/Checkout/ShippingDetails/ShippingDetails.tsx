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
};

export default function ShippingDetails({
    checkoutTokenId,
    next,
}: {
    checkoutTokenId?: any;
    next?: any;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

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
    }, [checkoutTokenId?.id]);

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
    }));

    const fetchCities = async (countryCode: any) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
            countryCode
        );

        setShippingCities(subdivisions);
        setShippingCity(Object.keys(subdivisions)[0]);
    };

    useEffect(() => {
        if (shippingCountry) {
            fetchCities(shippingCountry);
        }
    }, [shippingCountry]);

    const cities = Object.entries(shippingCities).map(([code, name]) => ({
        id: code,
        label: name,
    }));

    const fetchShippingOptions = async (
        checkoutTokenId: any,
        country: any,
        region: any
    ) => {
        const options = await commerce.checkout.getShippingOptions(
            checkoutTokenId,
            { country, region }
        );

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        if (shippingCity) {
            fetchShippingOptions(
                checkoutTokenId.id,
                shippingCountry,
                shippingCity
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shippingCity]);

    const options = shippingOptions.map((option: any) => ({
        id: option.id,
        label: `${option.description} - (${option.price.formatted_with_symbol})`,
    }));

    return (
        <section className={style.shippingDetails}>
            <h1>Shipping Details</h1>
            <form
                onSubmit={handleSubmit((data) =>
                    next({
                        ...data,
                        shippingCountry,
                        shippingCity,
                        shippingOption,
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
                <div className={style.input}>
                    <div>
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
                    </div>
                    <div className={style.input}>
                        <div>
                            <InputLabel>City</InputLabel>
                            <Select
                                value={shippingCity}
                                fullWidth
                                onChange={(e: any) =>
                                    setShippingCity(e.target.value)
                                }
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className={`${style.input} ${style.options}`}>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select
                        value={shippingOption}
                        fullWidth
                        onChange={(e: any) => setShippingOption(e.target.value)}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <SubmitButton className={style.submitButton} text="continue" />
            </form>
        </section>
    );
}
