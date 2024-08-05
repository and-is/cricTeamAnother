import express from "express";
import {
  insertPlayerStatistics,
  updatePlayerStatistics,
  deletePlayerStatistics,
  viewPlayerStatistics,
} from "../controllers/PlayerStatistics.controller.js";

const router = express.Router();

router.post("/", insertPlayerStatistics);
router.get("/", viewPlayerStatistics);
router.put("/:id", updatePlayerStatistics);
router.delete("/:id", deletePlayerStatistics);

export default router;
