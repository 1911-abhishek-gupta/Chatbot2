const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const MessageRoute = require("./routes/messages");
const LoginRoute = require("./routes/Login");
const cors = require("cors");


dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/messages",MessageRoute);
app.use("/api/login",LoginRoute);

app.listen(8800,()=>{
    console.log("Backend server up and running on port 8800")
})