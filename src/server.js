import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateMiddleWare from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";
dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") job.start();

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("It's working!");
});

app.use(rateMiddleWare);
app.use(express.json()); // middleware
app.use("/api/transactions/", transactionsRoute);

// User Summary

initDB().then(() => {
  // Starting the app
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT: " + PORT);
  });
});
