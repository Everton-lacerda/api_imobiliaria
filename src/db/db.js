const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoURI, {
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
