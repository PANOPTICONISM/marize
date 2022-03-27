const mail = require("@sendgrid/mail");

export default async function handler(req, res) {
  mail.setApiKey(process.env.SENDGRID_API_KEY);

  const body = JSON.parse(req.body);

  const orderID = "#" + body.userId.slice(0, 8);

  await mail
    .send({
      to: body.email,
      from: {
        name: "Marizé",
        email: "panopticonism@gmail.com",
      },
      subject: "Confirmação!",
      template_id: "d-4cbce36eb5914a4fb4e44b01c3ad70ed",
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

  await mail
    .send({
      to: "panopticonism@gmail.com",
      from: {
        name: "Marizé - reserva nova",
        email: "panopticonism@gmail.com",
      },
      subject: "Nova compra!",
      template_id: "d-b6dccad79c7649dbb558872f7bf3c7b4",
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
}
