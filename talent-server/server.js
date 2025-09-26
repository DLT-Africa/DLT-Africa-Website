require("dotenv").config();

const path = require("path");
const express = require("express");
const connectDB = require("./config/DBconnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const talentRoutes = require("./routes/talentRoute");
const skillRoute = require("./routes/skillRoute");
const contactRoute = require("./routes/contactRoute");
const mongoose = require("mongoose");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://dlt-africa-talent-pool.vercel.app",
  "https://dltafrica.io",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl requests) or from allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/v1/talent", talentRoutes);
app.use("/api/v1/skill", skillRoute);
app.use("/api/v1/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 6000;

connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
});
