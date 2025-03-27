import request from "supertest";
import express from "express";
import { StartupCallController } from "../../controllers/startupCallController";
import { StartupCallRoutes } from "../startupCall.routes";
import { Request, Response } from "express";

// Mock the controller
jest.mock("../../controllers/startupCallController");

describe("Startup Call Routes", () => {
  let app: express.Application;
  let mockController: jest.Mocked<StartupCallController>;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockController = {
      getAllStartupCalls: jest.fn(),
      getStartupCallById: jest.fn(),
      createStartupCall: jest.fn(),
      updateStartupCall: jest.fn(),
      deleteStartupCall: jest.fn(),
    } as unknown as jest.Mocked<StartupCallController>;

    const routes = new StartupCallRoutes(mockController);
    routes.setupRoutes(app);

    // Reset all mocks
    jest.clearAllMocks();
  });

  describe("GET /api/startup-calls", () => {
    it("should return all startup calls", async () => {
      const mockCalls = [
        {
          id: "1",
          title: "Test Call 1",
          description: "Test Description 1",
          date: "2024-03-20T10:00:00Z",
          status: "scheduled",
        },
        {
          id: "2",
          title: "Test Call 2",
          description: "Test Description 2",
          date: "2024-03-21T11:00:00Z",
          status: "completed",
        },
      ];

      mockController.getAllStartupCalls.mockImplementation(
        async (_req: Request, res: Response) => {
          res.json(mockCalls);
        }
      );

      const response = await request(app).get("/api/startup-calls");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCalls);
    });
  });

  describe("GET /api/startup-calls/:id", () => {
    it("should return a specific startup call", async () => {
      const mockCall = {
        id: "1",
        title: "Test Call",
        description: "Test Description",
        date: "2024-03-20T10:00:00Z",
        status: "scheduled",
      };

      mockController.getStartupCallById.mockImplementation(
        async (_req: Request, res: Response) => {
          res.json(mockCall);
        }
      );

      const response = await request(app).get("/api/startup-calls/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCall);
    });

    it("should return 404 for non-existent call", async () => {
      mockController.getStartupCallById.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(404).json({ message: "Startup call not found" });
        }
      );

      const response = await request(app).get("/api/startup-calls/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Startup call not found" });
    });
  });

  describe("POST /api/startup-calls", () => {
    it("should create a new startup call", async () => {
      const newCall = {
        title: "New Call",
        description: "New Description",
        date: "2024-03-20T10:00:00Z",
        status: "scheduled",
      };

      const createdCall = {
        id: "1",
        ...newCall,
        createdAt: "2024-03-19T12:00:00Z",
        updatedAt: "2024-03-19T12:00:00Z",
      };

      mockController.createStartupCall.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(201).json(createdCall);
        }
      );

      const response = await request(app)
        .post("/api/startup-calls")
        .send(newCall);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdCall);
    });

    it("should return 400 for invalid input", async () => {
      mockController.createStartupCall.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(400).json({ message: "Invalid input" });
        }
      );

      const response = await request(app).post("/api/startup-calls").send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid input" });
    });
  });

  describe("PUT /api/startup-calls/:id", () => {
    it("should update an existing startup call", async () => {
      const updateData = {
        title: "Updated Call",
        description: "Updated Description",
      };

      const updatedCall = {
        id: "1",
        ...updateData,
        date: "2024-03-20T10:00:00Z",
        status: "scheduled",
        updatedAt: "2024-03-19T12:00:00Z",
      };

      mockController.updateStartupCall.mockImplementation(
        async (_req: Request, res: Response) => {
          res.json(updatedCall);
        }
      );

      const response = await request(app)
        .put("/api/startup-calls/1")
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedCall);
    });

    it("should return 404 for non-existent call", async () => {
      mockController.updateStartupCall.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(404).json({ message: "Startup call not found" });
        }
      );

      const response = await request(app)
        .put("/api/startup-calls/999")
        .send({ title: "Updated Call" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Startup call not found" });
    });
  });

  describe("DELETE /api/startup-calls/:id", () => {
    it("should delete an existing startup call", async () => {
      mockController.deleteStartupCall.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(204).send();
        }
      );

      const response = await request(app).delete("/api/startup-calls/1");

      expect(response.status).toBe(204);
    });

    it("should return 404 for non-existent call", async () => {
      mockController.deleteStartupCall.mockImplementation(
        async (_req: Request, res: Response) => {
          res.status(404).json({ message: "Startup call not found" });
        }
      );

      const response = await request(app).delete("/api/startup-calls/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Startup call not found" });
    });
  });
});
