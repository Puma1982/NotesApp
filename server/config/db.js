const mongoose = require("mongoose");
/* to handle all the warnings in the terminal */
mongoose.set("strictQuery", false);

/* connecting to the DB */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB connected to: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
