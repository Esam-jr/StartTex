import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get("RATE_LIMIT_TTL", 60),
        limit: config.get("RATE_LIMIT_MAX_REQUESTS", 100),
      }),
    }),
  ],
})
export class RateLimitModule {}
