const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const router = require("./routes/authRoute");
const categoryroute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoute");
const offerRoute = require("./routes/offerRoute");
const orderRoute = require("./routes/orderRoute");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cloudinary = require("cloudinary");

const cors = require("cors");
const { connectSocket } = require("./socket");

dotenv.config();
cloudinary.v2.config({
  cloud_name: "dgkckcwxs",
  api_key: "726364799675195",
  api_secret: "x_P4eblf2LrS5xTUfGMoCTabZYA",
  secure: true,
});

//database config
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", router);
app.use("/api/v1/category", categoryroute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/offer", offerRoute);
app.use("/api/v1/order", orderRoute);

app.get("/", (req, res) => {
  res.send("<h1>Wellcome to the ecommerce app</h1>");
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

const io = connectSocket(server);

io.on("connection", (socket) => {
  console.log("Socket connected .........");
  socket.emit("connected", "hi");

  socket.on("setup", (id) => {
    console.log("id", id);
    socket.join(id);
  });
});
