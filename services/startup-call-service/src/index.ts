import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import { requireAuth } from "./middleware/auth.middleware";
import startupCallRoutes from "./routes/startupCallRoutes";
import { EventRoutes } from "./routes/event.routes";
import { EventController } from "./controllers/event.controller";
import { checkDatabaseConnection } from "./config/database";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize controllers
const eventController = new EventController();

// Initialize routes
const eventRoutes = new EventRoutes(eventController);
eventRoutes.setupRoutes(app);

// Apply routes with authentication
app.use("/api/startup-calls", requireAuth, startupCallRoutes);

// Error handling
app.use(errorHandler);

const startServer = async () => {
  try {
    // Check database connection
    await checkDatabaseConnection();
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`API Documentation available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();