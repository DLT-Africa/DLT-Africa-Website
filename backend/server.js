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

// Log origin requests for debugging
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});

// Serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

// CORS Configuration to allow all origins
app.use(cors({
  origin: true,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
}));

// Handle preflight requests
app.options("*", cors());

// Routes
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
  app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
});
