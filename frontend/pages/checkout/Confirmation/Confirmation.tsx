import Image from "next/image";
import style from "./confirmation.module.css";
import { absoluteURLsForSanity } from "../../../utils/SanityFunctions";
import { useRouter } from "next/router";
import { translations } from "../../../translations/common";
import { PrimaryButton } from "../../../components/Buttons/Buttons";
import { ShippingDataProps } from "../[id]";

function Confirmation({
  shippingData,
  processOrder,
}: {
  shippingData: ShippingDataProps;
  processOrder: () => void;
  }) {
  const { locale } = useRouter();

  const cartTotal =
    shippingData?.cart?.length > 0
      ? shippingData.cart.reduce(
        (accum, item) => Number(accum) + Number(item.quantity),
        0
      )
      : "";

  return shippingData ? (
    <div className={style.confirmOrder}>
      <main>
        <div className={style.shoppingBag}>
          <h1>
            My Shopping Bag
            <span> ({cartTotal} articles)</span>
          </h1>
          {shippingData.cart?.map((product: any) => (
            <article key={product._id} className={style.shoppingArticle}>
              <div className={style.imageWrapper}>
                <Image
                  src={absoluteURLsForSanity(
                    product?.images[0].asset._ref
                  ).url()}
                  width={230}
                  height={300}
                  alt={product.title}
                />
              </div>
              <div className={style.fullSpace}>
                <div className={style.descDetails}>
                  <div>
                    <p>
                      {product.title[locale]
                        ? product.title[locale]
                        : product.title.pt}
                    </p>
                    {product.size?.[0] === "Tamanho único" ?
                      <p>
                        <span>Size:</span> {translations[locale].uniqueSize}
                      </p> :
                      <p >
                        <span>Size:</span> {product.size.join(", ")}
                      </p>

                    }
                  </div>
                  <p>
                    {product.quantity} {translations[locale].pieces}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <aside>
        <div>
          <h2>Order details</h2>
          <h3>Shipping Summary</h3>
          <section>
            <div>
              <p>Name:</p>
              <span>
                {shippingData.firstname + " " + shippingData.lastname}
              </span>
            </div>
            <div>
              <p>Phone-number:</p>
              <span>{shippingData.phonenumber}</span>
            </div>
            <div>
              <p>E-mail:</p>
              <span>{shippingData.email}</span>
            </div>
          </section>
        </div>
        <PrimaryButton onClick={processOrder} text="Confirm Order" />
      </aside>
    </div>
  ) : null;
}

export default Confirmation;
