const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.KEY_URI;
mongoose.connect(uri, () => console.log("Database connected"));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB databse connection established successfully');
})

const productsRouter = require("./routes/products");

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
