const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://edata:edata@cluster0.s9efxud.mongodb.net/ecommerce"
    );
    console.log(`connected to Mongodb database ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
