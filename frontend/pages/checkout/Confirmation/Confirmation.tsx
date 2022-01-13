import Image from "next/image";
import { ContinueButton } from "../../../components/Buttons/Buttons";
import style from "./confirmation.module.css";
import { useState } from "react";

function Confirmation({
  shippingData,
  next,
}: {
  shippingData?: any;
  next?: any;
}) {
  // set up user data and sent it to server that sends it to mongodb
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleUser = async (e) => {
    e.preventDefault();

    let userStructure = {
      // name,
      // email,
      // phoneNumber,
      createdAt: new Date().toISOString(),
    };

    let response = await fetch("/api/mongo", {
      method: "POST",
      body: JSON.stringify(userStructure),
    });

    let data = await response.json();

    if (data.success) {
      // clean up fields here
      return setMessage(data.message);
    } else {
      return setError(data.message);
    }
  };
  // const { cart } = useShoppingBagCMS();
  // const totalPrice = shippingData?.shippingPrice + cart?.subtotal.raw;
  // if (shippingData) {
  //   return (
  //     <div className={style.confirmOrder}>
  //       <main>
  //         <div className={style.shoppingBag}>
  //           <h1>
  //             My Shopping Bag
  //             <span> ({cart?.total_items} articles)</span>
  //           </h1>
  //           {cart?.line_items.map((product: any) => (
  //             <article key={product.id} className={style.shoppingArticle}>
  //               <Image
  //                 src={product.image.url}
  //                 width={230}
  //                 height={300}
  //                 alt={product.name}
  //               />
  //               <div className={style.fullSpace}>
  //                 <div className={style.descDetails}>
  //                   <div>
  //                     <p>{product.name}</p>
  //                     <p>
  //                       <span>Size:</span> M
  //                     </p>
  //                   </div>
  //                   <p>{product.quantity} pieces</p>
  //                 </div>
  //                 <div className={style.flex}>
  //                   <span className={style.bagPrice}>20EUR</span>
  //                 </div>
  //               </div>
  //             </article>
  //           ))}
  //         </div>
  //       </main>
  //       <aside>
  //         <h2>Order details</h2>

  //         <h3>Shipping Summary</h3>

  //         <table>
  //           <tbody>
  //             <tr>
  //               <td>Name</td>
  //               <td>{shippingData.firstname + " " + shippingData.lastname}</td>
  //             </tr>
  //             <tr>
  //               <td>Shipping Address</td>
  //               <td>{shippingData.address}</td>
  //             </tr>
  //             <tr>
  //               <td>Phone-number</td>
  //               <td>{shippingData.phonenumber}</td>
  //             </tr>
  //             <tr>
  //               <td>E-mail</td>
  //               <td>{shippingData.email}</td>
  //             </tr>
  //           </tbody>
  //         </table>
  //         <h3>Price summary</h3>
  //         <table>
  //           <tbody>
  //             <tr>
  //               <td>Subtotal</td>
  //               <td>{cart.subtotal.formatted_with_code}</td>
  //             </tr>
  //             <tr>
  //               <td>Shipping</td>
  //               <td>{`${shippingData?.shippingPrice} EUR`}</td>
  //             </tr>
  //           </tbody>
  //         </table>
  //         <table>
  //           <tbody>
  //             <tr>
  //               <td>Total</td>
  //               <td>{`${totalPrice} EUR`}</td>
  //             </tr>
  //           </tbody>
  //         </table>
  //         <ContinueButton onClick={next} text="Confirm Order" />
  //       </aside>
  //     </div>
  //   );
  // }

  return null;
}

export default Confirmation;
