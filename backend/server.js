require("dotenv").config();

const express = require("express");
const connectDB = require("./config/DBconnect");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
    cors({
        origin: ["http://localhost:3000", "*"],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);

// app.use("/api/cohorts", userRoute); // giving errors cos the user routes file is temporarily empty

app.get("/", (req, res) => {
    res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

connectDB();

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, console.log(`Server up and running on port ${PORT}`));
//   })
//   .catch((err) => console.log(err));

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, console.log(`Server up and running on port ${PORT}`));
});