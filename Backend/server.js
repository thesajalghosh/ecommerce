const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const router = require("./routes/authRoute");
const categoryroute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoute");

const cors = require("cors");

dotenv.config();

//database config
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", router);
app.use("/api/v1/category", categoryroute);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("<h1>Wellcome to the ecommerce app</h1>");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
