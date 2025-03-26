import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProxyController } from "./proxy.controller";
import { ProxyService } from "./proxy.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 3,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ProxyController],
  providers: [ProxyService],
  exports: [ProxyService],
})
export class ProxyModule {}
