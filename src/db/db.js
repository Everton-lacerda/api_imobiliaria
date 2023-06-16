const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB.");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Encerrar o aplicativo em caso de erro de conexão
  }

  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
  });

  mongoose.connection.on("connected", () => {
    console.log("mongoDB Connected");
  });
};

module.exports = connect;
