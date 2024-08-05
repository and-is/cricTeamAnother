import express from "express";
import {
  insertMatch,
  updateMatch,
  deleteMatch,
  viewMatch,
} from "../controllers/Match.controller.js";

const router = express.Router();

router.post("/", insertMatch);
router.get("/", viewMatch);
router.put("/:id", updateMatch);
router.delete("/:id", deleteMatch);

export default router;
