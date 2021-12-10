import { CartButton } from "../../../components/Buttons/Buttons";
import { useShoppingBagCMS } from "../../../contexts/CartContext";
import style from "./confirmation.module.css";

function Confirmation({ shippingData }: { shippingData?: any }) {
    const { cart } = useShoppingBagCMS();
    console.log(shippingData, cart);
    const totalPrice = shippingData.shippingPrice + cart.subtotal.raw;
    return (
        <div className={style.confirmOrder}>
            <main>
                <h1>My order</h1>
            </main>
            <aside>
                <h2>Order details</h2>

                <h3>Shipping Summary</h3>

                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                                {shippingData.firstname +
                                    " " +
                                    shippingData.lastname}
                            </td>
                        </tr>
                        <tr>
                            <td>Shipping Address</td>
                            <td>{shippingData.address}</td>
                        </tr>
                        <tr>
                            <td>Phone-number</td>
                            <td>{shippingData.phonenumber}</td>
                        </tr>
                        <tr>
                            <td>E-mail</td>
                            <td>{shippingData.email}</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Price summary</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td>{cart.subtotal.formatted_with_code}</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>{`${shippingData.shippingPrice} EUR`}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td>Total</td>
                            <td>{`${totalPrice} EUR`}</td>
                        </tr>
                    </tbody>
                </table>
                <CartButton text="Confirm Order" />
            </aside>
        </div>
    );
}

export default Confirmation;
