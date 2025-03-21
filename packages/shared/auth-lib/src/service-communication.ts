import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SharedAuthService } from "./auth.service";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ServiceCommunication {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: SharedAuthService
  ) {}

  async callService<T>(
    serviceName: string,
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    data?: any
  ): Promise<T> {
    const serviceToken = await this.authService.generateServiceToken(
      process.env.SERVICE_ID,
      process.env.SERVICE_NAME
    );

    const response = await firstValueFrom(
      this.httpService.request({
        method,
        url: `${process.env.SERVICE_BASE_URL}/${serviceName}/${endpoint}`,
        data,
        headers: {
          "Service-Authorization": `Bearer ${serviceToken}`,
        },
      })
    );

    return response.data;
  }

  async validateServiceRequest(token: string): Promise<boolean> {
    try {
      await this.authService.validateServiceToken(token);
      return true;
    } catch {
      return false;
    }
  }
}
