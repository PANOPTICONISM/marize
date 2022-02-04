const mail = require("@sendgrid/mail");

export default async function handler(req, res) {
  mail.setApiKey(process.env.SENDGRID_API_KEY);

  const body = JSON.parse(req.body);

  const message = `
    Name: ${body.userName}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}
  `;

  console.log(body.userName, "body");

  await mail.send({
    to: `${body.email}`,
    from: "panopticonism@gmail.com",
    subject: "Nova compra!",
    template_id: "d-45d74be0b84b478a81baf6eb79e80ded",
    dynamic_template_data: {
      userName: `${body.userName}`,
      email: body.email,
      products: body.cart,
    },
  });

  res.status(200).json({ status: "Ok" });
}
