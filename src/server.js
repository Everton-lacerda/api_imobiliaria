const express = require("express");
const app = express();
const port = process.env.PORT || 3200;
const routes = require("./routes/routes");
const cors = require('cors');

const connectToDatabase = require("./db/db");
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port} `);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use("/", routes);