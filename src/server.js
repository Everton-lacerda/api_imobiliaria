// index.js
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3200;

const homeRoutes = require("./routes/homeRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

// conection server and db
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


// Configurações do servidor e middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json()); 

// Rotas
app.use("/", homeRoutes);
app.use("/properties", propertyRoutes);