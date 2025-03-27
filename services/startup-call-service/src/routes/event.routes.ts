import express from "express";
const { check } = require("express-validator");
import { EventController } from "../controllers/event.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { requireAdmin } from "../middleware/auth.middleware";

export class EventRoutes {
  constructor(private controller: EventController) {}

  setupRoutes(app: express.Application): void {
    const router = express.Router();

    // Validation middleware
    const createValidation = [
      check("title").notEmpty().withMessage("Title is required"),
      check("description").notEmpty().withMessage("Description is required"),
      check("date").isISO8601().withMessage("Invalid date format"),
      check("related_call_id")
        .optional()
        .isString()
        .withMessage("Invalid call ID"),
      validateRequest,
    ];

    const updateValidation = [
      check("title").optional().notEmpty().withMessage("Title cannot be empty"),
      check("description")
        .optional()
        .notEmpty()
        .withMessage("Description cannot be empty"),
      check("date").optional().isISO8601().withMessage("Invalid date format"),
      check("related_call_id")
        .optional()
        .isString()
        .withMessage("Invalid call ID"),
      validateRequest,
    ];

    /**
     * @swagger
     * /api/events:
     *   get:
     *     summary: Get all events
     *     tags: [Events]
     *     responses:
     *       200:
     *         description: List of all events
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Event'
     */
    router.get("/", this.controller.getAllEvents.bind(this.controller));

    /**
     * @swagger
     * /api/events/{id}:
     *   get:
     *     summary: Get an event by ID
     *     tags: [Events]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Event ID
     *     responses:
     *       200:
     *         description: Event details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Event'
     *       404:
     *         description: Event not found
     */
    router.get("/:id", this.controller.getEventById.bind(this.controller));

    /**
     * @swagger
     * /api/events/startup-call/{callId}:
     *   get:
     *     summary: Get events related to a startup call
     *     tags: [Events]
     *     parameters:
     *       - in: path
     *         name: callId
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Startup call ID
     *     responses:
     *       200:
     *         description: List of events related to the startup call
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Event'
     */
    router.get(
      "/startup-call/:callId",
      this.controller.getEventsByStartupCall.bind(this.controller)
    );

    /**
     * @swagger
     * /api/events:
     *   post:
     *     summary: Create a new event (Admin only)
     *     tags: [Events]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EventInput'
     *     responses:
     *       201:
     *         description: Event created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Event'
     *       400:
     *         description: Invalid input
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden - Admin access required
     */
    router.post(
      "/",
      requireAdmin,
      createValidation,
      this.controller.createEvent.bind(this.controller)
    );

    /**
     * @swagger
     * /api/events/{id}:
     *   put:
     *     summary: Update an event (Admin only)
     *     tags: [Events]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Event ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EventInput'
     *     responses:
     *       200:
     *         description: Event updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Event'
     *       400:
     *         description: Invalid input
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden - Admin access required
     *       404:
     *         description: Event not found
     */
    router.put(
      "/:id",
      requireAdmin,
      updateValidation,
      this.controller.updateEvent.bind(this.controller)
    );

    /**
     * @swagger
     * /api/events/{id}:
     *   delete:
     *     summary: Delete an event (Admin only)
     *     tags: [Events]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Event ID
     *     responses:
     *       204:
     *         description: Event deleted successfully
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden - Admin access required
     *       404:
     *         description: Event not found
     */
    router.delete(
      "/:id",
      requireAdmin,
      this.controller.deleteEvent.bind(this.controller)
    );

    app.use("/api/events", router);
  }
}
