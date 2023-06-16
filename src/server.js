const express = require("express");
const app = express();
const port = process.env.PORT || 3200;
const routes = require("./routes/routes");

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


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use("/", routes);