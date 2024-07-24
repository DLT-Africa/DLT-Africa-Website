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
const talentRoutes = require("./routes/talentRoute");
const skillRoute = require("./routes/skillRoute");
const mongoose = require("mongoose");

const app = express();

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://dlt-africa-website-frontend.vercel.app",
  "https://dlt-africa-talent-pool.vercel.app",
  "https://dltafrica.io",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
  })
);

app.options("*", cors());

app.use("/api/v1/cohorts", userRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/team", teamRoute);
app.use("/api/v1/talent", talentRoutes);
app.use("/api/v1/skill", skillRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, console.log(`Server up and running on port ${PORT}`));
});
