const express = require("express");
const dotenv = require("dotenv");
const Connection_db = require("./config/db_connection");
const body_parser = require("body-parser") 
const router =require("./routes/routes")
const errorHandler = require("./middleware/ErrorHandler");

const app = express();
app.use(body_parser.urlencoded({ extended: true}))

dotenv.config();

app.use(body_parser.json())

Connection_db();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/",router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});

