import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { db } from "./config/database.js";
import teamRouter from "./routes/Team.route.js";
import playerRouter from "./routes/Player.route.js";
import matchRouter from "./routes/Match.route.js";
import playerStatisticsRouter from "./routes/PlayerStatistics.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("root");
});

app.use("/api/team", teamRouter);
app.use("/api/player", playerRouter);
app.use("/api/match", matchRouter);
app.use("/api/stats", playerStatisticsRouter);

app.listen(PORT, () => {
  (async () => {
    await db.connect();
  })();

  console.log(`Server at ${PORT}`);
});
