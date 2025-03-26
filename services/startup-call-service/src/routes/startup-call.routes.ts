import { Router } from "express";
import { body } from "express-validator";
import { StartupCallController } from "../controllers/startup-call.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();
const controller = new StartupCallController();

// Validation middleware
const createValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("requirements").isArray().withMessage("Requirements must be an array"),
  body("deadline").isISO8601().withMessage("Invalid deadline format"),
  validateRequest,
];

const updateValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("requirements")
    .optional()
    .isArray()
    .withMessage("Requirements must be an array"),
  body("deadline")
    .optional()
    .isISO8601()
    .withMessage("Invalid deadline format"),
  validateRequest,
];

// Routes
router.get("/", controller.getAllStartupCalls);
router.get("/:id", controller.getStartupCallById);

// Protected routes (require admin)
router.post("/", requireAdmin, createValidation, controller.createStartupCall);
router.put(
  "/:id",
  requireAdmin,
  updateValidation,
  controller.updateStartupCall
);
router.delete("/:id", requireAdmin, controller.deleteStartupCall);
router.post("/:id/publish", requireAdmin, controller.publishStartupCall);
router.post("/:id/close", requireAdmin, controller.closeStartupCall);

export default router;
