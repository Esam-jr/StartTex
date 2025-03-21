import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export interface UserPayload {
  sub: string;
  email: string;
  roles: string[];
}

export interface ServicePayload {
  serviceId: string;
  name: string;
}

@Injectable()
export class SharedAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUserToken(token: string): Promise<UserPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      throw new Error("Invalid user token");
    }
  }

  async validateServiceToken(token: string): Promise<ServicePayload> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SERVICE_JWT_SECRET,
      });
      return payload;
    } catch (error) {
      throw new Error("Invalid service token");
    }
  }

  async generateServiceToken(
    serviceId: string,
    serviceName: string
  ): Promise<string> {
    const payload: ServicePayload = {
      serviceId,
      name: serviceName,
    };
    return this.jwtService.signAsync(payload, {
      secret: process.env.SERVICE_JWT_SECRET,
      expiresIn: "1h",
    });
  }

  async decodeToken(token: string): Promise<UserPayload | ServicePayload> {
    return this.jwtService.decode(token);
  }
}
