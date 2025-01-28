const nodemailer = require("nodemailer");

// Email sending function
const sendConfirmationEmail = async (email, orderDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-email-password", // Replace with your email password or app password
      },
    });

    const mailOptions = {
      from: '"Your Shop" <your-email@gmail.com>',
      to: email, // Customer's email
      subject: "Order Confirmation",
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <p><b>Order Details:</b></p>
        <p>Total: ${orderDetails.totalAmount}$</p>
        <p>Items:</p>
        <ul>
          ${orderDetails.items
            .map(
              (item) =>
                `<li>${item.name} - Quantity: ${item.quantity}, Price: ${item.price}$</li>`
            )
            .join("")}
        </ul>
        <p>We hope to see you again!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};

// Payment endpoint
exports.processPayment = async (req, res) => {
  const { amount, email, items } = req.body;

  try {
    // Payment processing logic (e.g., calling a payment API)
    const paymentId = "12345"; // Simulated payment ID
    const paymentLink = "http://payment-link.com"; // Simulated payment link

    // Simulate successful payment
    const paymentSuccess = true;

    if (paymentSuccess) {
      // Send confirmation email
      await sendConfirmationEmail(email, {
        totalAmount: amount / 1000, // Assuming cents to dollars
        items,
      });

      return res.json({ success: true, payment_id: paymentId, link: paymentLink });
    } else {
      res.status(400).json({ success: false, message: "Payment failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
