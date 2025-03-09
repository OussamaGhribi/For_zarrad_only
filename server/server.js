const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const axios = require("axios");  // Use axios instead of request

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const shopProductRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAdressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/orderRoutes");
const shopFlouciRouter = require("./routes/flouci-routes");
const searchRoutes = require("./routes/shop/search-routes");
const chatRouter = require("./routes/chat-routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Proxy for Dialogflow chatbot
app.get('/dialogflow-bot', async (req, res) => {
    try {
        const url = 'https://bot.dialogflow.com/26476fad-4fbb-414a-bffb-df1957509a2c';
        
        // Fetch the Dialogflow bot page via axios
        const response = await axios.get(url, { responseType: 'text' });

        // Remove the X-Frame-Options header in the response
        res.set('X-Frame-Options', '');  // Make sure this header is removed
        res.send(response.data);  // Send the body of the response to the client
    } catch (error) {
        console.error('Error fetching the Dialogflow bot:', error);
        res.status(500).send('Failed to load the chatbot');
    }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.log("Error connecting to DB!"));

app.use(
  cors({
    origin: "http://localhost:5173",  // Change this to your front-end domain if needed
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route definitions
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAdressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api", shopFlouciRouter);
app.use("/api/search", searchRoutes);
app.use("/api/chat", chatRouter);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
