import Image from "next/image";
import { ContinueButton } from "../../../components/Buttons/Buttons";
import style from "./confirmation.module.css";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/CartAndFavouritesContext";
import { absoluteURLsForSanity } from "../../../utils/SanityFunctions";
import { useRouter } from "next/router";

function Confirmation({
  shippingData,
  processOrder,
}: {
  shippingData?: any;
  processOrder?: any;
}) {
  const { stateCart } = useContext(GlobalContext);
  const { locale } = useRouter();

  if (shippingData) {
    return (
      <div className={style.confirmOrder}>
        <main>
          <div className={style.shoppingBag}>
            <h1>
              My Shopping Bag
              <span> ({stateCart.cart?.length} articles)</span>
            </h1>
            {stateCart.cart?.map((product: any) => (
              <article key={product._id} className={style.shoppingArticle}>
                <Image
                  src={absoluteURLsForSanity(
                    product?.images[0].asset._ref
                  ).url()}
                  width={230}
                  height={300}
                  alt={product.title}
                />
                <div className={style.fullSpace}>
                  <div className={style.descDetails}>
                    <div>
                      <p>
                        {product.title[locale]
                          ? product.title[locale]
                          : product.title.pt}
                      </p>
                      {product.size !== null ? (
                        <p>
                          <span>Size:</span> {product.size}
                        </p>
                      ) : null}
                    </div>
                    <p>{product.quantity} pieces</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
        <aside>
          <h2>Order details</h2>

          <h3>Shipping Summary</h3>

          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{shippingData.firstname + " " + shippingData.lastname}</td>
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
          <ContinueButton onClick={processOrder} text="Confirm Order" />
        </aside>
      </div>
    );
  }

  return null;
}

export default Confirmation;
