import express from "express";
import {
  insertTeam,
  updateTeam,
  deleteTeam,
  viewTeam,
} from "../controllers/Team.controller.js";

const router = express.Router();

router.post("/", insertTeam);
router.get("/", viewTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
