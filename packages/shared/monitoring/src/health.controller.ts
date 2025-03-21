import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from "@nestjs/terminus";
import { MonitoringLogger } from "./logger.service";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private readonly logger: MonitoringLogger
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Check if the service is up
      () => this.http.pingCheck("self", `http://localhost:${process.env.PORT}`),

      // Check disk storage
      () =>
        this.disk.checkStorage("storage", {
          thresholdPercent: 0.9,
          path: "/",
        }),

      // Check memory usage
      () => this.memory.checkHeap("memory_heap", 200 * 1024 * 1024), // 200MB

      // Check memory RSS (Resident Set Size)
      () => this.memory.checkRSS("memory_rss", 3000 * 1024 * 1024), // 3000MB
    ]);
  }

  @Get("liveness")
  liveness() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }

  @Get("readiness")
  readiness() {
    // Add any additional readiness checks here
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }

  someMethod() {
    this.logger.log("Some message", "HealthController");
  }
}
