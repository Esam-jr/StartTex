import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { MonitoringLogger } from "./logger.service";
import { HealthController } from "./health.controller";

@Module({
  imports: [TerminusModule],
  providers: [MonitoringLogger],
  controllers: [HealthController],
  exports: [MonitoringLogger],
})
export class MonitoringModule {}
