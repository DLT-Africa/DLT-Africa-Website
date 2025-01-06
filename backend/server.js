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
const contactRoute = require("./routes/contactRoutes");
const mongoose = require("mongoose");

const app = express();

app.use(
  cors({
    origin: [
      "*",
      "http://localhost:3000",
      "https://talent-pool-server.vercel.app",
      "https://dlt-africa-website-frontend.vercel.app",
      "https://dlt-africa-talent-pool.vercel.app",
      "https://dltafrica.io",
      "www.google-analytics.com",
      "www.figma.com",
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

app.use("/", express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

// Handle preflight requests
app.options("*", cors());

// Routes
app.use("/api/v1/cohorts", userRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/team", teamRoute);
app.use("/api/v1/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
});
