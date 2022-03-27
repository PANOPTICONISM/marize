const mail = require("@sendgrid/mail");

export default async function handler(req, res) {
  mail.setApiKey(process.env.SENDGRID_API_KEY);

  const body = JSON.parse(req.body);

  const orderID = "#" + body.userId.slice(0, 8);

  const emailFrom =
    process.env.NODE_ENV === "development"
      ? "panopticonism@gmail.com"
      : "tiagoseixas7@gmail.com";

  const messageForUser = {
    to: body.email,
    from: {
      name: "Marizé",
      email: emailFrom,
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
  };

  const messageForShop = {
    to: emailFrom,
    from: {
      name: "Marizé - reserva nova",
      email: emailFrom,
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
  };
  try {
    await mail.send(messageForUser);
    await mail.send(messageForShop);
    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
}
