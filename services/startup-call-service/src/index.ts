import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import { authenticateUser } from "./middleware/auth.middleware";
import startupCallRoutes from "./routes/startup-call.routes";
import eventRoutes from "./routes/event.routes";
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

// Routes
app.use("/api/startup-calls", authenticateUser, startupCallRoutes);
app.use("/api/events", authenticateUser, eventRoutes);

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Check database connection first
    await checkDatabaseConnection();

    // Start the server
    app.listen(port, () => {
      console.log(`🚀 Startup Call Service running on port ${port}`);
      console.log(
        `📝 API Documentation available at http://localhost:${port}/api-docs`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
