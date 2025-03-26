import express from "express";
import { StartupCallController } from "../controllers/startupCallController";

export class StartupCallRoutes {
  constructor(private controller: StartupCallController) {}

  setupRoutes(app: express.Application): void {
    const router = express.Router();

    router.get("/", this.controller.getAllStartupCalls.bind(this.controller));
    router.get(
      "/:id",
      this.controller.getStartupCallById.bind(this.controller)
    );
    router.post("/", this.controller.createStartupCall.bind(this.controller));
    router.put("/:id", this.controller.updateStartupCall.bind(this.controller));
    router.delete(
      "/:id",
      this.controller.deleteStartupCall.bind(this.controller)
    );

    app.use("/api/startup-calls", router);
  }
}
