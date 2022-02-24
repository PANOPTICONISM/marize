import { absoluteURLsForSanity } from "../../utils/SanityFunctions";

const mail = require("@sendgrid/mail");

export default async function handler(req, res) {
  mail.setApiKey(process.env.SENDGRID_API_KEY);

  const body = JSON.parse(req.body);

  // const message = `
  //   Name: ${body.userName}\r\n
  //   Email: ${body.email}\r\n
  //   Message: ${body.message}
  // `;

  console.log(body, "body");
  const orderID = "#" + body.userId.slice(0, 8);
  // const productImage = absoluteURLsForSanity(product?.images[0].asset._ref).url()

  // const product = body.cart.map((product) => product);
  // console.log(product, "each product yay");

  await mail
    .send({
      to: body.email,
      from: {
        name: "Marize",
        email: "panopticonism@gmail.com",
      },
      subject: "Nova compra!",
      template_id: "d-c0118d168a414704ad07fb3bbbbe3401",
      dynamic_template_data: {
        orderNumber: orderID,
        firstName: body.firstName,
        userName: body.firstName + " " + body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        products: body.cart,
      },
    })
    .then(() => res.status(200).json({ status: "Ok" }))
    .catch(() => res.status(500).json({ status: "Error" }));

  // res.status(200).json({ status: "Ok" });
}
