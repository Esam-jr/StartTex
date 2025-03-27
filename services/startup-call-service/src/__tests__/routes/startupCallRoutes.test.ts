import request from "supertest";
import express from "express";
import startupCallRoutes from "../../routes/startupCallRoutes";

// Mock the controller
jest.mock("../../controllers/startupCallController", () => {
  return {
    StartupCallController: jest.fn().mockImplementation(() => ({
      getAllStartupCalls: jest.fn().mockImplementation((_req, res) => {
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
        res.json(mockCalls);
      }),
      getStartupCallById: jest.fn().mockImplementation((req, res) => {
        if (req.params.id === "999") {
          res.status(404).json({ message: "Startup call not found" });
        } else {
          const mockCall = {
            id: req.params.id,
            title: "Test Call",
            description: "Test Description",
            date: "2024-03-20T10:00:00Z",
            status: "scheduled",
          };
          res.json(mockCall);
        }
      }),
      createStartupCall: jest.fn().mockImplementation((req, res) => {
        if (!req.body.startupId || !req.body.callDate) {
          res.status(400).json({ message: "Invalid input" });
        } else {
          const newCall = {
            id: "1",
            ...req.body,
            createdAt: "2024-03-19T12:00:00Z",
            updatedAt: "2024-03-19T12:00:00Z",
          };
          res.status(201).json(newCall);
        }
      }),
      updateStartupCall: jest.fn().mockImplementation((req, res) => {
        if (req.params.id === "999") {
          res.status(404).json({ message: "Startup call not found" });
        } else {
          const updatedCall = {
            id: req.params.id,
            ...req.body,
            date: "2024-03-20T10:00:00Z",
            status: "scheduled",
            updatedAt: "2024-03-19T12:00:00Z",
          };
          res.json(updatedCall);
        }
      }),
      deleteStartupCall: jest.fn().mockImplementation((req, res) => {
        if (req.params.id === "999") {
          res.status(404).json({ message: "Startup call not found" });
        } else {
          res.status(204).send();
        }
      }),
    })),
  };
});

describe("Startup Call Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/api/startup-calls", startupCallRoutes);

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

      const response = await request(app).get("/api/startup-calls/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCall);
    });

    it("should return 404 for non-existent call", async () => {
      const response = await request(app).get("/api/startup-calls/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Startup call not found" });
    });
  });

  describe("POST /api/startup-calls", () => {
    it("should create a new startup call", async () => {
      const newCall = {
        startupId: "1",
        callDate: "2024-03-20T10:00:00Z",
        notes: "Test notes",
        status: "scheduled",
      };

      const createdCall = {
        id: "1",
        ...newCall,
        createdAt: "2024-03-19T12:00:00Z",
        updatedAt: "2024-03-19T12:00:00Z",
      };

      const response = await request(app)
        .post("/api/startup-calls")
        .send(newCall);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdCall);
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app).post("/api/startup-calls").send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errors: [
          {
            location: "body",
            msg: "Startup ID is required",
            param: "startupId",
          },
          {
            location: "body",
            msg: "Valid call date is required",
            param: "callDate",
          },
          {
            location: "body",
            msg: "Invalid status",
            param: "status",
          },
        ],
      });
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

      const response = await request(app)
        .put("/api/startup-calls/1")
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedCall);
    });

    it("should return 404 for non-existent call", async () => {
      const response = await request(app)
        .put("/api/startup-calls/999")
        .send({ title: "Updated Call" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Startup call not found" });
    });
  });

  describe("DELETE /api/startup-calls/:id", () => {
    it("should delete an existing startup call", async () => {
      const response = await request(app).delete("/api/startup-calls/1");

      expect(response.status).toBe(204);
    });

    it("should return 404 for non-existent call", async () => {
      const response = await request(app).delete("/api/startup-calls/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Startup call not found" });
    });
  });
});
