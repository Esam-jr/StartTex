import request from "supertest";
import express from "express";
import { EventController } from "../../controllers/event.controller";
import { EventRoutes } from "../../routes/event.routes";
import { Request, Response } from "express";

describe("Event Routes", () => {
  let app: express.Application;
  let mockController: jest.Mocked<EventController>;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockController = {
      getAllEvents: jest.fn(),
      getEventById: jest.fn(),
      getEventsByStartupCall: jest.fn(),
      createEvent: jest.fn(),
      updateEvent: jest.fn(),
      deleteEvent: jest.fn(),
    } as unknown as jest.Mocked<EventController>;

    const routes = new EventRoutes(mockController);
    routes.setupRoutes(app);

    // Reset all mocks
    jest.clearAllMocks();
  });

  describe("GET /api/events", () => {
    it("should return all events", async () => {
      const mockEvents = [
        {
          id: "1",
          title: "Team Meeting",
          description: "Weekly team sync",
          date: "2024-03-20T10:00:00Z",
          related_call_id: "call1",
        },
        {
          id: "2",
          title: "Client Call",
          description: "Follow-up with client",
          date: "2024-03-21T11:00:00Z",
          related_call_id: "call2",
        },
      ];

      mockController.getAllEvents.mockImplementation(
        async (_req: Request, res: Response) => {
          res.json(mockEvents);
        }
      );

      const response = await request(app).get("/api/events");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvents);
    });
  });

  describe("GET /api/events/:id", () => {
    it("should return a specific event", async () => {
      const mockEvent = {
        id: "1",
        title: "Team Meeting",
        description: "Weekly team sync",
        date: "2024-03-20T10:00:00Z",
        related_call_id: "call1",
      };

      mockController.getEventById.mockImplementation(
        async (_req: Request, res: Response) => {
          res.json(mockEvent);
        }
      );

      const response = await request(app).get("/api/events/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvent);
    });

    it("should return 404 for non-existent event", async () => {
      mockController.getEventById.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(404).json({ message: "Event not found" });
        }
      );

      const response = await request(app).get("/api/events/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Event not found" });
    });
  });

  describe("GET /api/events/startup-call/:callId", () => {
    it("should return events related to a startup call", async () => {
      const mockEvents = [
        {
          id: "1",
          title: "Initial Call",
          description: "First meeting with startup",
          date: "2024-03-20T10:00:00Z",
          related_call_id: "call1",
        },
      ];

      mockController.getEventsByStartupCall.mockImplementation(
        async (_req: Request, res: Response) => {
          res.json(mockEvents);
        }
      );

      const response = await request(app).get("/api/events/startup-call/call1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvents);
    });
  });

  describe("POST /api/events", () => {
    it("should create a new event (Admin only)", async () => {
      const newEvent = {
        title: "Team Meeting",
        description: "Weekly team sync",
        date: "2024-03-20T10:00:00Z",
        related_call_id: "call1",
      };

      const createdEvent = {
        id: "1",
        ...newEvent,
        createdAt: "2024-03-19T12:00:00Z",
        updatedAt: "2024-03-19T12:00:00Z",
      };

      mockController.createEvent.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(201).json(createdEvent);
        }
      );

      const response = await request(app)
        .post("/api/events")
        .set("Authorization", "Bearer admin-token")
        .send(newEvent);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdEvent);
    });

    it("should return 403 for non-admin users", async () => {
      mockController.createEvent.mockImplementation(
        async (_req: Request, res: Response) => {
          res
            .status(403)
            .json({ message: "Forbidden - Admin access required" });
        }
      );

      const response = await request(app)
        .post("/api/events")
        .set("Authorization", "Bearer user-token")
        .send({
          title: "Team Meeting",
          description: "Weekly team sync",
          date: "2024-03-20T10:00:00Z",
        });

      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        message: "Forbidden - Admin access required",
      });
    });
  });

  describe("PUT /api/events/:id", () => {
    it("should update an existing event (Admin only)", async () => {
      const updateData = {
        title: "Updated Meeting",
        description: "Updated description",
      };

      const updatedEvent = {
        id: "1",
        ...updateData,
        date: "2024-03-20T10:00:00Z",
        related_call_id: "call1",
        updatedAt: "2024-03-19T12:00:00Z",
      };

      mockController.updateEvent.mockImplementation(
        async (_req: Request, res: Response) => {
          res.json(updatedEvent);
        }
      );

      const response = await request(app)
        .put("/api/events/1")
        .set("Authorization", "Bearer admin-token")
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedEvent);
    });

    it("should return 404 for non-existent event", async () => {
      mockController.updateEvent.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(404).json({ message: "Event not found" });
        }
      );

      const response = await request(app)
        .put("/api/events/999")
        .set("Authorization", "Bearer admin-token")
        .send({ title: "Updated Meeting" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Event not found" });
    });
  });

  describe("DELETE /api/events/:id", () => {
    it("should delete an existing event (Admin only)", async () => {
      mockController.deleteEvent.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(204).send();
        }
      );

      const response = await request(app)
        .delete("/api/events/1")
        .set("Authorization", "Bearer admin-token");

      expect(response.status).toBe(204);
    });

    it("should return 404 for non-existent event", async () => {
      mockController.deleteEvent.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(404).json({ message: "Event not found" });
        }
      );

      const response = await request(app)
        .delete("/api/events/999")
        .set("Authorization", "Bearer admin-token");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Event not found" });
    });
  });
});
