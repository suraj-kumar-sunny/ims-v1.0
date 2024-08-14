import express from "express";
import { body } from "express-validator";
import {
  updateUserTheme,
  getUserTheme,
} from "../controllers/theme.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put(
  "/",
  protect,
  [
    body("theme")
      .isIn(["light", "dark"])
      .withMessage("Theme must be light or dark"),
  ],
  asyncHandler(updateUserTheme)
);

router.get("/", protect, asyncHandler(getUserTheme));

export default router;
