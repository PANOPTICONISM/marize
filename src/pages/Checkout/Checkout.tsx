import CheckoutWrapper from "../../containers/CheckoutWrapper/CheckoutWrapper";

function Checkout() {
    return (
        <CheckoutWrapper>
            <div>
                <label>First name</label>
                <input name="firstname" placeholder="John" />
            </div>
            <div>
                <label>Last name</label>
                <input name="lastname" placeholder="Smith" />
            </div>
            <div>
                <label>Email</label>
                <input
                    name="email"
                    placeholder="xyz@example.com"
                    type="email"
                />
            </div>
        </CheckoutWrapper>
    );
}

export default Checkout;
