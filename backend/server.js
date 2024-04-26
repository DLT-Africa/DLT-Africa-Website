require("dotenv").config();

const path = require("path");
const express = require("express");
const connectDB = require("./config/DBconnect");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");
const teamRoute = require("./routes/teamRoute");
const mongoose = require("mongoose");

const app = express();

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",

      "https://dlt-africa-website-frontend.vercel.app",
    ],
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);


app.use("/api/v1/cohorts", userRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/team", teamRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, console.log(`Server up and running on port ${PORT}`));
});
