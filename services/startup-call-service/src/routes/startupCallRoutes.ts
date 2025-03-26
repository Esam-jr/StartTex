import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";
import { StartupCallController } from "../controllers/startupCallController";

const router = express.Router();
const controller = new StartupCallController();

/**
 * @swagger
 * /api/startup-calls:
 *   get:
 *     summary: Get all startup calls
 *     tags: [Startup Calls]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of startup calls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StartupCall'
 *       401:
 *         description: Unauthorized
 */
router.get("/", controller.getAllStartupCalls);

/**
 * @swagger
 * /api/startup-calls/{id}:
 *   get:
 *     summary: Get a startup call by ID
 *     tags: [Startup Calls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Startup call ID
 *     responses:
 *       200:
 *         description: Startup call details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StartupCall'
 *       404:
 *         description: Startup call not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", controller.getStartupCallById);

/**
 * @swagger
 * /api/startup-calls:
 *   post:
 *     summary: Create a new startup call
 *     tags: [Startup Calls]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StartupCallInput'
 *     responses:
 *       201:
 *         description: Startup call created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StartupCall'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  [
    body("startupId").notEmpty().withMessage("Startup ID is required"),
    body("callDate").isISO8601().withMessage("Valid call date is required"),
    body("notes").optional().isString(),
    body("status")
      .isIn(["scheduled", "completed", "cancelled"])
      .withMessage("Invalid status"),
  ],
  validateRequest,
  controller.createStartupCall
);

/**
 * @swagger
 * /api/startup-calls/{id}:
 *   put:
 *     summary: Update a startup call
 *     tags: [Startup Calls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Startup call ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StartupCallInput'
 *     responses:
 *       200:
 *         description: Startup call updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StartupCall'
 *       404:
 *         description: Startup call not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:id",
  [
    body("startupId")
      .optional()
      .notEmpty()
      .withMessage("Startup ID is required"),
    body("callDate")
      .optional()
      .isISO8601()
      .withMessage("Valid call date is required"),
    body("notes").optional().isString(),
    body("status")
      .optional()
      .isIn(["scheduled", "completed", "cancelled"])
      .withMessage("Invalid status"),
  ],
  validateRequest,
  controller.updateStartupCall
);

/**
 * @swagger
 * /api/startup-calls/{id}:
 *   delete:
 *     summary: Delete a startup call
 *     tags: [Startup Calls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Startup call ID
 *     responses:
 *       204:
 *         description: Startup call deleted successfully
 *       404:
 *         description: Startup call not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", controller.deleteStartupCall);

export default router;
