import express from "express";
import {
  insertPlayer,
  updatePlayer,
  deletePlayer,
  viewPlayer,
} from "../controllers/Player.controller.js";

const router = express.Router();

router.post("/", insertPlayer);
router.get("/", viewPlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
