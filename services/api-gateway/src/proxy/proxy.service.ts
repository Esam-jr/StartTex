import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ProxyService {
  private readonly serviceUrls: Record<string, string>;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.serviceUrls = {
      auth: this.configService.get<string>("AUTH_SERVICE_URL"),
      startup: this.configService.get<string>("STARTUP_SERVICE_URL"),
      idea: this.configService.get<string>("IDEA_SERVICE_URL"),
      project: this.configService.get<string>("PROJECT_SERVICE_URL"),
      sponsorship: this.configService.get<string>("SPONSORSHIP_SERVICE_URL"),
      financial: this.configService.get<string>("FINANCIAL_SERVICE_URL"),
      communication: this.configService.get<string>(
        "COMMUNICATION_SERVICE_URL"
      ),
      notification: this.configService.get<string>("NOTIFICATION_SERVICE_URL"),
      reporting: this.configService.get<string>("REPORTING_SERVICE_URL"),
    };
  }

  async forwardRequest(
    service: string,
    path: string,
    method: string,
    data?: any,
    headers?: any
  ) {
    const baseUrl = this.serviceUrls[service];
    if (!baseUrl) {
      throw new Error(`Service ${service} not found`);
    }

    const url = `${baseUrl}${path}`;
    const config = {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method,
          url,
          data,
          ...config,
        })
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
