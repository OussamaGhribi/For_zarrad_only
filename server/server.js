const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const shopProductRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAdressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopFlouciRouter = require("./routes/flouci-routes");
const searchRoutes = require("./routes/shop/search-routes");



dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URI 
  )
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.log("error connecting to db !"));

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
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
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter );

app.use("/api/shop/products",shopProductRouter);

app.use("/api/shop/cart",shopCartRouter);
app.use("/api/shop/address",shopAdressRouter);
app.use("/api/shop/order" , shopOrderRouter);
app.use("/api", shopFlouciRouter);
app.use("/api/search", searchRoutes);



app.listen(PORT, () => console.log(`App running on port ${PORT}`));
